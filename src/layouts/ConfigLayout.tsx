import { GAME_VERSION } from "@eurydos/dsp-item-registry";
import { Stack } from "@mui/material";
import { FC, ReactNode } from "react";
import {
	StyledHeadingA,
	StyledHeadingB,
	StyledSubtitle,
} from "~components/StyledHeadings";
import { CollapseRegion } from "../components/CollapseRegion";

type ConfigLayoutProps = {
	facility: ReactNode;
	recipe: ReactNode;
	flowrates: ReactNode;
	proliferator: ReactNode;
	prolfieratorUses: ReactNode;
	sorters: ReactNode;
};
export const ConfigLayout: FC<
	ConfigLayoutProps
> = (props) => {
	const {
		facility,
		flowrates,
		prolfieratorUses,
		proliferator,
		recipe,
		sorters,
	} = props;
	return (
		<Stack spacing={2}>
			<StyledHeadingA>
				Configuration
			</StyledHeadingA>
			<StyledSubtitle>
				DSP version: {GAME_VERSION}
			</StyledSubtitle>
			<CollapseRegion
				title={
					<StyledHeadingB>
						Manufacturing
					</StyledHeadingB>
				}
			>
				{facility}
				{recipe}
			</CollapseRegion>
			<CollapseRegion
				title={
					<StyledHeadingB>
						Transport capacity
					</StyledHeadingB>
				}
			>
				{flowrates}
			</CollapseRegion>
			<CollapseRegion
				title={
					<StyledHeadingB>
						Proliferation
					</StyledHeadingB>
				}
			>
				{proliferator}
				{prolfieratorUses}
			</CollapseRegion>
			<CollapseRegion
				title={
					<StyledHeadingB>
						Sorter connections
					</StyledHeadingB>
				}
			>
				{sorters}
			</CollapseRegion>
		</Stack>
	);
};
