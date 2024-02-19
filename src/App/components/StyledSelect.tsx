import { FC } from "react";

import {
	ListItemIcon,
	ListItemText,
	MenuItem,
	TextField,
} from "@mui/material";

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

	const _options = options.filter(
		(option) => !disabledOptions.includes(option),
	);

	const _disabledOptions = disabledOptions;
	if (sortOptions) {
		_options.sort();
		_disabledOptions.sort();
	}

	return (
		<TextField
			select
			fullWidth
			label={label}
			value={value}
			onChange={(event) =>
				onValueChange(event.target.value)
			}
			SelectProps={{
				SelectDisplayProps: {
					style: {
						display: "flex",
						alignItems: "center",
					},
				},
			}}
		>
			{_options.map((option) => (
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
			))}
			{_disabledOptions.map((option) => {
				return (
					<MenuItem
						disabled
						key={option}
						value={option}
					>
						{option}
					</MenuItem>
				);
			})}
		</TextField>
	);
};
