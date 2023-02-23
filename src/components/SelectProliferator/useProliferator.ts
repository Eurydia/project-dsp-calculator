import { useEffect, useState } from "react";
import { z } from "zod";

import { Proliferator, ProliferatorMode } from "../../types";

const proliferatorSchema = z.object({
  label: z.string(),
  mode: z.nativeEnum(ProliferatorMode),
  work_consumption_multiplier: z.number(),
  product_multiplier: z.number(),
  speed_multiplier: z.number(),
});

const isValidJSON = (data: string): boolean => {
  try {
    JSON.parse(data);
    return true;
  } catch {
    return false;
  }
};

const loadData = (
  storage_key: string,
  fallack: Proliferator,
): Proliferator => {
  const loaded_string: string | null =
    localStorage.getItem(storage_key);

  if (loaded_string === null) {
    return fallack;
  }

  if (!isValidJSON(loaded_string)) {
    return fallack;
  }

  const json_parsed_data = JSON.parse(loaded_string);

  const zod_parsed_data =
    proliferatorSchema.safeParse(json_parsed_data);
  if (!zod_parsed_data.success) {
    return fallack;
  }
  const { data } = zod_parsed_data;
  const proliferator: Proliferator | null = Proliferator.fromLabel(
    data.label,
  );
  if (proliferator !== null) {
    return proliferator;
  }

  return data;
};

const saveData = (
  storage_key: string,
  proliferator: Proliferator,
): void => {
  const data_string: string = Proliferator.toJSON(proliferator);
  localStorage.setItem(storage_key, data_string);
};

export const useProliferator = (
  storage_key: string,
  default_value: Proliferator,
): {
  proliferator: Proliferator;
  setProliferator: (
    next_proliferator:
      | Proliferator
      | ((prev_proliferator: Proliferator) => Proliferator),
  ) => void;
} => {
  const [value, setValue] = useState<Proliferator>(() => {
    return loadData(storage_key, default_value);
  });

  useEffect(() => {
    saveData(storage_key, value);
  }, [value]);

  return {
    proliferator: value,
    setProliferator: setValue,
  };
};
