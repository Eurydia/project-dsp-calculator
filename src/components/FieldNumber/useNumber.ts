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
  min: number,
  max: number,
): number => {
  const loaded_string: string | null =
    localStorage.getItem(storage_key);

  if (loaded_string === null) {
    return min;
  }

  if (!isValidJSON(loaded_string)) {
    return min;
  }

  const parsed_string = JSON.parse(loaded_string);
  const zod_parsed_string = numberSchema.safeParse(
    Number(parsed_string),
  );
  if (!zod_parsed_string.success) {
    return min;
  }
  const value = zod_parsed_string.data;

  if (value > max) {
    return max;
  }

  if (value < min) {
    return min;
  }

  return value;
};

const saveNumber = (storage_key: string, value: number): void => {
  const data_string: string = JSON.stringify(value);
  localStorage.setItem(storage_key, data_string);
};

export const useNumber = (
  storage_key: string,
  min: number = 0,
  max: number = Number.MAX_SAFE_INTEGER - 1,
): {
  value: number;
  setValue: (next_value: number) => void;
} => {
  const [value, setValue] = useState((): number => {
    return loadNumber(storage_key, min, max);
  });

  useEffect(() => {
    saveNumber(storage_key, value);
  }, [value]);

  return {
    value,
    setValue,
  };
};
