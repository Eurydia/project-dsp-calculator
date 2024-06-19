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

type CollapsibleProps = {
	children: ReactNode;
	title: string;
};
export const Collapsible: FC<CollapsibleProps> = (
	props,
) => {
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
				<Typography
					fontWeight="500"
					fontSize="large"
					color="secondary.main"
				>
					{title}
				</Typography>
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
