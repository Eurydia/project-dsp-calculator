import { useEffect, useState } from "react";
import { z } from "zod";

const numberSchema = z.number();

const isValidJSON = (data: string): boolean => {
  try {
    JSON.parse(data);
    return true;
  } catch {
    return false;
  }
};

const loadNumber = (
  storage_key: string,
  fallback: number,
): number => {
  const loaded_string: string | null =
    localStorage.getItem(storage_key);

  if (loaded_string === null) {
    return fallback;
  }

  if (!isValidJSON(loaded_string)) {
    return fallback;
  }

  const parsed_string = JSON.parse(loaded_string);
  const zod_parsed_string = numberSchema.safeParse(
    Number(parsed_string),
  );
  if (!zod_parsed_string.success) {
    return fallback;
  }
  const value = zod_parsed_string.data;
  return value;
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
