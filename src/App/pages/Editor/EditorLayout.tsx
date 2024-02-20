import { FC, Fragment, ReactNode } from "react";
import {
	Box,
	Grid,
	Paper,
	Stack,
	useMediaQuery,
	useTheme,
} from "@mui/material";

const EditorLayoutXS: FC<EditorLayoutProps> = (
	props,
) => {
	const { slotConfig, slotResult } = props;
	return (
		<Stack
			padding={2}
			spacing={2}
		>
			<Paper
				square
				elevation={1}
			>
				{slotConfig}
			</Paper>
			{slotResult}
		</Stack>
	);
};

const EditorLayoutSM: FC<EditorLayoutProps> = (
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
			>
				<Box
					padding={4}
					sx={{
						height: "100vh",
						overflowY: "auto",
						scrollbarWidth: "thin",
					}}
				>
					{slotResult}
				</Box>
			</Grid>
			<Grid
				item
				md={3}
			>
				<Paper
					square
					elevation={1}
					sx={{
						height: "100vh",
						overflowY: "auto",
						scrollbarWidth: "thin",
						padding: 2,
					}}
				>
					{slotConfig}
				</Paper>
			</Grid>
		</Grid>
	);
};

type EditorLayoutProps = {
	slotConfig: ReactNode;
	slotResult: ReactNode;
};
export const EditorLayout: FC<
	EditorLayoutProps
> = (props) => {
	const { slotConfig, slotResult } = props;
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(
		theme.breakpoints.down("md"),
	);
	return (
		<Fragment>
			{isSmallScreen && (
				<Paper
					square
					elevation={0}
				>
					<EditorLayoutXS
						slotResult={slotResult}
						slotConfig={slotConfig}
					/>
				</Paper>
			)}
			{!isSmallScreen && (
				<Paper
					square
					elevation={0}
				>
					<EditorLayoutSM
						slotResult={slotResult}
						slotConfig={slotConfig}
					/>
				</Paper>
			)}
		</Fragment>
	);
};
