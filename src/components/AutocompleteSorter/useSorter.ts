import { useCallback, useEffect, useState } from "react";
import { z } from "zod";

import { Sorter, AssetSorters } from "../../assets";

const BASE_SORTER = AssetSorters[0];
const sorterSchema = z.string();

const loadSorter = (storage_key: string): Sorter => {
  const loaded_string: string | null =
    localStorage.getItem(storage_key);

  if (loaded_string === null) {
    return BASE_SORTER;
  }

  const parsed_string = sorterSchema.safeParse(loaded_string);
  if (!parsed_string.success) {
    return BASE_SORTER;
  }
  const label = parsed_string.data;
  const facility: Sorter | null = Sorter.fromLabel(label);
  if (facility === null) {
    return BASE_SORTER;
  }

  return facility;
};

const saveSorter = (storage_key: string, facility: Sorter): void => {
  const data_string: string = Sorter.toString(facility);
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
