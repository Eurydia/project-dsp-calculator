import {
  FC,
  Fragment,
  ReactNode,
  SyntheticEvent,
  useState,
} from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import RECIPES from "../data/recipes";
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
import { Facility, Recipe } from "../types";
import { PROLIF_PRODUCTION_SPEEDUP } from "../enums";
import FacilityAutocomplete from "../FacilityAutocomplete";
import RecipeAutocomplete from "../RecipeAutocomplete";
import SorterAutocomplete from "../SorterAutocomplete";
import ProliferatorModeSelector from "../ProliferatorModeSelect";
import ProliferatorLevelSelect from "../ProliferatorLevelSelect";
import CustomNumberField from "../CustomNumberField";
import CustomSwitch from "../CustomSwitch";
import {
  calculate_idle_consumption,
  calculate_material_per_minute,
  calculate_product_per_minute,
  calculate_work_consumption,
  calculate_n_facility_from_flow_rate,
  get_prolif,
  calculate_n_facility_needed,
} from "./helper";

interface TabPanelProps {
  index: number;
  active_index: number;
  children: ReactNode;
}
const TabPanel: FC<TabPanelProps> = (props) => {
  const is_visible = props.index === props.active_index;

  if (is_visible) {
    return <Box>{props.children}</Box>;
  }
  return <Fragment />;
};
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

interface ConfigGProps {}
const BlueprintForm: FC<ConfigGProps> = (props) => {
  const [tab, setTab] = useState(0);

  const [facility, setFacility] = useAtom(facilityAtom);
  const [recipe, setRecipe] = useAtom(recipeAtom);
  const [sorter, setSorter] = useAtom(sorterAtom);

  const [inFlow, setInFlow] = useAtom(inputFlowRateAtom);
  const [outFlow, setOutFlow] = useAtom(outputFlowRateAtom);

  const [prodTarget, setProdTarget] = useAtom(productionTargetAtom);

  const [pLevel, setPLevel] = useAtom(prolifLevelAtom);
  const [pMode, setPMode] = useAtom(prolifModeAtom);

  const [flags, setFlags] = useAtom(flagsAtom);

  const handleTabChange = (
    evemt: SyntheticEvent<Element, Event>,
    new_tab: number,
  ) => {
    setTab(new_tab);
  };

  const handleFacilityChange = (next: Facility) => {
    const prev_recipe_type = recipe.recipe_type;
    const next_recipe_type = next.recipe_type;

    setFacility(next);
    if (prev_recipe_type !== next_recipe_type) {
      for (const r of RECIPES) {
        if (r.recipe_type === next_recipe_type) {
          handleRecipeChange(r);
          break;
        }
      }
    }
  };

  const handleRecipeChange = (next: Recipe) => {
    setRecipe(next);

    setProdTarget((prev) => {
      const next_prod_target: { [key: string]: string } = {};
      for (const key of Object.keys(next.product)) {
        const prev_value = prev[key];

        let next_value = "";
        if (prev_value !== undefined) {
          next_value = prev_value;
        }

        next_prod_target[key] = next_value;
      }
      return next_prod_target;
    });

    if (next.speedup_only) {
      setPMode(PROLIF_PRODUCTION_SPEEDUP);
    }
  };

  const handleProdTargetChange = (
    item_key: string,
    value: string,
  ) => {
    setProdTarget((prev) => {
      const next = { ...prev };
      next[item_key] = value;
      return next;
    });
  };

  const handleFlagChange = (
    flag_key: string,
    next_state: boolean,
  ) => {
    setFlags((prev) => {
      const next = { ...prev };
      const target = next[flag_key];
      next[flag_key] = { ...target, state: next_state };
      return next;
    });
  };

  const proliferator = get_prolif(pLevel, pMode);

  const in_flow = parseInt(inFlow);
  const out_flow = parseInt(outFlow);

  let n_facility_per_set = 0;
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

  let n_facility = calculate_n_facility_needed(
    facility,
    recipe,
    proliferator,
    prodTarget,
  );

  if (n_facility === 0) {
    n_facility = n_facility_per_set;
  }

  if (Boolean(flags["1"].state) && n_facility % 2 === 1) {
    n_facility += 1;
  }

  const work_consumption = calculate_work_consumption(
    n_facility,
    facility,
    recipe,
    sorter,
    proliferator,
    flags["2"].state,
  );

  const idle_consumption = calculate_idle_consumption(
    n_facility,
    facility,
    recipe,
    sorter,
    flags["2"].state,
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
              <ProliferatorLevelSelect
                value={pLevel}
                onChange={setPLevel}
              />
              <ProliferatorModeSelector
                speedup_only={recipe.speedup_only}
                value={pMode}
                onChange={setPMode}
              />
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
