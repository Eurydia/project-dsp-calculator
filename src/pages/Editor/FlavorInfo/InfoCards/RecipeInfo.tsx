import { Recipe } from "@eurydos/dsp-item-registry";
import {
	AddRounded,
	DataSaverOffRounded,
	RemoveRounded,
	SpeedRounded,
} from "@mui/icons-material";
import {
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { FC, Fragment, ReactNode } from "react";
import { StyledInfoCard } from "~components/StyledInfoCard";
import { formatNumber } from "~core/formatting";

const RECIPE_INFO_DEFINITION: {
	icon: ReactNode;
	render: (r: Recipe) => ReactNode;
	secondary: ReactNode;
}[] = [
	{
		icon: <SpeedRounded />,
		render: (recipe: Recipe) =>
			`${formatNumber(recipe.cycleTimeSecond)} s`,
		secondary: "Cycle time",
	},
	{
		icon: <DataSaverOffRounded />,
		render: (recipe: Recipe) =>
			recipe.speedupOnly ? "No" : "Yes",
		secondary: "Extra products bonus",
	},
	{
		icon: <RemoveRounded />,
		render: (recipe: Recipe) => (
			<Fragment>
				{Object.entries(
					recipe.materialRecord,
				).map(
					([label, ratio]) => `${ratio} ${label}`,
				)}
			</Fragment>
		),
		secondary: "Materials",
	},
	{
		icon: <AddRounded />,
		render: (recipe: Recipe) => (
			<Fragment>
				{Object.entries(recipe.productRecord).map(
					([label, ratio]) => `${ratio} ${label}`,
				)}
			</Fragment>
		),
		secondary: "Products",
	},
];
type RecipeInfoCardProps = {
	recipe: Recipe;
};
export const RecipeInfoCard: FC<
	RecipeInfoCardProps
> = (props) => {
	const { recipe } = props;
	const renderedItems =
		RECIPE_INFO_DEFINITION.map(
			({ icon, secondary, render }, index) => (
				<ListItem key={`item-${index}`}>
					<ListItemIcon>{icon}</ListItemIcon>
					<ListItemText
						primary={render(recipe)}
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
