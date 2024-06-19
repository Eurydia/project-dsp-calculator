import { GAME_VERSION } from "@eurydos/dsp-item-registry";
import { Stack, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { Collapsible } from "~components/Collapsible";
import { FacilitySelect } from "~components/FacilitySelect";
import { FlowrateField } from "~components/FlowrateField";
import { ProlfieratorSprayCountField } from "~components/ProlfieratorSprayCountField";
import { ProliferatorSelect } from "~components/ProliferatorSelect";
import { RecipeSelect } from "~components/RecipeSelect";
import { SorterField } from "~components/SorterField";
import { useConfigForm } from "~hooks/useConfigForm";
import {
	ConfigFormData,
	ConfigFormOptions,
} from "~types/query";

export type ConfigFormProps = {
	query: ConfigFormData;
	options: ConfigFormOptions;
	onChange: (next: ConfigFormData) => void;
};
export const ConfigForm: FC<ConfigFormProps> = (
	props,
) => {
	const { query, options, onChange } = props;
	const {
		data,
		handleFChange,
		handleRChange,
		handlePChange,
		handleFlowrateChange,
		handleSChange,
		setPSprayCount,
	} = useConfigForm(query);

	useEffect(() => {
		onChange(data);
	}, [data]);

	const flowrateFieldGroup = Object.entries(
		data.flowrate,
	).map(([label, value]) => (
		<FlowrateField
			key={label}
			value={value}
			label={label}
			onChange={handleFlowrateChange}
		/>
	));
	const sorterFieldGroup = Object.entries(
		data.s,
	).map(([label, value]) => (
		<SorterField
			maxConnection={data.f.connectionCount}
			key={label}
			value={value}
			label={label}
			onChange={handleSChange}
		/>
	));

	return (
		<Stack spacing={2}>
			<Typography
				fontWeight="600"
				fontSize="x-large"
				color="secondary.main"
			>
				Configuration
			</Typography>
			<Typography
				fontWeight="400"
				fontSize="small"
			>
				DSP version: {GAME_VERSION}
			</Typography>
			<Collapsible title="Manufacturing">
				<FacilitySelect
					options={options.f}
					value={data.f}
					onChange={handleFChange}
				/>
				<RecipeSelect
					options={options.r}
					value={data.r}
					onChange={handleRChange}
					recipeType={data.f.recipeType}
				/>
			</Collapsible>
			<Collapsible title="Transport capacity">
				<Stack spacing={1}>
					{flowrateFieldGroup}
				</Stack>
			</Collapsible>
			<Collapsible title="Proliferation">
				<ProliferatorSelect
					value={data.p}
					options={options.p}
					speedupOnly={data.r.speedupOnly}
					onChange={handlePChange}
				/>
				<ProlfieratorSprayCountField
					defaultValue={data.p.sprayCount.toString()}
					value={data.pSprayCount}
					disabled={data.p.label === "None"}
					onChange={setPSprayCount}
				/>
			</Collapsible>
			<Collapsible title="Sorter connections">
				<Stack spacing={1}>
					{sorterFieldGroup}
				</Stack>
			</Collapsible>
		</Stack>
	);
};
