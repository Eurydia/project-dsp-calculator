import { useEffect, useState } from "react";
import { z } from "zod";

import { Facility, RecipeEnum } from "../../types";

const facilitySchema = z.object({
  label: z.string(),
  speed_multiplier: z.number(),
  work_consumption_MW: z.number(),
  idle_consumption_MW: z.number(),
  recipe_type: z.nativeEnum(RecipeEnum),
});

const isValidJSON = (data: string): boolean => {
  try {
    JSON.parse(data);
    return true;
  } catch {
    return false;
  }
};

const loadData = (
  storage_key: string,
  fallback: Facility,
): Facility => {
  const loaded_string: string | null =
    localStorage.getItem(storage_key);

  if (loaded_string === null) {
    return fallback;
  }

  if (!isValidJSON(loaded_string)) {
    return fallback;
  }

  const json_parsed_data = JSON.parse(loaded_string);
  const zod_parsed_data = facilitySchema.safeParse(json_parsed_data);
  if (!zod_parsed_data.success) {
    return fallback;
  }

  const { data } = zod_parsed_data;
  const facility: Facility | null = Facility.fromLabel(data.label);
  if (facility !== null) {
    return facility;
  }
  return data;
};

const saveData = (storage_key: string, data: Facility): void => {
  const data_string: string = Facility.toJSON(data);
  localStorage.setItem(storage_key, data_string);
};

export const useFacility = (
  storage_key: string,
  default_value: Facility,
): {
  facility: Facility;
  setFacility: (
    next_facility: Facility | ((prev_facility: Facility) => Facility),
  ) => void;
} => {
  const [value, setValue] = useState<Facility>(() => {
    return loadData(storage_key, default_value);
  });

  useEffect(() => {
    saveData(storage_key, value);
  }, [value]);

  return {
    facility: value,
    setFacility: setValue,
  };
};
