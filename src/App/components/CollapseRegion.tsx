import {
	ExpandLessRounded,
	ExpandMoreRounded,
} from "@mui/icons-material";
import {
	Collapse,
	IconButton,
	Stack,
	Tooltip,
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

	return (
		<Fragment>
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="space-between"
			>
				{title}
				<Tooltip
					describeChild
					title={
						collapsed ? "Expand" : "Collapse"
					}
				>
					<IconButton
						onClick={handleCollapseToggle}
					>
						{collapsed ? (
							<ExpandMoreRounded />
						) : (
							<ExpandLessRounded />
						)}
					</IconButton>
				</Tooltip>
			</Stack>
			<Collapse in={!collapsed}>
				{children}
			</Collapse>
		</Fragment>
	);
};
