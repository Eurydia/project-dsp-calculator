import { FC, ReactElement } from "react";

import {
	IconButton,
	Tooltip,
} from "@mui/material";

type TooltipIconButtonProps = {
	label: string;
	title: string;
	onClick: () => void;
	children: ReactElement;
};
export const TooltipIconButton: FC<
	TooltipIconButtonProps
> = (props) => {
	const { children, label, onClick, title } =
		props;
	return (
		<IconButton
			onClick={onClick}
			aria-label={label}
		>
			<Tooltip
				describeChild
				title={title}
			>
				{children}
			</Tooltip>
		</IconButton>
	);
};
