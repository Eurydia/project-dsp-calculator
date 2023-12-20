import { ChangeEventHandler, FC } from "react";
import {
	MenuItem,
	TextField,
} from "@mui/material";

import { AssetProliferators } from "../../assets";

import {
	Proliferator,
	ProliferatorMode,
} from "../../types";

type SelectProliferatorProps = {
	disableExtraProducts: boolean;
	proliferator: Proliferator;
	onProliferatorChange: (
		nextProliferator: Proliferator,
	) => void;
};
export const SelectProliferator: FC<
	SelectProliferatorProps
> = (props) => {
	const {
		proliferator,
		disableExtraProducts,
		onProliferatorChange,
	} = props;

	const handleChangeSelect: ChangeEventHandler<
		HTMLTextAreaElement | HTMLInputElement
	> = (event) => {
		const nextLabel = event.target.value;
		const nextProliferation =
			Proliferator.fromLabel(nextLabel);

		if (nextProliferation === null) {
			return;
		}

		onProliferatorChange(nextProliferation);
	};

	return (
		<TextField
			select
			fullWidth
			label="Proliferator"
			value={proliferator.label}
			onChange={handleChangeSelect}
		>
			{AssetProliferators.map((proliferator) => {
				const { label } = proliferator;
				return (
					<MenuItem
						key={label}
						value={label}
						disabled={
							proliferator.mode ===
								ProliferatorMode.EXTRA_PRODUCTS &&
							disableExtraProducts
						}
					>
						{label}
					</MenuItem>
				);
			})}
		</TextField>
	);
};
