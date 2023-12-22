import { ChangeEventHandler, FC } from "react";
import {
	MenuItem,
	TextField,
} from "@mui/material";

import { Sorter } from "../../types";
import { SORTER_DATA_LIST } from "../../assets";

type SelectSorterProps = {
	value: Sorter;
	onValueChange: (next_sorter: Sorter) => void;
};
export const SelectSorter: FC<
	SelectSorterProps
> = (props) => {
	const { value, onValueChange } = props;

	const handleChange: ChangeEventHandler<
		HTMLTextAreaElement | HTMLInputElement
	> = (event) => {
		const nextLabel = event.target.value;
		const nextSorter =
			Sorter.fromLabel(nextLabel);

		if (nextSorter === null) {
			return;
		}
		onValueChange(nextSorter);
	};

	return (
		<TextField
			select
			fullWidth
			label="Sorter"
			value={value.label}
			onChange={handleChange}
		>
			{SORTER_DATA_LIST.map(({ label }) => {
				return (
					<MenuItem
						key={label}
						value={label}
					>
						{label}
					</MenuItem>
				);
			})}
		</TextField>
	);
};
