import { FC, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import CustomNumberField from "../CustomNumberField";
import CustomDisplay from "../CustomDisplay";
import {
  calculate_idle_consumption,
  calculate_material_per_minute,
  calculate_product_per_minute,
  calculate_work_consumption,
} from "../BlueprintForm/helper";
import { Facility, Proliferator, Recipe, Sorter } from "../types";

interface ConfigBProps {
  nFacilityPerSet: number;
  facility: Facility;
  recipe: Recipe;
  sorter: Sorter;
  proliferator: Proliferator;
  countSorterFlag: boolean;
}
const ConfigB: FC<ConfigBProps> = (props) => {
  const { facility, recipe, sorter, proliferator, countSorterFlag } =
    props;

  const [demand, setDemand] = useState<{ [key: string]: string }>(
    () => {
      const res: { [key: string]: string } = {};

      for (const key of Object.keys(recipe.product)) {
        res[key] = "";
      }
      return res;
    },
  );

  useEffect(() => {
    setDemand((prev) => {
      const next: { [key: string]: string } = {};
      for (const key of Object.keys(recipe.product)) {
        const prev_val = prev[key];
        let next_val = "";
        if (prev_val !== undefined) {
          next_val = prev_val;
        }

        next[key] = next_val;
      }
      return next;
    });
  }, [recipe, setDemand]);

  const handleDemandChange = (key: string, value: string) => {
    setDemand((prev) => {
      const next = { ...prev };
      next[key] = value;
      return next;
    });
  };

  const n_facility_needed = (() => {
    const product_per_f = calculate_product_per_minute(
      1,
      facility,
      recipe,
      proliferator,
    );

    let f_needed = 0;
    for (const key of Object.keys(demand)) {
      let curr_needed = 0;

      const product_demand = parseInt(demand[key]);
      if (!isNaN(product_demand)) {
        curr_needed = Math.ceil(product_demand / product_per_f[key]);
      }

      if (curr_needed > f_needed) {
        f_needed = curr_needed;
      }
    }
    return f_needed;
  })();

  const n_set = Math.floor(n_facility_needed / props.nFacilityPerSet);
  const n_leftover = n_facility_needed % props.nFacilityPerSet;

  return (
    <Card raised>
      <CardHeader title="calculate n facility from demand" />
      <CardContent>
        <Stack spacing={4} divider={<Divider flexItem />}>
          <Stack spacing={2} width={0.4}>
            {Object.keys(demand).map((key, index) => (
              <CustomNumberField
                key={key}
                label={key}
                min_value={0}
                suffix="/min"
                value={demand[key]}
                onChange={(value) => handleDemandChange(key, value)}
              />
            ))}
          </Stack>
          <Box width={0.6}>
            <Typography fontWeight="medium">{`${n_set} set of ${props.nFacilityPerSet} facility with ${n_leftover} extra`}</Typography>
            <CustomDisplay
              nFacility={n_facility_needed}
              facility={facility}
              recipe={recipe}
              sorter={sorter}
              proliferator={proliferator}
              countSorterFlag={countSorterFlag}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ConfigB;
