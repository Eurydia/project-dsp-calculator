import { Box, Grid } from "@mui/material";
import { FC } from "react";
import { FieldNumber } from "../FieldNumber";

type FormFlowrateProps = {
  inputFlow: number;
  outputFlow: number;
  onInputFlowChange: (next_flow: number) => void;
  onOutputFlowChange: (next_flow: number) => void;
};

export const FormFlowrate: FC<FormFlowrateProps> = (props) => {
  const {
    inputFlow: inputFlow,
    outputFlow,
    onInputFlowChange,
    onOutputFlowChange,
  } = props;

  return (
    <Box>
      <Grid container spacing={2} columns={{ xs: 1, sm: 2 }}>
        <Grid item xs={1}>
          <FieldNumber
            suffix="/s"
            label="Input flowrate"
            minValue={6}
            maxValue={120}
            value={inputFlow}
            onValueChange={onInputFlowChange}
          />
        </Grid>
        <Grid item xs={1}>
          <FieldNumber
            suffix="/s"
            label="Output flowrate"
            minValue={6}
            maxValue={120}
            value={outputFlow}
            onValueChange={onOutputFlowChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
