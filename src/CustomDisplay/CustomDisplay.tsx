import { FC, ReactNode } from "react";
import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  BOM,
  Facility,
  Proliferator,
  Recipe,
  Sorter,
} from "../types";
import {
  calculate_idle_consumption,
  calculate_material_per_minute,
  calculate_product_per_minute,
  calculate_work_consumption,
} from "../BlueprintForm/helper";

interface CustomDetailsProps {
  label: string;
  value: string | number;
}
const CustomDetail: FC<CustomDetailsProps> = (props) => {
  return (
    <Stack direction="row" spacing={4} justifyContent="space-between">
      <Typography>{props.label}</Typography>
      <Typography>{props.value}</Typography>
    </Stack>
  );
};

interface CustomListProps {
  label: string;
  children: ReactNode;
}
const CustomList: FC<CustomListProps> = (props) => {
  return (
    <Box>
      <Typography>{props.label}</Typography>
      <Box paddingLeft={2}>{props.children}</Box>
    </Box>
  );
};

interface CustomDisplayProps {
  nFacility: number;
  facility: Facility;
  recipe: Recipe;
  sorter: Sorter;
  proliferator: Proliferator;
  countSorterFlag: boolean;
}
const CustomDisplay: FC<CustomDisplayProps> = (props) => {
  const {
    nFacility,
    facility,
    recipe,
    sorter,
    proliferator,
    countSorterFlag,
  } = props;
  const work_consumption = calculate_work_consumption(
    nFacility,
    facility,
    recipe,
    sorter,
    proliferator,
    countSorterFlag,
  );

  const idle_consumption = calculate_idle_consumption(
    nFacility,
    facility,
    recipe,
    sorter,
    countSorterFlag,
  );

  const material = calculate_material_per_minute(
    nFacility,
    facility,
    recipe,
    proliferator,
  );

  const product = calculate_product_per_minute(
    nFacility,
    facility,
    recipe,
    proliferator,
  );

  return (
    <Stack spacing={2}>
      <CustomDetail
        label="number of facility"
        value={`${nFacility}`}
      />
      <CustomDetail
        label="work consumption"
        value={`${work_consumption} MW`}
      />
      <CustomDetail
        label="idle consumption"
        value={`${idle_consumption} MW`}
      />
      <CustomList label="material">
        {Object.keys(material).map((k) => (
          <CustomDetail
            key={k}
            label={k}
            value={`- ${material[k]} /min`}
          />
        ))}
      </CustomList>
      <CustomList label="product">
        {Object.keys(product).map((k) => (
          <CustomDetail
            key={k}
            label={k}
            value={`+ ${product[k]} /min`}
          />
        ))}
      </CustomList>
    </Stack>
  );
};

export default CustomDisplay;
