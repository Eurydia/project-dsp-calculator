import { useCallback, useEffect, useState } from "react";
import { Sorter, AssetSorter } from "../../assets";

const BASE_SORTER = AssetSorter[0];

const loadSorter = (storage_key: string): Sorter => {
  const loaded_string: string | null =
    localStorage.getItem(storage_key);

  if (loaded_string === null) {
    return BASE_SORTER;
  }

  const parsed_string: string | unknown = JSON.parse(loaded_string);
  if (typeof parsed_string !== "string") {
    return BASE_SORTER;
  }

  const facility: Sorter | null = Sorter.fromLabel(parsed_string);
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
