import { useCallback, useEffect, useState } from "react";
import { Facility } from "../assets/data";

const loadFacility = (storage_key: string): Facility => {
  const fallback: Facility = Facility.getDefault();

  const loaded_string: string | null =
    localStorage.getItem(storage_key);

  if (loaded_string === null) {
    return fallback;
  }

  const parsed_string: string | unknown = JSON.parse(loaded_string);
  if (typeof parsed_string !== "string") {
    return fallback;
  }

  const facility: Facility | null = Facility.fromLabel(parsed_string);
  if (facility === null) {
    return fallback;
  }

  return facility;
};

const saveFacility = (
  storage_key: string,
  facility: Facility,
): void => {
  const data_string: string = Facility.toString(facility);
  localStorage.setItem(storage_key, data_string);
};

export const useFacility = (
  storage_key: string,
): {
  facility: Facility;
  onFacilityChange: (next_facility: Facility) => void;
} => {
  const [value, setValue] = useState(() => {
    return loadFacility(storage_key);
  });

  const onFacilityChange = useCallback(
    (next_facility: Facility): void => {
      setValue(next_facility);
    },
    [],
  );

  useEffect(() => {
    saveFacility(storage_key, value);
  }, [value]);

  return {
    facility: value,
    onFacilityChange,
  };
};
