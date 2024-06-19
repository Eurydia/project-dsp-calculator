import {
	Facility,
	RecipeType,
} from "@eurydos/dsp-item-registry";
import { FC, Fragment, useState } from "react";
import { FacilitySelect } from "~components/FacilitySelect";
import { PrimaryLayout } from "~layouts/PrimaryLayout";

export const Editor: FC = (props) => {
	const [f, setF] = useState<Facility>({
		connectionCount: 1,
		cycleMultiplier: 1,
		idleConsumptionMW: 1,
		label: "Arc Smelter",
		recipeType: RecipeType.ASSEMBLER,
		workConsumptionMW: 1,
	});
	return (
		<PrimaryLayout
			slotMain={
				<Fragment />
				// <Stack spacing={2}>
				// 	<ComputeForm
				// 		mode={mode}
				// 		constraintRecord={constraintRecord}
				// 		capacityRecord={capacityRecord}
				// 		onModeChange={setMode}
				// 		onCapacityChange={
				// 			handleCapacityRecordChange
				// 		}
				// 		onConstraintChange={
				// 			handleConstraintRecordChange
				// 		}
				// 	/>
				// 	<FlowrateTable
				// 		facilityNeededCount={facilitiesNeeded}
				// 		facilityPerArrayCount={
				// 			facilitiesPerArray
				// 		}
				// 		materialFlowPerMinutePerFacility={
				// 			materialPerMinutePerFacility
				// 		}
				// 		productFlowPerMinutePerFacility={
				// 			productPerMinutePerFacility
				// 		}
				// 	/>
				// 	<PowerTable
				// 		facilityNeededCount={facilitiesNeeded}
				// 		facilityPerArrayCount={
				// 			facilitiesPerArray
				// 		}
				// 		idleConsumptionPerFacility={
				// 			idleConsumptionPerFacility
				// 		}
				// 		workConsumptionPerFacility={
				// 			workConsumptionPerFacility
				// 		}
				// 	/>
				// 	<DualColumnLayout
				// 		columnLeft={
				// 			<Fragment>
				// 				{/* {renderedLayoutInfo} */}
				// 				{/* {renderedRecipeInfo} */}
				// 			</Fragment>
				// 		}
				// 		columnRight={
				// 			<Fragment>
				// 				{/* {renderedFacilityInfo}
				// 		{renderedProlifInfo} */}
				// 			</Fragment>
				// 		}
				// 	/>
				// </Stack>
			}
			slotSide={
				<FacilitySelect
					value={f}
					onChange={setF}
				/>
			}
		/>
	);
};
