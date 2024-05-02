import { Proliferator } from "@eurydos/dsp-item-registry";
import {
	Battery80Sharp,
	BoltRounded,
	SpeedRounded,
} from "@mui/icons-material";
import {
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { FC, ReactNode } from "react";
import { StyledInfoCard } from "~components/StyledInfoCard";
import { formatNumber } from "~core/formatting";

const PROLIF_INFO_DEFINITION: {
	icon: ReactNode;
	render: (p: Proliferator) => ReactNode;
	secondary: ReactNode;
}[] = [
	{
		icon: <SpeedRounded />,
		render: (prolif: Proliferator) =>
			`${formatNumber(
				(prolif.cycleMultiplier - 1) * 100,
			)}%`,
		secondary: "Bonus cycle speed",
	},
	{
		icon: <SpeedRounded />,
		render: (prolif: Proliferator) =>
			`${formatNumber(
				(prolif.productMultiplier - 1) * 100,
			)}%`,
		secondary: "Bonus products per cycle",
	},
	{
		icon: <BoltRounded />,
		render: (prolif: Proliferator) =>
			`${formatNumber(
				(prolif.workConsumptionMultiplier - 1) *
					100,
			)}%`,
		secondary: "Additional work consumption",
	},
];

type ProlifInfoProps = {
	prolif: Proliferator;
	prolifSpray: string;
};
export const ProlifInfo: FC<ProlifInfoProps> = (
	props,
) => {
	const { prolif, prolifSpray } = props;

	const renderedItems =
		PROLIF_INFO_DEFINITION.map(
			({ icon, secondary, render }, index) => (
				<ListItem key={`item-${index}`}>
					<ListItemIcon>{icon}</ListItemIcon>
					<ListItemText
						secondary={secondary}
						primary={render(prolif)}
					/>
				</ListItem>
			),
		);
	const prolifSpray_ = formatNumber(
		prolifSpray === ""
			? 0
			: Number.parseInt(prolifSpray),
	);
	const renderedSprayCount = (
		<ListItem>
			<ListItemIcon>
				<Battery80Sharp />
			</ListItemIcon>
			<ListItemText
				secondary={"Sprays"}
				primary={prolifSpray_}
			/>
		</ListItem>
	);
	return (
		<StyledInfoCard subheader=" Proliferator effects">
			{renderedItems}
			{renderedSprayCount}
		</StyledInfoCard>
	);
};
