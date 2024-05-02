import {
	Box,
	Grid,
	Paper,
	Stack,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { FC, Fragment, ReactNode } from "react";

const LayoutXS: FC<EditorLayoutProps> = (
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
				sx={{
					padding: 2,
				}}
			>
				{slotConfig}
			</Paper>
			{slotResult}
		</Stack>
	);
};

const LayoutSM: FC<EditorLayoutProps> = (
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
					<LayoutXS {...props} />
				</Paper>
			)}
			{!isSmallScreen && (
				<Paper
					square
					elevation={0}
				>
					<LayoutSM {...props} />
				</Paper>
			)}
		</Fragment>
	);
};
