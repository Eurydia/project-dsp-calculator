import {
  FC,
  ReactNode,
  SyntheticEvent,
  useState,
  ChangeEvent,
} from "react";
import {
  Box,
  Switch,
  FormControlLabel,
  FormControl,
  FormLabel,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
  InputAdornment,
  TextField,
  Tooltip,
  RadioGroup,
  Radio,
} from "@mui/material";
import { Help } from "@mui/icons-material";
import { useAtom } from "jotai";
import {
  facilityAtom,
  recipeAtom,
  sorterAtom,
  inputFlowRateAtom,
  outputFlowRateAtom,
  productionTargetAtom,
  prolifLevelAtom,
  prolifModeAtom,
  flagsAtom,
} from "../atoms";
import RECIPES from "../assets/data/recipes";
import { Facility, Recipe } from "../types";
import { PROLIF_PRODUCTION_SPEEDUP } from "../enums";
import FacilityAutocomplete from "../FacilityAutocomplete";
import RecipeAutocomplete from "../RecipeAutocomplete";
import SorterAutocomplete from "../SorterAutocomplete";
import {
  get_prolif,
  calculate_idle_consumption,
  calculate_material_per_minute,
  calculate_product_per_minute,
  calculate_work_consumption,
  calculate_n_facility_from_flow_rate,
  calculate_n_facility_needed,
} from "./helper";

interface TabPanelProps {
  index: number;
  active_index: number;
  children: ReactNode;
}
const TabPanel: FC<TabPanelProps> = (props) => {
  const { index, active_index } = props;

  let children: undefined | ReactNode = undefined;
  if (index === active_index) {
    children = props.children;
  }
  return <Box>{children}</Box>;
};

interface CustomDetailsProps {
  label: string;
  value: string | number;
}
const CustomDetail: FC<CustomDetailsProps> = (props) => {
  const { label, value } = props;
  return (
    <Stack direction="row" spacing={4} justifyContent="space-between">
      <Typography>{label}</Typography>
      <Typography>{value}</Typography>
    </Stack>
  );
};

interface CustomListProps {
  label: string;
  children: ReactNode;
}
/**
 * For grouping materials demand and products supply per minute.
 */
const CustomList: FC<CustomListProps> = (props) => {
  const { label, children } = props;
  return (
    <Box>
      <Typography>{label}</Typography>
      <Box paddingLeft={2}>{children}</Box>
    </Box>
  );
};

interface CustomNumberFieldProps {
  min_value?: number;
  max_value?: number;
  suffix?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}
/**
 * Number only field with clamping.
 * For input and output belt capacity.
 */
const CustomNumberField: FC<CustomNumberFieldProps> = (props) => {
  const { min_value, max_value } = props;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const input_field_value = event.target.value;
    /**
     * Remove non-digit charater typed on the input field,
     * effectively only allowing digits to be typed.
     */
    const numeric_only = input_field_value.replace(/[^0-9]/, "");

    if (numeric_only === "") {
      props.onChange("");
    } else {
      let value = parseInt(numeric_only);
      /**
       * If given, prevent value from going below.
       */
      if (min_value !== undefined && value < min_value) {
        value = min_value;
      }
      /**
       * Or greater than.
       */
      if (max_value !== undefined && value > max_value) {
        value = max_value;
      }
      props.onChange(value.toString());
    }
  };

  return (
    <TextField
      fullWidth
      label={props.label}
      value={props.value}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {props.suffix}
          </InputAdornment>
        ),
        inputProps: {
          inputMode: "numeric",
          style: { textAlign: "right" },
        },
      }}
    />
  );
};

interface CustomSwitchProps {
  tooltip: string;
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}
/**
 * Display an on/off switch with label and tooltip.
 * For Flags.
 */
const CustomSwitch: FC<CustomSwitchProps> = (props) => {
  const handleChange = (
    event: SyntheticEvent<Element | Event>,
    checked: boolean,
  ) => {
    props.onChange(checked);
  };

  return (
    <Stack direction="row" alignItems="center">
      <FormControlLabel
        label={props.label}
        checked={props.checked}
        onChange={handleChange}
        control={<Switch />}
      />
      <Tooltip
        placement="right-start"
        title={<Typography>{props.tooltip!}</Typography>}
      >
        <Help fontSize="small" />
      </Tooltip>
    </Stack>
  );
};

interface BlueprintFormProps {}
const BlueprintForm: FC<BlueprintFormProps> = (props) => {
  const [tab, setTab] = useState(0);

  const [facility, setFacility] = useAtom(facilityAtom);
  const [recipe, setRecipe] = useAtom(recipeAtom);
  const [sorter, setSorter] = useAtom(sorterAtom);

  const [inFlow, setInFlow] = useAtom(inputFlowRateAtom);
  const [outFlow, setOutFlow] = useAtom(outputFlowRateAtom);

  /**
   * This represent the production target object.
   * The keys are product names, and values are strings,
   * which will be converted to numbers.
   */
  const [prodTarget, setProdTarget] = useAtom(productionTargetAtom);

  const [prolifLevel, setProlifLevel] = useAtom(prolifLevelAtom);
  const [prolifMode, setProlifMode] = useAtom(prolifModeAtom);

  const [flags, setFlags] = useAtom(flagsAtom);

  const handleTabChange = (
    event: SyntheticEvent<Element, Event>,
    new_tab: number,
  ) => {
    setTab(new_tab);
  };

  /**
   * When facility changes, the recipe may also need to be change as well.
   * @param next_facility Facility to be set.
   */
  const handleFacilityChange = (next_facility: Facility) => {
    const prev_recipe_type = recipe.recipe_type;
    const next_recipe_type = next_facility.recipe_type;

    setFacility(next_facility);
    if (prev_recipe_type !== next_recipe_type) {
      /**
       * Set recipe to the first recipe with matching recipe type.
       * Note: This will not set new recipe if
       * it can't find a match.
       */
      for (const r of RECIPES) {
        if (r.recipe_type === next_recipe_type) {
          handleRecipeChange(r);
          break;
        }
      }
    }
  };
  /**
   * Some recipe only have speedup bonus available.
   * So I need to update the bonus.
   * Also, when recipe change, the
   * products may also change as well,
   * which is why I need to update
   * `prodTarget` as well.
   * @param next_recipe Recipe to be set.
   */
  const handleRecipeChange = (next_recipe: Recipe) => {
    setRecipe(next_recipe);

    if (next_recipe.speedup_only) {
      setProlifMode(PROLIF_PRODUCTION_SPEEDUP);
    }

    setProdTarget((prev) => {
      const next: { [key: string]: string } = {};
      for (const key of Object.keys(next_recipe.product)) {
        const prev_value: undefined | string = prev[key];

        let next_value = "";
        if (prev_value !== undefined) {
          next_value = prev_value;
        }

        next[key] = next_value;
      }
      return next;
    });
  };

  const handleProdTargetChange = (
    product_name: string,
    next_value: string,
  ) => {
    setProdTarget((prev) => {
      const next = { ...prev };
      next[product_name] = next_value;
      return next;
    });
  };

  const handleProlifModechange = (
    event: ChangeEvent<HTMLInputElement>,
    next_value: string,
  ) => {
    setProlifMode(parseInt(next_value));
  };
  const handleProlifLevelChange = (
    event: ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    setProlifLevel(parseInt(value));
  };

  const handleFlagChange = (
    flag_key: string,
    next_state: boolean,
  ) => {
    setFlags((prev) => {
      const next = { ...prev };
      next[flag_key] = { ...next[flag_key], state: next_state };
      return next;
    });
  };

  const proliferator = get_prolif(prolifLevel, prolifMode);
  const in_flow = parseInt(inFlow);
  const out_flow = parseInt(outFlow);

  let n_facility_per_set = 0;
  /**
   * Calculate the maximal number of facilities per set
   * using the given configuration.
   *
   * Skip if input capacity or output capacity
   * is `NaN`. (`parseInt` resolves to `NaN` when passed an empty string)
   */
  if (!isNaN(in_flow) && !isNaN(out_flow)) {
    n_facility_per_set = calculate_n_facility_from_flow_rate(
      facility,
      recipe,
      proliferator,
      in_flow,
      out_flow,
      flags["0"].state,
      flags["1"].state,
    );
  }
  /**
   * Calculate the minimal number of facilites needed to
   * satisfy the production target.
   *
   * If the production target is not set (empty string),
   * then display the "maximal number of facility per set" instead.
   */
  let n_facility = calculate_n_facility_needed(
    facility,
    recipe,
    proliferator,
    prodTarget,
  );
  if (n_facility === 0) {
    n_facility = n_facility_per_set;
  }
  /**
   * Calculate work power consumption, idle power consumption,
   * material needed per minute, and products produce per minute
   * using `n_facility`.
   *
   * For power consumption, if flag #2 (count sorters consumption) is active,
   * pass current sorter to the fuction as well.
   */
  const work_consumption = calculate_work_consumption(
    n_facility,
    facility,
    recipe,
    proliferator,
    flags["2"].state ? sorter : null,
  );
  const idle_consumption = calculate_idle_consumption(
    n_facility,
    facility,
    recipe,
    flags["2"].state ? sorter : null,
  );
  const material = calculate_material_per_minute(
    n_facility,
    facility,
    recipe,
    proliferator,
  );
  const product = calculate_product_per_minute(
    n_facility,
    facility,
    recipe,
    proliferator,
  );

  return (
    <Paper sx={{ padding: 4 }}>
      <Box paddingBottom={2}>
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label="config" value={0} />
          <Tab label="result" value={1} />
        </Tabs>
      </Box>
      <TabPanel index={0} active_index={tab}>
        <Grid container spacing={2} columns={{ md: 10 }}>
          <Grid item md={5}>
            <FacilityAutocomplete
              value={facility}
              onChange={handleFacilityChange}
            />
          </Grid>
          <Grid item md={5}>
            <RecipeAutocomplete
              recipe_type={facility.recipe_type}
              value={recipe}
              onChange={handleRecipeChange}
            />
          </Grid>
          <Grid item md={10}>
            <SorterAutocomplete value={sorter} onChange={setSorter} />
          </Grid>
          <Grid item md={5}>
            <CustomNumberField
              min_value={0}
              max_value={120}
              suffix="/s"
              label="Input transport speed"
              value={inFlow}
              onChange={setInFlow}
            />
          </Grid>
          <Grid item md={5}>
            <CustomNumberField
              min_value={0}
              max_value={120}
              suffix="/s"
              label="Output transport speed"
              value={outFlow}
              onChange={setOutFlow}
            />
          </Grid>
          <Grid item md={5}>
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
          </Grid>
          <Grid item md={5}>
            <Typography gutterBottom>Prodcution target</Typography>
            {Object.keys(prodTarget).map((key) => (
              <CustomNumberField
                key={key}
                label={key}
                min_value={0}
                suffix="/min"
                value={prodTarget[key]}
                onChange={(value) =>
                  handleProdTargetChange(key, value)
                }
              />
            ))}
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel index={1} active_index={tab}>
        <Stack spacing={2}>
          <Typography gutterBottom>
            {`${Math.floor(
              n_facility / n_facility_per_set,
            )} set(s) of ${n_facility_per_set} facility(s) with ${
              n_facility % n_facility_per_set
            } extra.`}
          </Typography>
          <CustomDetail
            label="number of facility"
            value={`${n_facility}`}
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
      </TabPanel>
    </Paper>
  );
};

export default BlueprintForm;
