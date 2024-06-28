import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { FC } from "react";
import { PaddedPaper } from "~components/PaddedPaper";
import { StyledTableHeadCell } from "~components/StyledTableHeadCell";
import { formatNumber } from "~core/formatting";
import { PowerUsageData } from "~types/query";

const StyledTableHead: FC = () => {
	return (
		<TableRow>
			<StyledTableHeadCell
				colSpan={3}
				children="Power consumption (MW)"
			/>
			<StyledTableHeadCell
				colSpan={1}
				align="right"
				children="Total"
			/>
			<StyledTableHeadCell
				colSpan={1}
				align="right"
				children="Per array"
			/>
			<StyledTableHeadCell
				colSpan={1}
				align="right"
				children="Per facility"
			/>
		</TableRow>
	);
};

type PowerUsageTableProps = {
	data: PowerUsageData;
};
export const PowerUsageTable: FC<
	PowerUsageTableProps
> = (props) => {
	const {
		data: {
			facilitiesNeeded: facilityNeededCount,
			facilitiesPerArray: facilityPerArrayCount,
			workUsageMWPerFacility:
				workConsumptionPerFacility,
			idleUsageMWPerFacility:
				idleConsumptionPerFacility,
		},
	} = props;

	const workUsageItems = [
		-workConsumptionPerFacility *
			facilityNeededCount,
		-workConsumptionPerFacility *
			facilityPerArrayCount,
		-workConsumptionPerFacility,
	].map((value, index) => (
		<TableCell
			key={`supply-${index}`}
			colSpan={1}
			align="right"
			children={formatNumber(value)}
		/>
	));

	const idleUsageItems = [
		-idleConsumptionPerFacility *
			facilityNeededCount,
		-idleConsumptionPerFacility *
			facilityPerArrayCount,
		-idleConsumptionPerFacility,
	].map((value, index) => (
		<TableCell
			key={`power-${index}`}
			colSpan={1}
			align="right"
			children={formatNumber(value)}
		/>
	));

	return (
		<PaddedPaper
			square
			elevation={2}
		>
			<TableContainer>
				<Table>
					<TableHead>
						<StyledTableHead />
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell
								colSpan={3}
								children="Work"
							/>
							{workUsageItems}
						</TableRow>
						<TableRow>
							<TableCell
								colSpan={3}
								children="Idle"
							/>
							{idleUsageItems}
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</PaddedPaper>
	);
};
