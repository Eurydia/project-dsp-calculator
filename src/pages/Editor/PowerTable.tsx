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
		-workConsumptionPerFacility *
			facilityNeededCount,
		-workConsumptionPerFacility *
			facilityPerArrayCount,
		-workConsumptionPerFacility,
	];
	const renderedWorkConsumption =
		computedWorkConsumption.map(
			(value, index) => (
				<TableCell
					key={`supply-${index}`}
					colSpan={1}
					align="right"
					children={formatNumber(value)}
				/>
			),
		);

	const computedIdleConsumption = [
		-idleConsumptionPerFacility *
			facilityNeededCount,
		-idleConsumptionPerFacility *
			facilityPerArrayCount,
		-idleConsumptionPerFacility,
	];
	const renderedIdleConsumption =
		computedIdleConsumption.map(
			(value, index) => (
				<TableCell
					key={`power-${index}`}
					colSpan={1}
					align="right"
					children={formatNumber(value)}
				/>
			),
		);

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
							{renderedWorkConsumption}
						</TableRow>
						<TableRow>
							<TableCell
								colSpan={3}
								children="Idle"
							/>
							{renderedIdleConsumption}
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</PaddedPaper>
	);
};
