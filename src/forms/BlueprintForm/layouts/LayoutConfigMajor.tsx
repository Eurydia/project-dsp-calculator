import { Box, Grid } from "@mui/material";
import { FC, ReactNode } from "react";

interface LayoutConfigMajorProps {
  slotFacility: ReactNode;
  slotRecipe: ReactNode;
  slotSorter: ReactNode;
  slotInputFlow: ReactNode;
  slotOutputFlow: ReactNode;
}
const LayoutConfigMajor: FC<LayoutConfigMajorProps> = (props) => {
  return (
    <Box>
      <Grid container spacing={2} columns={{ xs: 1, md: 10 }}>
        <Grid item md={5} xs={1}>
          {props.slotFacility}
        </Grid>
        <Grid item md={5} xs={1}>
          {props.slotRecipe}
        </Grid>
        <Grid item md={10} xs={1}>
          {props.slotSorter}
        </Grid>
        <Grid item md={5} xs={1}>
          {props.slotInputFlow}
        </Grid>
        <Grid item md={5} xs={1}>
          {props.slotOutputFlow}
        </Grid>
        {/* <Grid item md={5}>
        <Stack spacing={2}>
          <FormControl size="small">
            <FormLabel>Proliferator Bonus</FormLabel>
            <RadioGroup
              value={prolifMode}
              onChange={handleProlifModechange}
            >
              <FormControlLabel
                label="Extra products"
                value={0}
                control={<Radio />}
              />
              <FormControlLabel
                label="Production speedup"
                value={1}
                control={<Radio />}
              />
            </RadioGroup>
          </FormControl>
          <FormControl size="small">
            <FormLabel>Proliferator Level</FormLabel>
            <RadioGroup
              value={prolifLevel}
              onChange={handleProlifLevelChange}
            >
              {[0, 1, 2, 3].map((label, index) => (
                <FormControlLabel
                  key={`prolif-level-${index}`}
                  label={label}
                  value={index}
                  control={<Radio />}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Stack>
      </Grid>
      <Grid item md={5}>
        <FormControl>
          <FormLabel>Flags</FormLabel>
          {Object.keys(flags).map((key) => (
            <CustomSwitch
              key={key}
              label={flags[key].label}
              tooltip={flags[key].tooltip}
              checked={flags[key].state}
              onChange={(value) => handleFlagChange(key, value)}
            />
          ))}
        </FormControl>
      </Grid> */}
      </Grid>
    </Box>
  );
};

export default LayoutConfigMajor;
