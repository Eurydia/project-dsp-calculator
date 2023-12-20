import { ChangeEventHandler, FC } from "react";
import {
	MenuItem,
	TextField,
} from "@mui/material";

import { AssetSorters } from "../../assets";
import { Sorter } from "../../types";

type SelectSorterProps = {
	sorter: Sorter;
	onSorterChange: (next_sorter: Sorter) => void;
};
export const SelectSorter: FC<
	SelectSorterProps
> = (props) => {
	const { sorter, onSorterChange } = props;

	const handleChange: ChangeEventHandler<
		HTMLTextAreaElement | HTMLInputElement
	> = (event) => {
		const nextLabel = event.target.value;
		const nextSorter =
			Sorter.fromLabel(nextLabel);

		if (nextSorter === null) {
			return;
		}
		onSorterChange(nextSorter);
	};

	return (
		<TextField
			select
			fullWidth
			label="Sorter"
			value={sorter.label}
			onChange={handleChange}
		>
			{AssetSorters.map((sorter) => {
				const { label } = sorter;
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
