import { FC, Fragment, useMemo } from "react";

import {
	ListItemIcon,
	ListItemText,
	MenuItem,
	TextField,
} from "@mui/material";
import { ingredientIconFromLabel } from "assets/ingredient.mts";

type StyledSelectProps = {
	showIcon?: boolean;
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
		showIcon,
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
			SelectProps={{
				SelectDisplayProps: {
					style: {
						display: "flex",
					},
				},
			}}
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
							{!showIcon ? (
								<Fragment />
							) : (
								<ListItemIcon>
									<img
										width="auto"
										height="40px"
										src={ingredientIconFromLabel(
											option,
										)}
									/>
								</ListItemIcon>
							)}
							<ListItemText>
								{option}
							</ListItemText>
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
