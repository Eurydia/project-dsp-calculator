import { Stack, StackProps } from "@mui/material";
import { FC } from "react";

export const StyledHorizontalStack: FC<
	StackProps
> = (props) => {
	const { children, ...rest } = props;
	return (
		<Stack
			spacing={2}
			direction="row"
			alignItems="center"
			justifyContent="left"
			{...rest}
		>
			{children}
		</Stack>
	);
};
