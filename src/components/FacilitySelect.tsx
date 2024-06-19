import { Facility } from "@eurydos/dsp-item-registry";
import {
	CircularProgress,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Select,
	SelectChangeEvent,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { toIconURL } from "~assets/icon";
import {
	getFacility,
	getFacilityAll,
} from "~database/get";

type FacilitySelectProps = {
	value: Facility;
	onChange: (value: Facility) => void;
};
export const FacilitySelect: FC<
	FacilitySelectProps
> = (props) => {
	const { onChange, value } = props;
	const [options, setOptions] = useState<
		Facility[] | undefined
	>();

	useEffect(() => {
		(async () => {
			setOptions(await getFacilityAll());
		})();
	}, []);

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

	if (options === undefined) {
		return <CircularProgress />;
	}

	const items = options.map(({ label }) => (
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
	));

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
			{items}
		</Select>
	);
};
