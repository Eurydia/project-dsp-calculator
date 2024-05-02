import { RestartAltRounded } from "@mui/icons-material";
import {
	Divider,
	InputAdornment,
	TextField,
} from "@mui/material";
import {
	ChangeEvent,
	FC,
	ReactNode,
} from "react";
import { StyledHorizontalStack } from "./StyledHorizontalStack";
import { TooltipIconButton } from "./TooltipIconButton";

type StyledTextField = {
	prefix?: ReactNode;
	suffix?: ReactNode;
	disabled?: boolean;
	label: string;
	maxLength: number;
	value: string;
	onChange: (value: string) => void;
	onReset: () => void;
};
export const StyledTextField: FC<
	StyledTextField
> = (props) => {
	const {
		disabled,
		maxLength,
		prefix,
		suffix,
		label,
		value,
		onChange,
		onReset,
	} = props;

	const handleValueChange = (
		event: ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement
		>,
	) => {
		const nextValue = event.target.value
			.slice(0, maxLength)
			.normalize();
		onChange(nextValue);
	};

	return (
		<StyledHorizontalStack>
			<TextField
				fullWidth
				disabled={disabled}
				label={label}
				value={value}
				onChange={handleValueChange}
				InputProps={{
					startAdornment: (
						<InputAdornment
							position="start"
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							{prefix}
							<Divider
								flexItem
								orientation="vertical"
							/>
						</InputAdornment>
					),
					endAdornment: (
						<InputAdornment position="end">
							{suffix}
						</InputAdornment>
					),
				}}
			/>
			<TooltipIconButton
				title={`Reset ${label}`}
				label={`Reset ${label}`}
				onClick={() => onReset()}
			>
				<RestartAltRounded />
			</TooltipIconButton>
		</StyledHorizontalStack>
	);
};
