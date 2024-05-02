import { FactoryRounded } from "@mui/icons-material";
import {
	Box,
	Grid,
	ListItem,
	ListItemIcon,
	ListItemText,
	Stack,
} from "@mui/material";
import { FC } from "react";
import { facilityFromLabel } from "~assets/facility";
import { proliferatorFromLabel } from "~assets/proliferator";
import { recipeFromLabel } from "~assets/recipe";
import { StyledInfoCard } from "~components/StyledInfoCard";
import { FacilityInfoCard } from "./InfoCards/FacilityInfoCard";
import { ProlifInfo } from "./InfoCards/ProlifInfoCard";
import { RecipeInfoCard } from "./InfoCards/RecipeInfoCard";

type EditorInfoCardProps = {
	facilityNeededCount: number;
	arrayNeededCount: number;
	facilityPerArrayCount: number;
	facilityLeftoverCount: number;

	facilityLabel: string;
	recipeLabel: string;
	prolifLabel: string;
	prolifSpray: string;
};
export const EditorInfoCards: FC<
	EditorInfoCardProps
> = (props) => {
	const {
		facilityNeededCount,
		arrayNeededCount,
		facilityPerArrayCount,
		facilityLeftoverCount,
		facilityLabel,
		recipeLabel,
		prolifLabel,
		prolifSpray,
	} = props;

	const facility = facilityFromLabel(
		facilityLabel,
	);
	const recipe = recipeFromLabel(recipeLabel);
	const prolif =
		proliferatorFromLabel(prolifLabel);

	const layoutInfo = [
		{
			icon: <FactoryRounded />,
			primary: facilityPerArrayCount,
			secondary: "Facilities per array",
		},
		{
			icon: <FactoryRounded />,
			primary: arrayNeededCount,
			secondary: "Arrays needed",
		},
		{
			icon: <FactoryRounded />,
			primary: facilityNeededCount,
			secondary: "Total facilities needed",
		},
		{
			icon: <FactoryRounded />,
			primary: facilityLeftoverCount,
			secondary: "Leftover facilities",
		},
	];

	const layoutItems = layoutInfo.map(
		({ icon, primary, secondary }, index) => (
			<ListItem key={`item-${index}`}>
				<ListItemIcon>{icon}</ListItemIcon>
				<ListItemText
					primary={primary}
					secondary={secondary}
				/>
			</ListItem>
		),
	);

	return (
		<Box>
			<Grid
				container
				spacing={2}
			>
				<Grid
					item
					md={6}
				>
					<Stack spacing={2}>
						<StyledInfoCard subheader="Layout">
							{layoutItems}
						</StyledInfoCard>
						<RecipeInfoCard recipe={recipe} />
					</Stack>
				</Grid>
				<Grid
					item
					md={6}
				>
					<Stack spacing={2}>
						<FacilityInfoCard
							facility={facility}
						/>
						<ProlifInfo
							prolif={prolif}
							prolifSpray={prolifSpray}
						/>
					</Stack>
				</Grid>
			</Grid>
		</Box>
	);
};
