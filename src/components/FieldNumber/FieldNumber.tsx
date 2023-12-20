import {
	ChangeEvent,
	FC,
	ReactNode,
	useState,
} from "react";
import {
	InputAdornment,
	TextField,
} from "@mui/material";

import { clamp } from "./helper";

type FieldNumberProps = {
	prefix?: ReactNode;
	suffix?: ReactNode;
	label: string;

	minValue: number;
	maxValue: number;
	value: number;
	onValueChange: (next_value: number) => void;
};
export const FieldNumber: FC<FieldNumberProps> = (
	props,
) => {
	const {
		minValue,
		maxValue,
		prefix,
		suffix,
		label,
		value,
		onValueChange,
	} = props;

	const [fieldContent, setFieldContent] =
		useState<string>(value.toString());

	const handleValueChange = (
		event: ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement
		>,
	) => {
		const newFieldContent: string =
			event.target.value.slice(0, 16);

		setFieldContent(newFieldContent);

		if (newFieldContent === "") {
			onValueChange(minValue);
			setFieldContent("");
			return;
		}

		const valueParsed: number = Number.parseInt(
			newFieldContent,
		);
		const valueClamped: number = clamp(
			valueParsed,
			minValue,
			maxValue,
		);

		if (valueClamped < valueParsed) {
			setFieldContent(maxValue.toString());
		}
		onValueChange(valueClamped);
	};

	return (
		<TextField
			fullWidth
			label={label}
			value={fieldContent}
			onChange={handleValueChange}
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						{prefix}
					</InputAdornment>
				),
				endAdornment: (
					<InputAdornment position="end">
						{suffix}
					</InputAdornment>
				),
			}}
		/>
	);
};
