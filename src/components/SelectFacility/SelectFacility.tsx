import { ChangeEventHandler, FC } from "react";
import {
	TextField,
	MenuItem,
} from "@mui/material";

import { Facility } from "../../types";

type SelectFacilityProps = {
	facility: Facility;
	onFacilityChange: (
		nextFacility: Facility,
	) => void;
};
export const SelectFacility: FC<
	SelectFacilityProps
> = (props) => {
	const { facility, onFacilityChange } = props;

	const handleChange: ChangeEventHandler<
		HTMLTextAreaElement | HTMLInputElement
	> = (event): void => {
		const nextLabel = event.target.value;
		const nextFacility: Facility | null =
			Facility.fromLabel(nextLabel);

		if (nextFacility === null) {
			return;
		}
		onFacilityChange(nextFacility);
	};

	return (
		<TextField
			fullWidth
			select
			label="Facility"
			value={facility.label}
			onChange={handleChange}
		>
			{Facility.getRegisteredItems().map(
				(facility) => {
					const { label } = facility;
					return (
						<MenuItem
							key={label}
							value={label}
						>
							{label}
						</MenuItem>
					);
				},
			)}
		</TextField>
	);
};
