import { GAME_VERSION } from "@eurydos/dsp-item-registry";
import { Stack, Typography } from "@mui/material";
import { FC, ReactNode } from "react";
import { CollapseRegion } from "../../components/CollapseRegion";

type SetupConfigProps = {
	facilitySelect: ReactNode;
	recipeSelect: ReactNode;
	flowrateNumberFields: ReactNode;
	proliferatorSelect: ReactNode;
	prolfieratorUsesNumberField: ReactNode;
	sorterSelects: ReactNode;
};
export const SetupConfig: FC<SetupConfigProps> = (
	props,
) => {
	const {
		facilitySelect,
		flowrateNumberFields,
		prolfieratorUsesNumberField,
		proliferatorSelect,
		recipeSelect,
		sorterSelects,
	} = props;
	return (
		<Stack spacing={2}>
			<Typography>Configuration</Typography>
			<Typography variant="subtitle1">
				DSP version: {GAME_VERSION}
			</Typography>
			<CollapseRegion title="Manufacturing">
				<Stack spacing={2}>
					{facilitySelect}
					{recipeSelect}
				</Stack>
			</CollapseRegion>
			<CollapseRegion title="Transport capacity">
				<Stack spacing={2}>
					{flowrateNumberFields}
				</Stack>
			</CollapseRegion>
			<CollapseRegion title="Proliferation">
				<Stack spacing={2}>
					{proliferatorSelect}
					{prolfieratorUsesNumberField}
				</Stack>
			</CollapseRegion>
			<CollapseRegion title="Sorter connections">
				<Stack spacing={2}>{sorterSelects}</Stack>
			</CollapseRegion>
		</Stack>
	);
};
