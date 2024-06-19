import {
	Grid,
	Paper,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { FC, ReactNode } from "react";
import { PaddedPaper } from "~components/PaddedPaper";

type PrimaryLayoutProps = {
	slotSide: ReactNode;
	slotMain: ReactNode;
};
export const PrimaryLayout: FC<
	PrimaryLayoutProps
> = (props) => {
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(
		theme.breakpoints.down("md"),
	);
	const { slotMain, slotSide } = props;

	if (isSmallScreen) {
		return (
			<PaddedPaper elevation={0}>
				<PaddedPaper elevation={2}>
					{slotSide}
				</PaddedPaper>
				{slotMain}
			</PaddedPaper>
		);
	}
	return (
		<Paper elevation={0}>
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
					{slotMain}
				</Grid>
				<Grid
					item
					md={3}
					height="100vh"
					overflow="auto"
				>
					<PaddedPaper elevation={2}>
						{slotSide}
					</PaddedPaper>
				</Grid>
			</Grid>
		</Paper>
	);
};
