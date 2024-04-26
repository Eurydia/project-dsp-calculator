import {
	AbcRounded,
	AddRounded,
	Battery80Sharp,
	BoltRounded,
	CategoryRounded,
	DataSaverOffRounded,
	FactoryRounded,
	RemoveRounded,
	SpeedRounded,
	UsbRounded,
} from "@mui/icons-material";
import {
	Box,
	Grid,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { FC, Fragment } from "react";
import { facilityFromLabel } from "~assets/facility";
import { proliferatorFromLabel } from "~assets/proliferator";
import { recipeFromLabel } from "~assets/recipe";
import { formatNumber } from "~core/formatLocaleNumber";
import { InfoList } from "./InfoCard";

type EditorResultAuxProps = {
	facilityNeededCount: number;
	arrayNeededCount: number;
	facilityPerArrayCount: number;
	facilityLeftoverCount: number;

	facilityLabel: string;
	recipeLabel: string;
	prolifLabel: string;
	prolifSpray: string;
};
export const EditorResultAux: FC<
	EditorResultAuxProps
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

	const theme = useTheme();
	const isSmallScreen = useMediaQuery(
		theme.breakpoints.down("md"),
	);

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

	const facilityInfo = [
		{
			icon: <AbcRounded />,
			primary: facility.label,
			secondary: "Name",
		},
		{
			icon: <CategoryRounded />,
			primary: facility.recipeType,
			secondary: "Category",
		},
		{
			icon: <SpeedRounded />,
			primary: `${formatNumber(
				facility.cycleMultiplier * 100,
			)}%`,
			secondary: "Cycle speed",
		},
		{
			icon: <UsbRounded />,
			primary: facility.connectionCount,
			secondary: "Sorter connections",
		},
		{
			icon: <BoltRounded />,
			primary: `${formatNumber(
				facility.workConsumptionMW,
			)} MW`,
			secondary: "Work comsumption",
		},
		{
			icon: <BoltRounded />,
			primary: `${formatNumber(
				facility.idleConsumptionMW,
			)} MW`,
			secondary: "Idle comsumption",
		},
	];

	const recipeInfo = [
		{
			icon: <SpeedRounded />,
			primary: `${formatNumber(
				recipe.cycleTimeSecond,
			)} s`,
			secondary: "Cycle time",
		},
		{
			icon: <DataSaverOffRounded />,
			primary: recipe.speedupOnly ? "No" : "Yes",
			secondary: "Extra products bonus",
		},
		{
			icon: <RemoveRounded />,
			primary: Object.entries(
				recipe.materialRecord,
			).map(([label, ratio]) => (
				<Typography
					key={label}
					fontSize="inherit"
				>
					{`${ratio} ${label}`}
				</Typography>
			)),
			secondary: "Materials",
		},
		{
			icon: <AddRounded />,
			primary: Object.entries(
				recipe.productRecord,
			).map(([label, ratio]) => (
				<Typography
					key={label}
					fontSize="inherit"
				>
					{`${ratio} ${label}`}
				</Typography>
			)),
			secondary: "Products",
		},
	];

	const prolifInfo = [
		{
			icon: <SpeedRounded />,
			primary: `${formatNumber(
				(prolif.cycleMultiplier - 1) * 100,
			)}%`,
			secondary: "Bonus cycle speed",
		},
		{
			icon: <SpeedRounded />,
			primary: `${formatNumber(
				(prolif.productMultiplier - 1) * 100,
			)}%`,
			secondary: "Bonus products per cycle",
		},
		{
			icon: <BoltRounded />,
			primary: `${formatNumber(
				(prolif.workConsumptionMultiplier - 1) *
					100,
			)}%`,
			secondary: "Additional work consumption",
		},
		{
			icon: <Battery80Sharp />,
			primary: formatNumber(
				prolifSpray === ""
					? 0
					: Number.parseInt(prolifSpray),
			),
			secondary: "Sprays",
		},
	];

	return (
		<Fragment>
			{isSmallScreen && (
				<Fragment>
					<InfoList
						subheader="Layout"
						info={layoutInfo}
					/>
					<InfoList
						subheader="Facility infomation"
						info={facilityInfo}
					/>
					<InfoList
						subheader="Recipe information"
						info={recipeInfo}
					/>
					<InfoList
						subheader="Proliferator effects"
						info={prolifInfo}
					/>
				</Fragment>
			)}
			{!isSmallScreen && (
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
								<InfoList
									subheader="Layout"
									info={layoutInfo}
								/>
								<InfoList
									subheader="Recipe information"
									info={recipeInfo}
								/>
							</Stack>
						</Grid>
						<Grid
							item
							md={6}
						>
							<Stack spacing={2}>
								<InfoList
									subheader="Facility infomation"
									info={facilityInfo}
								/>
								<InfoList
									subheader="Proliferator effects"
									info={prolifInfo}
								/>
							</Stack>
						</Grid>
					</Grid>
				</Box>
			)}
		</Fragment>
	);
};
