import { FC, useMemo } from "react";

import {
	MenuItem,
	TextField,
} from "@mui/material";

type StyledSelectProps = {
	sortOptions?: boolean;
	label: string;
	value: string;
	onValueChange: (nextValue: string) => void;
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
		options,
		disabledOptions,
	} = props;

	const cachedOptions = useMemo(
		() =>
			sortOptions ? options.sort() : options,
		[options, sortOptions],
	);
	const cachedDisabledOptions = useMemo(
		() =>
			sortOptions
				? disabledOptions.sort()
				: disabledOptions,
		[disabledOptions, sortOptions],
	);

	return (
		<TextField
			select
			fullWidth
			label={label}
			value={value}
			onChange={(event) =>
				onValueChange(event.target.value)
			}
		>
			{cachedOptions
				.filter(
					(option) =>
						!cachedDisabledOptions.includes(
							option,
						),
				)
				.map((option) => {
					return (
						<MenuItem
							key={option}
							value={option}
						>
							{option}
						</MenuItem>
					);
				})}
			{cachedDisabledOptions.map((option) => {
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
