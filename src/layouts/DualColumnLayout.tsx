import { Box, Grid } from "@mui/material";
import { FC, ReactNode } from "react";

type DualColumnLayoutProps = {
	columnLeft: ReactNode;
	columnRight: ReactNode;
};
export const DualColumnLayout: FC<
	DualColumnLayoutProps
> = (props) => {
	const { columnLeft, columnRight } = props;
	return (
		<Box>
			<Grid
				container
				spacing={2}
			>
				<Grid
					item
					xs={12}
					md={6}
					display="flex"
					flexDirection="column"
					gap={2}
				>
					{columnLeft}
				</Grid>
				<Grid
					item
					xs={12}
					md={6}
					display="flex"
					flexDirection="column"
					gap={2}
				>
					{columnRight}
				</Grid>
			</Grid>
		</Box>
	);
};
