import { useCallback, useEffect, useState } from "react";

const loadNumber = (storage_key: string): number => {
  const loaded_string: string | null =
    localStorage.getItem(storage_key);

  if (loaded_string === null) {
    return 0;
  }

  const parsed_string: number | unknown = JSON.parse(loaded_string);
  if (typeof parsed_string !== "number") {
    return 0;
  }

  return parsed_string;
};

const saveNumber = (storage_key: string, value: number): void => {
  const data_string: string = JSON.stringify(value);
  localStorage.setItem(storage_key, data_string);
};

export const useNumber = (
  storage_key: string,
): {
  value: number;
  onValueChange: (next_value: number) => void;
} => {
  const [value, setValue] = useState((): number => {
    return loadNumber(storage_key);
  });

  const onValueChange = useCallback((next_value: number): void => {
    setValue(next_value);
  }, []);

  useEffect(() => {
    saveNumber(storage_key, value);
  }, [value]);

  return {
    value,
    onValueChange,
  };
};
