import {
	Grid,
	Paper,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { FC, Fragment, ReactNode } from "react";
import { PaddedPaper } from "~components/PaddedPaper";

const LayoutXS: FC<PrimaryLayoutProps> = (
	props,
) => {
	const { slotConfig, slotResult } = props;
	return (
		<Fragment>
			<PaddedPaper elevation={2}>
				{slotConfig}
			</PaddedPaper>
			{slotResult}
		</Fragment>
	);
};

const LayoutSM: FC<PrimaryLayoutProps> = (
	props,
) => {
	const { slotResult, slotConfig } = props;

	return (
		<Grid
			container
			columns={10}
		>
			<Grid
				item
				md
				padding={4}
				height="100vh"
				overflow="auto"
			>
				{slotResult}
			</Grid>
			<Grid
				item
				md={3}
				height="100vh"
				overflow="auto"
			>
				<PaddedPaper elevation={2}>
					{slotConfig}
				</PaddedPaper>
			</Grid>
		</Grid>
	);
};

type PrimaryLayoutProps = {
	slotConfig: ReactNode;
	slotResult: ReactNode;
};
export const PrimaryLayout: FC<
	PrimaryLayoutProps
> = (props) => {
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(
		theme.breakpoints.down("md"),
	);

	if (isSmallScreen) {
		return (
			<PaddedPaper
				elevation={0}
				children={<LayoutXS {...props} />}
			/>
		);
	}
	return (
		<Paper
			elevation={0}
			children={<LayoutSM {...props} />}
		/>
	);
};
