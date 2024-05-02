import { Facility } from "@eurydos/dsp-item-registry";
import {
	AbcRounded,
	BoltRounded,
	CategoryRounded,
	SpeedRounded,
	UsbRounded,
} from "@mui/icons-material";
import {
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { FC, ReactNode } from "react";
import { StyledInfoCard } from "~components/StyledInfoCard";
import { formatNumber } from "~core/formatting";

const FACILITY_INFO_DEFINITIONS: {
	icon: ReactNode;
	render: (f: Facility) => ReactNode;
	secondary: ReactNode;
}[] = [
	{
		icon: <AbcRounded />,
		render: (facility: Facility) =>
			facility.label,
		secondary: "Name",
	},
	{
		icon: <CategoryRounded />,
		render: (facility: Facility) =>
			facility.recipeType,
		secondary: "Category",
	},
	{
		icon: <SpeedRounded />,
		render: (facility: Facility) =>
			`${formatNumber(
				facility.cycleMultiplier * 100,
			)}%`,
		secondary: "Cycle speed",
	},
	{
		icon: <UsbRounded />,
		render: (facility: Facility) =>
			facility.connectionCount,
		secondary: "Sorter connections",
	},
	{
		icon: <BoltRounded />,
		render: (facility: Facility) =>
			`${formatNumber(
				facility.workConsumptionMW,
			)} MW`,
		secondary: "Work comsumption",
	},
	{
		icon: <BoltRounded />,
		render: (facility: Facility) =>
			`${formatNumber(
				facility.idleConsumptionMW,
			)} MW`,
		secondary: "Idle comsumption",
	},
];

type FacilityInfoCardProps = {
	facility: Facility;
};
export const FacilityInfoCard: FC<
	FacilityInfoCardProps
> = (props) => {
	const { facility } = props;
	const renderedItems =
		FACILITY_INFO_DEFINITIONS.map(
			({ icon, secondary, render }, index) => (
				<ListItem key={`item-${index}`}>
					<ListItemIcon>{icon}</ListItemIcon>
					<ListItemText
						primary={render(facility)}
						secondary={secondary}
					/>
				</ListItem>
			),
		);
	return (
		<StyledInfoCard subheader="Recipe information">
			{renderedItems}
		</StyledInfoCard>
	);
};
