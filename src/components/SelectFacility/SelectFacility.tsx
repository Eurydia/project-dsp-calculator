import { ChangeEventHandler, FC } from "react";
import {
	TextField,
	MenuItem,
} from "@mui/material";

import { Facility } from "../../types";
import { FACILITY_DATA_LIST } from "../../assets";

type SelectFacilityProps = {
	value: Facility;
	onValueChange: (nextFacility: Facility) => void;
};
export const SelectFacility: FC<
	SelectFacilityProps
> = (props) => {
	const { value, onValueChange } = props;

	const handleChange: ChangeEventHandler<
		HTMLTextAreaElement | HTMLInputElement
	> = (event): void => {
		const nextLabel = event.target.value;
		const nextFacility: Facility | null =
			Facility.fromLabel(nextLabel);

		if (nextFacility === null) {
			return;
		}
		onValueChange(nextFacility);
	};

	return (
		<TextField
			fullWidth
			select
			label="Facility"
			value={value.label}
			onChange={handleChange}
		>
			{FACILITY_DATA_LIST.map(({ label }) => {
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
