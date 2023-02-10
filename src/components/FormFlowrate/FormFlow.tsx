import { Box, Grid } from "@mui/material";
import { FC } from "react";
import { Sorter } from "../../assets";
import { AutocompleteSorter } from "../AutocompleteSorter";
import { FieldNumber } from "../FieldNumber";

type FormFlowrateProps = {
  sorter: Sorter;
  inputFlowrate: number;
  outputFlowrate: number;
  onSorterChange: (next_sorter: Sorter) => void;
  onInputFlowrateChange: (next_flow: number) => void;
  onOutputFlowrateChange: (next_flow: number) => void;
};

export const FormFlowrate: FC<FormFlowrateProps> = (props) => {
  const {
    sorter,
    inputFlowrate,
    outputFlowrate,
    onSorterChange,
    onInputFlowrateChange,
    onOutputFlowrateChange,
  } = props;

  return (
    <Box>
      <Grid container spacing={2} columns={1}>
        <Grid item xs={1} sm={2}>
          <AutocompleteSorter
            sorter={sorter}
            onSorterChange={onSorterChange}
          />
        </Grid>
        <Grid item xs={1}>
          <FieldNumber
            suffix="/s"
            label="Input capacity"
            minValue={6}
            maxValue={120}
            value={inputFlowrate}
            onValueChange={onInputFlowrateChange}
          />
        </Grid>
        <Grid item xs={1}>
          <FieldNumber
            suffix="/s"
            label="Output capacity"
            minValue={6}
            maxValue={120}
            value={outputFlowrate}
            onValueChange={onOutputFlowrateChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
