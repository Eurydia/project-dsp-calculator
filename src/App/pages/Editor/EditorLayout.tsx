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
	const {
		slotSide,
		slotMain,
		slotColumnLeft,
		slotColumnRight,
	} = props;
	return (
		<Stack
			padding={2}
			spacing={2}
		>
			<Paper
				square
				elevation={1}
				sx={{ padding: 2 }}
			>
				{slotSide}
			</Paper>
			{slotMain}
			{slotColumnLeft}
			{slotColumnRight}
		</Stack>
	);
};

const EditorLayoutSM: FC<EditorLayoutProps> = (
	props,
) => {
	const {
		slotColumnLeft,
		slotColumnRight,
		slotMain,
		slotSide,
	} = props;

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
					<Grid
						container
						spacing={2}
					>
						<Grid
							item
							md={12}
						>
							{slotMain}
						</Grid>
						<Grid
							item
							md={6}
						>
							<Stack spacing={2}>
								{slotColumnLeft}
							</Stack>
						</Grid>
						<Grid
							item
							md={6}
						>
							<Stack spacing={2}>
								{slotColumnRight}
							</Stack>
						</Grid>
					</Grid>
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
					{slotSide}
				</Paper>
			</Grid>
		</Grid>
	);
};

type EditorLayoutProps = {
	slotColumnLeft: ReactNode;
	slotColumnRight: ReactNode;
	slotSide: ReactNode;
	slotMain: ReactNode;
};
export const EditorLayout: FC<
	EditorLayoutProps
> = (props) => {
	const {
		slotSide,
		slotMain,
		slotColumnLeft,
		slotColumnRight,
	} = props;
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(
		theme.breakpoints.down("md"),
	);
	return (
		<Fragment>
			<Paper
				square
				elevation={0}
				sx={{
					display: isSmallScreen
						? "block"
						: "none",
				}}
			>
				<EditorLayoutXS
					slotColumnLeft={slotColumnLeft}
					slotColumnRight={slotColumnRight}
					slotMain={slotMain}
					slotSide={slotSide}
				/>
			</Paper>
			<Paper
				square
				elevation={0}
				sx={{
					display: isSmallScreen
						? "none"
						: "block",
				}}
			>
				<EditorLayoutSM
					slotColumnLeft={slotColumnLeft}
					slotColumnRight={slotColumnRight}
					slotMain={slotMain}
					slotSide={slotSide}
				/>
			</Paper>
		</Fragment>
	);
};
