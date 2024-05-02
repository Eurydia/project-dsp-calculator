import { List, Paper } from "@mui/material";
import { FC, ReactNode } from "react";

type StyledInfoCard = {
	subheader: string;
	children: ReactNode;
};
export const StyledInfoCard: FC<
	StyledInfoCard
> = (props) => {
	const { subheader, children } = props;
	return (
		<Paper
			square
			elevation={2}
			sx={{
				padding: 2,
			}}
		>
			<List
				dense
				subheader={subheader}
			>
				{children}
			</List>
		</Paper>
	);
};
