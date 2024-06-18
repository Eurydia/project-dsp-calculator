import { Facility } from "@eurydos/dsp-item-registry";
import { CircularProgress } from "@mui/material";
import { getFacility } from "database/get";
import { FC, useEffect } from "react";
import { toIconURL } from "~assets/index";
import { useFacility } from "~hooks/useFacility";
import { useFacilityOptions } from "~hooks/useFacilityOptions";
import { StyledSelect } from "./StyledSelect";

type FacilitySelectProps = {
	storeKey: string;
	onChange: (next: Facility) => void;
};
export const FacilitySelect: FC<
	FacilitySelectProps
> = (props) => {
	const { storeKey, onChange } = props;
	const [item, setItem] = useFacility(storeKey);
	const options = useFacilityOptions();

	useEffect(() => {
		(async () => {
			const next = await getFacility(item);
			if (next === undefined) {
				return;
			}
			onChange(next);
		})();
	}, [item]);

	if (options === undefined) {
		return <CircularProgress />;
	}
	return (
		<StyledSelect
			label="Facility"
			value={item}
			onChange={setItem}
			optionToIcon={toIconURL}
			options={options}
			disabledOptions={[]}
		/>
	);
};
