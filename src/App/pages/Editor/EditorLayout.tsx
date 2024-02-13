import {
	Children,
	FC,
	Fragment,
	ReactNode,
} from "react";
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
			<Paper
				square
				elevation={1}
				sx={{ padding: 2 }}
			>
				{slotSide}
			</Paper>
			{slotMain}
			{Children.toArray(children).map(
				(item, index) => (
					<Paper
						square
						elevation={2}
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
						{[0, 1].map((colIndex) => (
							<Grid
								key={`col-${colIndex}`}
								item
								md={6}
							>
								<Stack spacing={2}>
									{Children.toArray(children)
										.filter(
											(_, index) =>
												index % 2 === colIndex,
										)
										.map((child, index) => (
											<Paper
												key={`main-col-${colIndex}-item-${index}`}
												square
												elevation={2}
												sx={{
													padding: 2,
												}}
											>
												{child}
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
	children: ReactNode;
	slotSide: ReactNode;
	slotMain: ReactNode;
};
export const EditorLayout: FC<
	EditorLayoutProps
> = (props) => {
	const { slotSide, slotMain, children } = props;
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
					children={children}
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
					children={children}
					slotMain={slotMain}
					slotSide={slotSide}
				/>
			</Paper>
		</Fragment>
	);
};
