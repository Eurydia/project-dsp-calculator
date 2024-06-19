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

type StyledTableRowProps = {
	label: string;
	perFacility: number;
	perArray: number;
	perTotal: number;
};
const StyledTableRow: FC<StyledTableRowProps> = (
	props,
) => {
	const {
		label,
		perArray,
		perFacility,
		perTotal,
	} = props;

	const items = [perTotal, perArray, perFacility];
	const renderedItems = items.map(
		(data, index) => (
			<TableCell
				key={`${label}-${index}`}
				colSpan={1}
				align="right"
				children={formatNumber(data)}
			/>
		),
	);
	const itemIconUrl = toIconURL(
		label
			.replace(" (materials)", "")
			.replace(" (products)", ""),
	);

	return (
		<TableRow>
			<TableCell colSpan={1}>
				<img
					alt={label}
					src={itemIconUrl}
				/>
			</TableCell>
			<TableCell
				colSpan={2}
				children={label}
			/>
			{renderedItems}
		</TableRow>
	);
};

const StyledTableHead: FC = () => {
	return (
		<TableRow>
			<TableCell colSpan={1} />
			<StyledTableHeadCell
				colSpan={2}
				children="Item (per minute)"
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

type FlowrateTableProps = {
	facilityNeededCount: number;
	facilityPerArrayCount: number;
	materialFlowPerMinutePerFacility: Record<
		string,
		number
	>;
	productFlowPerMinutePerFacility: Record<
		string,
		number
	>;
};
export const FlowrateTable: FC<
	FlowrateTableProps
> = (props) => {
	const {
		facilityNeededCount,
		facilityPerArrayCount,
		materialFlowPerMinutePerFacility,
		productFlowPerMinutePerFacility,
	} = props;

	const materialRows = Object.entries(
		materialFlowPerMinutePerFacility,
	);
	const renderedMaterialRows = materialRows.map(
		([label, value]) => (
			<StyledTableRow
				key={label}
				label={label}
				perFacility={-value}
				perArray={-value * facilityNeededCount}
				perTotal={-value * facilityPerArrayCount}
			/>
		),
	);

	const productRows = Object.entries(
		productFlowPerMinutePerFacility,
	);
	const renderedProductRows = productRows.map(
		([label, value]) => (
			<StyledTableRow
				key={label}
				label={label}
				perFacility={value}
				perArray={value * facilityNeededCount}
				perTotal={value * facilityPerArrayCount}
			/>
		),
	);

	return (
		<PaddedPaper elevation={2}>
			<TableContainer>
				<Table>
					<TableHead>
						<StyledTableHead />
					</TableHead>
					<TableBody>
						{renderedMaterialRows}
						{renderedProductRows}
					</TableBody>
				</Table>
			</TableContainer>
		</PaddedPaper>
	);
};
