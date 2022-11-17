import { FC } from "react";
import { Stack, Typography } from "@mui/material";

interface FacilityDisplayProps {
  facilityTotal: number;
  facilitySets: number;
  facilityPerSet: number;
  facilityLeftover: number;
}
const FacilityDisplay: FC<FacilityDisplayProps> = (props) => {
  const formatted_string = `${props.facilityTotal}: (${props.facilitySets} * ${props.facilityPerSet}) + ${props.facilityLeftover}`;

  return (
    <Stack>
      <Typography>Number of Facilities</Typography>
      <Typography paddingLeft={2}>{formatted_string}</Typography>
    </Stack>
  );
};

export default FacilityDisplay;
