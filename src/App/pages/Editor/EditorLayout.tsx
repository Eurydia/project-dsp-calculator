import { Children, FC, ReactNode } from "react";
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
	const { slotSide, children, slotMain } = props;
	return (
		<Stack
			padding={2}
			spacing={2}
		>
			<Paper sx={{ padding: 2 }}>
				{slotSide}
			</Paper>
			{slotMain}
			{Children.toArray(children).map(
				(item, index) => (
					<Paper
						key={`main-col-item-${index}`}
						sx={{ padding: 2 }}
					>
						{item}
					</Paper>
				),
			)}
		</Stack>
	);
};

const EditorLayoutSM: FC<EditorLayoutProps> = (
	props,
) => {
	const { children, slotMain, slotSide } = props;

	return (
		<Grid container>
			<Grid
				item
				md={8}
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
						{[0, 1].map((colIndex) => (
							<Grid
								key={`main-col-${colIndex}`}
								item
								md={6}
							>
								<Stack spacing={2}>
									{Children.toArray(children)
										.filter(
											(_, index) =>
												index % 2 === colIndex,
										)
										.map((item, index) => (
											<Paper
												key={`main-col-${colIndex}-item-${index}`}
												square
												sx={{ padding: 2 }}
											>
												{item}
											</Paper>
										))}
								</Stack>
							</Grid>
						))}
					</Grid>
				</Box>
			</Grid>
			<Grid
				item
				md={4}
			>
				<Paper
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
	children: ReactNode;
	slotSide: ReactNode;
	slotMain: ReactNode;
};
export const EditorLayout: FC<
	EditorLayoutProps
> = (props) => {
	const { slotSide, slotMain, children } = props;
	const theme = useTheme();
	const isScreenSizeXS = useMediaQuery(
		theme.breakpoints.down("sm"),
	);
	if (isScreenSizeXS) {
		return (
			<EditorLayoutXS
				children={children}
				slotMain={slotMain}
				slotSide={slotSide}
			/>
		);
	}
	return (
		<EditorLayoutSM
			children={children}
			slotMain={slotMain}
			slotSide={slotSide}
		/>
	);
};
