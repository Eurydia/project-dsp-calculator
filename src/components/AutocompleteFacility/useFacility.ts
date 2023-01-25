import { useCallback, useEffect, useState } from "react";
import { Facility, AssetFacilities } from "../../assets";

const BASE_FACILITY = AssetFacilities[0];

const loadFacility = (storage_key: string): Facility => {
  const loaded_string: string | null =
    localStorage.getItem(storage_key);

  if (loaded_string === null) {
    return BASE_FACILITY;
  }

  const parsed_string: string | unknown = JSON.parse(loaded_string);
  if (typeof parsed_string !== "string") {
    return BASE_FACILITY;
  }

  const facility: Facility | null = Facility.fromLabel(parsed_string);
  if (facility === null) {
    return BASE_FACILITY;
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
  setFacility: (next_facility: Facility) => void;
} => {
  const [value, setValue] = useState(() => {
    return loadFacility(storage_key);
  });

  const setFacility = useCallback((next_facility: Facility): void => {
    setValue(next_facility);
  }, []);

  useEffect(() => {
    saveFacility(storage_key, value);
  }, [value]);

  return {
    facility: value,
    setFacility,
  };
};
