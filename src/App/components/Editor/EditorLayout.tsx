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
		slotTopMiddleRight,
		slotSideRight,
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
			{slotTopMiddleRight}
			{slotTopMiddleRight}
			{slotSideLeft}
			{slotSideRight}
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
		slotTopMiddleRight,
		slotTopRight,
		slotSideRight,
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
				slotTopMiddleRight,
				slotTopRight,
			].map((slot, index) => (
				<Grid
					key={`slot-position-${index}`}
					item
					md={3}
				>
					{slot}
				</Grid>
			))}
			<Grid
				item
				md={7}
			>
				{slotSideLeft}
			</Grid>
			<Grid
				item
				md={5}
			>
				{slotSideRight}
			</Grid>
			<Grid
				item
				md={12}
			>
				{slotMain}
			</Grid>
		</Grid>
	);
};

type EditorLayoutProps = {
	slotSideRight: ReactNode;
	slotSideLeft: ReactNode;
	slotMain: ReactNode;
	slotTopLeft: ReactNode;
	slotTopMiddleLeft: ReactNode;
	slotTopMiddleRight: ReactNode;
	slotTopRight: ReactNode;
};
export const EditorLayout: FC<
	EditorLayoutProps
> = (props) => {
	const {
		slotTopLeft,
		slotTopMiddleLeft,
		slotTopMiddleRight,
		slotTopRight,
		slotSideRight,
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
				slotSideRight={slotSideRight}
				slotSideLeft={slotSideLeft}
				slotTopLeft={slotTopLeft}
				slotTopMiddleLeft={slotTopMiddleLeft}
				slotTopMiddleRight={slotTopMiddleRight}
				slotTopRight={slotTopRight}
			/>
		);
	}
	return (
		<EditorLayoutSM
			slotMain={slotMain}
			slotSideRight={slotSideRight}
			slotSideLeft={slotSideLeft}
			slotTopLeft={slotTopLeft}
			slotTopMiddleLeft={slotTopMiddleLeft}
			slotTopMiddleRight={slotTopMiddleRight}
			slotTopRight={slotTopRight}
		/>
	);
};
