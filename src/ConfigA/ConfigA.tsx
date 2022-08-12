import { FC, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
} from "@mui/material";
import { Facility, Proliferator, Recipe, Sorter } from "../types";
import CustomNumberField from "../CustomNumberField";
import CustomDisplay from "../CustomDisplay";

interface ConfigAProps {
  facility: Facility;
  recipe: Recipe;
  sorter: Sorter;
  proliferator: Proliferator;
  countSorterFlag: boolean;
}
const ConfigA: FC<ConfigAProps> = (props) => {
  const [nSet, setNSet] = useState("");
  const [nPerSet, setNPerSet] = useState("");
  const [nLeftover, setNLeftover] = useState("");

  const n_of_set = parseInt(nSet);
  const n_per_set = parseInt(nPerSet);
  const n_leftover = parseInt(nLeftover);

  let n_facility = 0;
  if (!isNaN(n_per_set)) {
    n_facility = n_per_set;
  }

  if (!isNaN(n_of_set)) {
    n_facility *= n_of_set;
  }

  if (!isNaN(n_leftover)) {
    n_facility += n_leftover;
  }

  return (
    <Card raised>
      <CardHeader title="calculate from n facilities" />
      <CardContent>
        <Stack spacing={4} divider={<Divider flexItem />}>
          <Stack spacing={2} width={0.4}>
            <CustomNumberField
              label="number of facility"
              min_value={0}
              value={nPerSet}
              onChange={setNPerSet}
            />

            <CustomNumberField
              label="number of set"
              min_value={0}
              value={nSet}
              onChange={setNSet}
            />
            <CustomNumberField
              label="leftover facility"
              min_value={0}
              value={nLeftover}
              onChange={setNLeftover}
            />
          </Stack>
          <Box width={0.6}>
            <CustomDisplay
              nFacility={n_facility}
              facility={props.facility}
              recipe={props.recipe}
              sorter={props.sorter}
              proliferator={props.proliferator}
              countSorterFlag={props.countSorterFlag}
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ConfigA;
