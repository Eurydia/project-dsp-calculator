import { FC, ReactNode } from "react";
import {
	Grid,
	Stack,
	useMediaQuery,
	useTheme,
} from "@mui/material";

const EditorLayoutXS: FC<EditorLayoutProps> = (
	props,
) => {
	const {
		slotTopLeft,
		slotTopMiddleLeft,
		slotTopRight,
		slotSideLeft,
		slotMain,
	} = props;
	return (
		<Stack
			padding={2}
			spacing={2}
		>
			{slotTopLeft}
			{slotTopMiddleLeft}
			{slotTopRight}
			{slotTopRight}
			{slotSideLeft}
			{slotMain}
		</Stack>
	);
};

const EditorLayoutSM: FC<EditorLayoutProps> = (
	props,
) => {
	const {
		slotTopLeft,
		slotTopMiddleLeft,
		slotTopRight,
		slotSideLeft,
		slotMain,
	} = props;

	return (
		<Grid
			container
			padding={2}
			spacing={2}
		>
			{[
				slotTopLeft,
				slotTopMiddleLeft,
				slotTopRight,
			].map((slot, index) => (
				<Grid
					key={`slot-position-${index}`}
					item
					md={4}
				>
					{slot}
				</Grid>
			))}
			<Grid
				item
				md={3}
			>
				{slotSideLeft}
			</Grid>
			<Grid
				item
				md={9}
			>
				{slotMain}
			</Grid>
		</Grid>
	);
};

type EditorLayoutProps = {
	slotSideLeft: ReactNode;
	slotMain: ReactNode;
	slotTopLeft: ReactNode;
	slotTopMiddleLeft: ReactNode;
	slotTopRight: ReactNode;
};
export const EditorLayout: FC<
	EditorLayoutProps
> = (props) => {
	const {
		slotTopLeft,
		slotTopMiddleLeft,
		slotTopRight,
		slotSideLeft,
		slotMain,
	} = props;
	const theme = useTheme();
	const isScreenSizeXS = useMediaQuery(
		theme.breakpoints.down("sm"),
	);
	if (isScreenSizeXS) {
		return (
			<EditorLayoutXS
				slotMain={slotMain}
				slotSideLeft={slotSideLeft}
				slotTopLeft={slotTopLeft}
				slotTopMiddleLeft={slotTopMiddleLeft}
				slotTopRight={slotTopRight}
			/>
		);
	}
	return (
		<EditorLayoutSM
			slotMain={slotMain}
			slotSideLeft={slotSideLeft}
			slotTopLeft={slotTopLeft}
			slotTopMiddleLeft={slotTopMiddleLeft}
			slotTopRight={slotTopRight}
		/>
	);
};
