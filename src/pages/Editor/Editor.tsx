import { FC, Fragment, useState } from "react";
import { ConfigForm } from "~components/ConfigForm";
import { PrimaryLayout } from "~layouts/PrimaryLayout";
import {
	ConfigFormData,
	ConfigFormOptions,
} from "~types/query";

export type EditorProps = {
	init: ConfigFormData;
	options: ConfigFormOptions;
};
export const Editor: FC<EditorProps> = (
	props,
) => {
	const { init, options } = props;
	const [q, setQ] = useState(init);

	// const layoutDetails = [
	// 	facilitiesPerArray,
	// 	arraysNeeded,
	// 	facilitiesNeeded,
	// 	facilityLeftover,
	// ];

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
					query={init}
					options={options}
					onChange={setQ}
				/>
			}
		/>
	);
};
