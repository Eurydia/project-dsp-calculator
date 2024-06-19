import { TextField } from "@mui/material";
import { FC } from "react";
import {
	Form,
	useLoaderData,
} from "react-router-dom";
import { LoaderData } from "./loader";

export const Editor: FC = (props) => {
	const loaderData =
		useLoaderData() as LoaderData;

	return (
		<Form replace>
			<TextField name="ji" />
		</Form>
		// <PrimaryLayout
		// 	slotMain={
		// 		<Fragment />
		// 		// <Stack spacing={2}>
		// 		// 	<ComputeForm
		// 		// 		mode={mode}
		// 		// 		constraintRecord={constraintRecord}
		// 		// 		capacityRecord={capacityRecord}
		// 		// 		onModeChange={setMode}
		// 		// 		onCapacityChange={
		// 		// 			handleCapacityRecordChange
		// 		// 		}
		// 		// 		onConstraintChange={
		// 		// 			handleConstraintRecordChange
		// 		// 		}
		// 		// 	/>
		// 		// 	<FlowrateTable
		// 		// 		facilityNeededCount={facilitiesNeeded}
		// 		// 		facilityPerArrayCount={
		// 		// 			facilitiesPerArray
		// 		// 		}
		// 		// 		materialFlowPerMinutePerFacility={
		// 		// 			materialPerMinutePerFacility
		// 		// 		}
		// 		// 		productFlowPerMinutePerFacility={
		// 		// 			productPerMinutePerFacility
		// 		// 		}
		// 		// 	/>
		// 		// 	<PowerTable
		// 		// 		facilityNeededCount={facilitiesNeeded}
		// 		// 		facilityPerArrayCount={
		// 		// 			facilitiesPerArray
		// 		// 		}
		// 		// 		idleConsumptionPerFacility={
		// 		// 			idleConsumptionPerFacility
		// 		// 		}
		// 		// 		workConsumptionPerFacility={
		// 		// 			workConsumptionPerFacility
		// 		// 		}
		// 		// 	/>
		// 		// 	<DualColumnLayout
		// 		// 		columnLeft={
		// 		// 			<Fragment>
		// 		// 				{/* {renderedLayoutInfo} */}
		// 		// 				{/* {renderedRecipeInfo} */}
		// 		// 			</Fragment>
		// 		// 		}
		// 		// 		columnRight={
		// 		// 			<Fragment>
		// 		// 				{/* {renderedFacilityInfo}
		// 		// 		{renderedProlifInfo} */}
		// 		// 			</Fragment>
		// 		// 		}
		// 		// 	/>
		// 		// </Stack>
		// 	}
		// 	slotSide={<ConfigForm />}
		// />
	);
};
