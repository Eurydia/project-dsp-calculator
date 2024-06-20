import { FC, Fragment } from "react";
import { ConfigForm } from "~components/ConfigForm";
import { useConfigForm } from "~hooks/useConfigForm";
import { PrimaryLayout } from "~layouts/PrimaryLayout";

export const Editor: FC = () => {
	const { data, handlers } = useConfigForm();

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
				<ConfigForm
					data={data}
					handlers={handlers}
				/>
			}
		/>
	);
};
