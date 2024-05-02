import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { FC } from "react";
import { formatNumber } from "~core/formatting";

const StyledTableHead: FC = () => {
	return (
		<TableHead>
			<TableRow>
				<TableCell colSpan={3}>
					Power consumption (MW)
				</TableCell>
				<TableCell
					colSpan={1}
					align="right"
				>
					Total
				</TableCell>
				<TableCell
					colSpan={1}
					align="right"
				>
					Per array
				</TableCell>
				<TableCell
					colSpan={1}
					align="right"
				>
					Per facility
				</TableCell>
			</TableRow>
		</TableHead>
	);
};

type PowerTableProps = {
	facilityNeededCount: number;
	facilityPerArrayCount: number;
	workConsumptionPerFacility: number;
	idleConsumptionPerFacility: number;
};
export const PowerTable: FC<PowerTableProps> = (
	props,
) => {
	const {
		facilityNeededCount,
		facilityPerArrayCount,
		workConsumptionPerFacility,
		idleConsumptionPerFacility,
	} = props;

	const computedWorkConsumption = [
		workConsumptionPerFacility *
			facilityNeededCount,
		workConsumptionPerFacility *
			facilityPerArrayCount,
		workConsumptionPerFacility,
	];
	const renderedWorkConsumption =
		computedWorkConsumption.map(
			(value, index) => (
				<TableCell
					key={`supply-${index}`}
					colSpan={1}
					align="right"
				>
					{formatNumber(value)}
				</TableCell>
			),
		);

	const computedIdleConsumption = [
		idleConsumptionPerFacility *
			facilityNeededCount,
		idleConsumptionPerFacility *
			facilityPerArrayCount,
		idleConsumptionPerFacility,
	];
	const renderedIdleConsumption =
		computedIdleConsumption.map(
			(value, index) => (
				<TableCell
					key={`power-${index}`}
					colSpan={1}
					align="right"
				>
					{formatNumber(value)}
				</TableCell>
			),
		);

	return (
		<Paper
			square
			elevation={2}
			sx={{
				padding: 2,
			}}
		>
			<TableContainer>
				<Table>
					<StyledTableHead />
					<TableBody>
						<TableRow>
							<TableCell colSpan={3}>
								Work
							</TableCell>
							{renderedWorkConsumption}
						</TableRow>
						<TableRow>
							<TableCell colSpan={3}>
								Idle
							</TableCell>
							{renderedIdleConsumption}
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
};
