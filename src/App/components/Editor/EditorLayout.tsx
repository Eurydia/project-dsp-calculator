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
		slotTopMiddleLeft: slotTopMiddle,
		slotTopMiddleRight: slotTopRight,
		slotSide,
		slotMain,
	} = props;
	return (
		<Stack
			padding={2}
			spacing={2}
		>
			{slotTopLeft}
			{slotTopMiddle}
			{slotTopRight}
			{slotSide}
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
		slotSide,
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
				md={8}
			>
				{slotMain}
			</Grid>
			<Grid
				item
				md={4}
			>
				{slotSide}
			</Grid>
		</Grid>
	);
};

type EditorLayoutProps = {
	slotSide: ReactNode;
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
		slotSide,
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
				slotSide={slotSide}
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
			slotSide={slotSide}
			slotTopLeft={slotTopLeft}
			slotTopMiddleLeft={slotTopMiddleLeft}
			slotTopMiddleRight={slotTopMiddleRight}
			slotTopRight={slotTopRight}
		/>
	);
};
