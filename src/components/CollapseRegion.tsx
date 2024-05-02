import {
	ExpandLessRounded,
	ExpandMoreRounded,
} from "@mui/icons-material";
import {
	Collapse,
	IconButton,
	Stack,
	Typography,
} from "@mui/material";
import {
	FC,
	Fragment,
	ReactNode,
	useState,
} from "react";

type CollapseRegionProps = {
	children: ReactNode;
	title: string;
};
export const CollapseRegion: FC<
	CollapseRegionProps
> = (props) => {
	const { title, children } = props;
	const [collapsed, setCollapsed] =
		useState(false);

	const handleCollapseToggle = () => {
		setCollapsed(!collapsed);
	};

	const collapseIcon = collapsed ? (
		<ExpandMoreRounded />
	) : (
		<ExpandLessRounded />
	);

	return (
		<Fragment>
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="space-between"
			>
				<Typography>{title}</Typography>
				<IconButton
					onClick={handleCollapseToggle}
				>
					{collapseIcon}
				</IconButton>
			</Stack>
			<Collapse in={!collapsed}>
				{children}
			</Collapse>
		</Fragment>
	);
};
