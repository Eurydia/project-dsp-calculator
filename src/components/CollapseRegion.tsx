import {
	ExpandLessRounded,
	ExpandMoreRounded,
} from "@mui/icons-material";
import {
	Collapse,
	IconButton,
	Stack,
} from "@mui/material";
import {
	FC,
	Fragment,
	ReactNode,
	useState,
} from "react";

type CollapseRegionProps = {
	children: ReactNode;
	title: ReactNode;
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

	const expandIcon = collapsed ? (
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
				{title}
				<IconButton
					disableRipple
					size="small"
					color="primary"
					onClick={handleCollapseToggle}
				>
					{expandIcon}
				</IconButton>
			</Stack>
			<Collapse in={!collapsed}>
				<Stack spacing={2}>{children}</Stack>
			</Collapse>
		</Fragment>
	);
};
