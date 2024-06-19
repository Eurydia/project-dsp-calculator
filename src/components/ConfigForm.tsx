import { GAME_VERSION } from "@eurydos/dsp-item-registry";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Collapsible } from "~components/Collapsible";
import { FacilitySelect } from "~components/FacilitySelect";
import { FlowrateField } from "~components/FlowrateField";
import { ProlfieratorSprayCountField } from "~components/ProlfieratorSprayCountField";
import { ProliferatorSelect } from "~components/ProliferatorSelect";
import { RecipeSelect } from "~components/RecipeSelect";
import { SorterField } from "~components/SorterField";
import {
	ConfigFormData,
	configFormHandlers,
} from "~types/query";

export type ConfigFormProps = {
	data: ConfigFormData;
	handlers: configFormHandlers;
};
export const ConfigForm: FC<ConfigFormProps> = (
	props,
) => {
	const { data, handlers } = props;

	const flowrateFieldGroup = Object.entries(
		data.flowrate,
	).map(([label, value]) => (
		<FlowrateField
			key={label}
			value={value}
			label={label}
			onChange={handlers.handleFlowrateChange}
		/>
	));

	const sorterFieldGroup = Object.entries(
		data.s,
	).map(([label, value]) => (
		<SorterField
			key={label}
			maxConnection={data.f.connectionCount}
			label={label}
			value={value}
			onChange={handlers.handleSChange}
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
					value={data.f}
					onChange={handlers.handleFChange}
				/>
				<RecipeSelect
					value={data.r}
					onChange={handlers.handleRChange}
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
					speedupOnly={data.r.speedupOnly}
					onChange={handlers.handlePChange}
				/>
				<ProlfieratorSprayCountField
					defaultValue={data.p.sprayCount.toString()}
					value={data.pSprayCount}
					disabled={data.p.label === "None"}
					onChange={handlers.handlePSprayCount}
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
