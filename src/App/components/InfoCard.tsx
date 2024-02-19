import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Paper,
} from "@mui/material";
import { FC, ReactNode } from "react";

type InfoListProps = {
	subheader: string;
	info: {
		icon: ReactNode;
		primary: ReactNode;
		secondary: ReactNode;
	}[];
};
export const InfoList: FC<InfoListProps> = (
	props,
) => {
	const { subheader, info } = props;
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
				{info.map(
					(
						{ icon, primary, secondary },
						index,
					) => (
						<ListItem
							key={`${subheader}-item-${index}`}
						>
							<ListItemIcon>{icon}</ListItemIcon>
							<ListItemText
								primary={primary}
								secondary={secondary}
							/>
						</ListItem>
					),
				)}
			</List>
		</Paper>
	);
};
