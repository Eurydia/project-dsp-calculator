import { FC } from "react";
import { ComputeForm } from "~components/ComputeForm";
import { ConfigForm } from "~components/ConfigForm";
import { useComputeForm } from "~hooks/useComputeForm";
import { useConfigForm } from "~hooks/useConfigForm";
import { PrimaryLayout } from "~layouts/PrimaryLayout";

export const Editor: FC = () => {
	const { data: configFormData, handlers } =
		useConfigForm();
	const {
		data: computeFormData,
		handlers: computeFormHandlers,
	} = useComputeForm();

	return (
		<PrimaryLayout
			slotMain={
				<ComputeForm
					data={computeFormData}
					handlers={computeFormHandlers}
				/>
				// <Stack spacing={2}>
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
					data={configFormData}
					handlers={handlers}
				/>
			}
		/>
	);
};
