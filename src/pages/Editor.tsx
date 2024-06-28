import { Stack } from "@mui/material";
import { FC } from "react";
import { ComputeForm } from "~components/ComputeForm";
import { ConfigForm } from "~components/ConfigForm";
import { FlowrateTable } from "~components/FlowrateTable";
import { PowerUsageTable } from "~components/PowerUsageTable";
import { computeFlow } from "~core/solver/solverFlow";
import {
	computeIdleUsageMWPerFacility,
	computeWorkUsageMWPerFacility,
} from "~core/solver/solverPowerUsage";
import { useEditorForm } from "~hooks/useEditorForm";
import { PrimaryLayout } from "~layouts/PrimaryLayout";
import { PowerUsageData } from "~types/query";

export const Editor: FC = () => {
	const { data, handlers } = useEditorForm();

	const flowData = computeFlow(data);
	const idleUsageMWPerFacility =
		computeIdleUsageMWPerFacility(data);
	const workUsageMWPerFacility =
		computeWorkUsageMWPerFacility(data);
	const powerUsageData: PowerUsageData = {
		facilitiesNeeded: flowData.facilitiesNeeded,
		facilitiesPerArray:
			flowData.facilitiesPerArray,
		idleUsageMWPerFacility,
		workUsageMWPerFacility,
	};

	return (
		<PrimaryLayout
			slotMain={
				<Stack spacing={2}>
					<ComputeForm
						data={data}
						handlers={handlers}
					/>
					<FlowrateTable data={flowData} />
					<PowerUsageTable
						data={powerUsageData}
					/>
				</Stack>
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
