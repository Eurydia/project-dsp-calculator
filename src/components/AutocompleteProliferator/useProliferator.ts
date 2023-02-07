import { useCallback, useEffect, useState } from "react";
import { z } from "zod";

import { AssetProliferators, Proliferator } from "../../assets";

const BASE_PROLIFERATOR = AssetProliferators[0];
const proliferatorSchema = z.string();

const isValidJSON = (data: string): boolean => {
  try {
    JSON.parse(data);
    return true;
  } catch {
    return false;
  }
};

const loadProliferator = (storage_key: string): Proliferator => {
  const loaded_string: string | null =
    localStorage.getItem(storage_key);

  if (loaded_string === null) {
    return BASE_PROLIFERATOR;
  }

  if (!isValidJSON(loaded_string)) {
    return BASE_PROLIFERATOR;
  }

  const parsed_string = JSON.parse(loaded_string);

  const zod_parsed_string =
    proliferatorSchema.safeParse(parsed_string);
  if (!zod_parsed_string.success) {
    return BASE_PROLIFERATOR;
  }
  const label = zod_parsed_string.data;
  const proliferator: Proliferator | null =
    Proliferator.fromLabel(label);

  if (proliferator === null) {
    return BASE_PROLIFERATOR;
  }

  return proliferator;
};

const saveProliferator = (
  storage_key: string,
  proliferator: Proliferator,
): void => {
  const data_string: string = Proliferator.toJSON(proliferator);
  localStorage.setItem(storage_key, data_string);
};

export const useProliferator = (
  storage_key: string,
): {
  proliferator: Proliferator;
  setProliferator: (next_proliferator: Proliferator) => void;
} => {
  const [value, setValue] = useState((): Proliferator => {
    return loadProliferator(storage_key);
  });

  useEffect(() => {
    saveProliferator(storage_key, value);
  }, [value]);

  return {
    proliferator: value,
    setProliferator: setValue,
  };
};
