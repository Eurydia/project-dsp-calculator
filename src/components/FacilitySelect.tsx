import { Facility } from "@eurydos/dsp-item-registry";
import {
	ListItemIcon,
	ListItemText,
	MenuItem,
	Select,
	SelectChangeEvent,
} from "@mui/material";
import { FC } from "react";
import { toIconURL } from "~assets/icon";
import { getFacility } from "~database/get";

type FacilitySelectProps = {
	value: Facility;
	onChange: (value: Facility) => void;
	options: Facility[];
};
export const FacilitySelect: FC<
	FacilitySelectProps
> = (props) => {
	const { options, onChange, value } = props;

	const renderOptions = options.map(
		({ label }) => (
			<MenuItem
				key={label}
				value={label}
				disableRipple
			>
				<ListItemIcon>
					<img
						src={toIconURL(label)}
						alt={label}
					/>
				</ListItemIcon>
				<ListItemText>{label}</ListItemText>
			</MenuItem>
		),
	);

	const handleChange = async (
		e: SelectChangeEvent<string>,
	) => {
		const next = await getFacility(
			e.target.value as string,
		);
		if (next === undefined) {
			return;
		}
		onChange(next);
	};

	return (
		<Select
			size="small"
			value={value.label}
			onChange={handleChange}
			SelectDisplayProps={{
				style: {
					display: "flex",
					alignItems: "center",
				},
			}}
		>
			{renderOptions}
		</Select>
	);
};
