import { FC } from "react";
import {
	Divider,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";

type TextDividerProps = {
	label: string;
};
export const TextDivider: FC<TextDividerProps> = (
	props,
) => {
	const { label } = props;

	const { palette } = useTheme();

	return (
		<Divider flexItem>
			<Stack
				spacing={0.5}
				direction="column"
				alignItems="center"
			>
				<Typography
					fontSize="small"
					color={palette.text.secondary}
				>
					{label}
				</Typography>
			</Stack>
		</Divider>
	);
};
