import { ChangeEventHandler, FC } from "react";
import {
	MenuItem,
	TextField,
} from "@mui/material";

import {
	Proliferator,
	ProliferatorMode,
} from "../types";
import { PROLIFERATOR_DATA_LIST } from "../assets";

type SelectProliferatorProps = {
	speedupOnly: boolean;
	value: Proliferator;
	onValueChange: (
		nextProliferator: Proliferator,
	) => void;
};
export const SelectProliferator: FC<
	SelectProliferatorProps
> = (props) => {
	const { value, speedupOnly, onValueChange } =
		props;

	const handleChangeSelect: ChangeEventHandler<
		HTMLTextAreaElement | HTMLInputElement
	> = (event) => {
		const nextLabel = event.target.value;
		const nextProliferation =
			Proliferator.fromLabel(nextLabel);

		if (nextProliferation === null) {
			return;
		}

		onValueChange(nextProliferation);
	};

	return (
		<TextField
			select
			fullWidth
			label="Proliferator"
			value={value.label}
			onChange={handleChangeSelect}
		>
			{PROLIFERATOR_DATA_LIST.map(
				({ label, mode }) => {
					return (
						<MenuItem
							key={label}
							value={label}
							disabled={
								mode ===
									ProliferatorMode.EXTRA_PRODUCTS &&
								speedupOnly
							}
						>
							{label}
						</MenuItem>
					);
				},
			)}
		</TextField>
	);
};
