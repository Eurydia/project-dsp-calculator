import { FC } from "react";
import { ingredientIconFromLabel } from "~assets/index";
import { FACILITY_OPTIONS } from "~constants/SELECT_OPTIONS";
import { useFacility } from "~hooks/useFacility";
import { StyledSelect } from "./StyledSelect";

type FacilitySelectProps = {
	value: string;
	onChange: (next: string) => void;
};
export const FacilitySelect: FC<
	FacilitySelectProps
> = (props) => {
	const {} = useFacility();

	return (
		<StyledSelect
			sortOptions
			label="Facility"
			value={facilityLabel}
			onValueChange={handleFacilityChange}
			optionToIcon={ingredientIconFromLabel}
			options={FACILITY_OPTIONS}
			disabledOptions={[]}
		/>
	);
};
