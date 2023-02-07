import { useCallback, useEffect, useState } from "react";
import { z } from "zod";

import { Sorter, AssetSorters } from "../../assets";

const BASE_SORTER = AssetSorters[0];
const sorterSchema = z.string();

const isValidJSON = (data: string): boolean => {
  try {
    JSON.parse(data);
    return true;
  } catch {
    return false;
  }
};

const loadSorter = (storage_key: string): Sorter => {
  const loaded_string: string | null =
    localStorage.getItem(storage_key);

  if (loaded_string === null) {
    return BASE_SORTER;
  }

  if (!isValidJSON(loaded_string)) {
    return BASE_SORTER;
  }

  const parsed_string = JSON.parse(loaded_string);

  const zod_parsed_string = sorterSchema.safeParse(parsed_string);
  if (!zod_parsed_string.success) {
    return BASE_SORTER;
  }
  const label = zod_parsed_string.data;
  const facility: Sorter | null = Sorter.fromLabel(label);
  if (facility === null) {
    return BASE_SORTER;
  }

  return facility;
};

const saveSorter = (storage_key: string, facility: Sorter): void => {
  const data_string: string = Sorter.toJSON(facility);
  localStorage.setItem(storage_key, data_string);
};

export const useSorter = (
  storage_key: string,
): {
  sorter: Sorter;
  setSorter: (next_sorter: Sorter) => void;
} => {
  const [value, setValue] = useState((): Sorter => {
    return loadSorter(storage_key);
  });

  const setSorter = useCallback((next_facility: Sorter): void => {
    setValue(next_facility);
  }, []);

  useEffect(() => {
    saveSorter(storage_key, value);
  }, [value]);

  return {
    sorter: value,
    setSorter,
  };
};
