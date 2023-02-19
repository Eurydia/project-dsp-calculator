import { useCallback, useEffect, useState } from "react";
import { z } from "zod";

import { Sorter } from "../../assets";

const sorterSchema = z.object({
  label: z.string(),
  work_consumption: z.number(),
  idle_consumption: z.number(),
});

const isValidJSON = (data: string): boolean => {
  try {
    JSON.parse(data);
    return true;
  } catch {
    return false;
  }
};

const loadData = (storage_key: string, fallback: Sorter): Sorter => {
  const loaded_string: string | null =
    localStorage.getItem(storage_key);

  if (loaded_string === null) {
    return fallback;
  }

  if (!isValidJSON(loaded_string)) {
    return fallback;
  }

  const json_parsed_data = JSON.parse(loaded_string);

  const zod_parsed_data = sorterSchema.safeParse(json_parsed_data);
  if (!zod_parsed_data.success) {
    return fallback;
  }

  const { data } = zod_parsed_data;
  const sorter: Sorter | null = Sorter.fromLabel(data.label);
  if (sorter !== null) {
    return sorter;
  }

  return data;
};

const saveData = (storage_key: string, sorter: Sorter): void => {
  const data_string: string = Sorter.toJSON(sorter);
  localStorage.setItem(storage_key, data_string);
};

export const useSorter = (
  storage_key: string,
  default_value: Sorter,
): {
  sorter: Sorter;
  setSorter: (
    next_sorter: Sorter | ((prev_sorter: Sorter) => Sorter),
  ) => void;
} => {
  const [value, setValue] = useState<Sorter>(() => {
    return loadData(storage_key, default_value);
  });

  useEffect(() => {
    saveData(storage_key, value);
  }, [value]);

  return {
    sorter: value,
    setSorter: setValue,
  };
};
