import { FC, Fragment } from "react";
import { FactoryRounded } from "@mui/icons-material";

import { Facility } from "../../types";
import { FieldNumber } from "../FieldNumber";
import { IconDivider } from "../IconDivider";

type DebugFieldFacilityProps = {
	facility: Facility;
	onFacilityChange: (
		nextFacility: (
			prevFacility: Facility,
		) => Facility,
	) => void;
};
export const DebugFieldFacility: FC<
	DebugFieldFacilityProps
> = (props) => {
	const { facility, onFacilityChange } = props;

	const {
		speedupMultiplier: speed_multiplier,
		workConsumptionMW: work_consumption_MW,
		idleConsumptionMW: idle_consumption_MW,
	} = facility;

	const handleSpeedMultiplierChange = (
		next_value: number,
	) => {
		onFacilityChange((prev) => {
			const next = {
				...prev,
				speed_multiplier: next_value,
			};
			return next;
		});
	};

	const handleWorkConsumptionChange = (
		next_value: number,
	) => {
		onFacilityChange((prev) => {
			const next = {
				...prev,
				work_consumption_MW: next_value,
			};
			return next;
		});
	};

	const handleIdleConsumptionChange = (
		next_value: number,
	) => {
		onFacilityChange((prev) => {
			const next = {
				...prev,
				idle_consumption_MW: next_value,
			};
			return next;
		});
	};

	return (
		<Fragment>
			<IconDivider
				icon={<FactoryRounded color="primary" />}
				label="Manufacturer"
			/>
			<FieldNumber
				label="Facility: Speed multiplier"
				minValue={0}
				maxValue={Number.MAX_SAFE_INTEGER - 1}
				suffix="x"
				value={speed_multiplier}
				onValueChange={
					handleSpeedMultiplierChange
				}
			/>
			<FieldNumber
				label="Facility: Work power consumption"
				minValue={0}
				maxValue={Number.MAX_SAFE_INTEGER - 1}
				suffix="MW"
				value={work_consumption_MW}
				onValueChange={
					handleWorkConsumptionChange
				}
			/>
			<FieldNumber
				label="Facility: Idle power consumption"
				minValue={0}
				maxValue={Number.MAX_SAFE_INTEGER - 1}
				suffix="MW"
				value={idle_consumption_MW}
				onValueChange={
					handleIdleConsumptionChange
				}
			/>
		</Fragment>
	);
};
