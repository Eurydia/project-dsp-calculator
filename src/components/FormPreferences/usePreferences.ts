import { useEffect, useState } from "react";
import { z } from "zod";

import { Preferences } from "../../types";

const preferencesSchema = z.object({
  preferEven: z.boolean(),
  keepBeltUnderMaxFlow: z.boolean(),
});

const isValidJSON = (data: string) => {
  try {
    JSON.parse(data);
    return true;
  } catch {
    return false;
  }
};

const loadData = (
  storage_key: string,
  fallback: Preferences,
): Preferences => {
  const loaded_string: string | null =
    localStorage.getItem(storage_key);
  if (loaded_string === null) {
    return fallback;
  }

  if (!isValidJSON(loaded_string)) {
    return fallback;
  }

  const json_parsed_data = JSON.parse(loaded_string);
  const zod_parsed_data =
    preferencesSchema.safeParse(json_parsed_data);

  if (!zod_parsed_data.success) {
    return fallback;
  }

  const { data } = zod_parsed_data;

  return data;
};

const saveData = (storage_key: string, data: Preferences): void => {
  const data_string = JSON.stringify(data);
  localStorage.setItem(storage_key, data_string);
};

export const usePreferences = (
  storage_key: string,
  default_value: Preferences,
): {
  preferences: Preferences;
  setPreferences: (
    next_preferences:
      | Preferences
      | ((prev_preferences: Preferences) => Preferences),
  ) => void;
} => {
  const [value, setValue] = useState<Preferences>(() => {
    return loadData(storage_key, default_value);
  });

  useEffect(() => {
    saveData(storage_key, value);
  }, [value]);

  return {
    preferences: value,
    setPreferences: setValue,
  };
};
