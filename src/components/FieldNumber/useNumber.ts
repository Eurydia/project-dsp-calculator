import { useEffect, useState } from "react";

const loadNumber = (
  storage_key: string,
  fallback: number,
): number => {
  const loaded_string: string | null =
    localStorage.getItem(storage_key);

  if (loaded_string === null) {
    return fallback;
  }

  const parsed_string: number | unknown = JSON.parse(loaded_string);
  if (typeof parsed_string !== "number") {
    return fallback;
  }

  return parsed_string;
};

const saveNumber = (storage_key: string, value: number): void => {
  const data_string: string = JSON.stringify(value);
  localStorage.setItem(storage_key, data_string);
};

export const useNumber = (
  storage_key: string,
  fallback: number = 0,
): {
  value: number;
  setValue: (next_value: number) => void;
} => {
  const [value, setValue] = useState((): number => {
    return loadNumber(storage_key, fallback);
  });

  useEffect(() => {
    saveNumber(storage_key, value);
  }, [value]);

  return {
    value,
    setValue,
  };
};