import {
	ListItemIcon,
	ListItemText,
	MenuItem,
	TextField,
} from "@mui/material";
import { ChangeEvent, FC } from "react";

const STYLED_SELECT_PROPS = {
	SelectDisplayProps: {
		style: {
			display: "flex",
			alignItems: "center",
		},
	},
};

type StyledSelectProps = {
	sortOptions?: boolean;
	label: string;
	value: string;
	onValueChange: (nextValue: string) => void;
	optionToIcon: (label: string) => string;
	options: string[];
	disabledOptions: string[];
};
export const StyledSelect: FC<
	StyledSelectProps
> = (props) => {
	const {
		sortOptions,
		label,
		value,
		onValueChange,
		optionToIcon,
		options,
		disabledOptions,
	} = props;
	console.debug(options);

	if (options.length === 0) {
		return;
	}

	const _value = options.includes(value)
		? value
		: options[0];

	const _options = options.filter(
		(option) => !disabledOptions.includes(option),
	);

	const _disabledOptions = disabledOptions;
	if (sortOptions) {
		_options.sort();
		_disabledOptions.sort();
	}

	const handleChange = (
		event: ChangeEvent<
			HTMLTextAreaElement | HTMLInputElement
		>,
	) => {
		onValueChange(event.target.value);
	};

	const renderedOptions = _options.map(
		(option) => (
			<MenuItem
				key={option}
				value={option}
			>
				<ListItemIcon>
					<img
						alt={option}
						src={optionToIcon(option)}
					/>
				</ListItemIcon>
				<ListItemText>{option}</ListItemText>
			</MenuItem>
		),
	);

	const renderedDisableOptions =
		_disabledOptions.map((option) => (
			<MenuItem
				disabled
				key={option}
				value={option}
			>
				{option}
			</MenuItem>
		));

	return (
		<TextField
			select
			fullWidth
			label={label}
			value={_value}
			onChange={handleChange}
			SelectProps={STYLED_SELECT_PROPS}
		>
			{renderedOptions}
			{renderedDisableOptions}
		</TextField>
	);
};
