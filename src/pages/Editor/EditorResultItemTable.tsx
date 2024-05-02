import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { FC } from "react";
import { ingredientIconFromLabel } from "~assets/index";
import { formatNumber } from "~core/formatting";

const labelToIcon = (label: string) => {
	return ingredientIconFromLabel(
		label
			.replace(" (materials)", "")
			.replace(" (products)", ""),
	);
};

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

	const items = [
		perTotal,
		perArray,
		perFacility,
	].map((data, index) => (
		<TableCell
			colSpan={1}
			key={`item-${index}`}
		>
			<Typography
				display="flex"
				alignItems="center"
				justifyContent="flex-end"
				fontSize="inherit"
			>
				{formatNumber(data)}
			</Typography>
		</TableCell>
	));

	return (
		<TableRow>
			<TableCell colSpan={1}>
				<img
					alt={label}
					src={labelToIcon(label)}
				/>
			</TableCell>
			<TableCell colSpan={2}>{label}</TableCell>
			{items}
		</TableRow>
	);
};

const StyledTableHead: FC = () => {
	return (
		<TableRow>
			<TableCell colSpan={1} />
			<TableCell colSpan={2}>
				Item (per minute)
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
				Per Array
			</TableCell>
			<TableCell
				colSpan={1}
				align="right"
			>
				Per Facility
			</TableCell>
		</TableRow>
	);
};

type EditorResultItemTableProps = {
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
export const EditorResultItemTable: FC<
	EditorResultItemTableProps
> = (props) => {
	const {
		facilityNeededCount,
		facilityPerArrayCount,
		materialFlowPerMinutePerFacility,
		productFlowPerMinutePerFacility,
	} = props;

	const materialRows = Object.entries(
		materialFlowPerMinutePerFacility,
	).map(([label, value]) => (
		<StyledTableRow
			key={label}
			label={label}
			perArray={-value * facilityNeededCount}
			perFacility={-value}
			perTotal={-value * facilityPerArrayCount}
		/>
	));

	const productRows = Object.entries(
		productFlowPerMinutePerFacility,
	).map(([label, value]) => (
		<StyledTableRow
			key={label}
			label={label}
			perArray={value * facilityNeededCount}
			perFacility={value}
			perTotal={value * facilityPerArrayCount}
		/>
	));

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
					<TableHead>
						<StyledTableHead />
					</TableHead>
					<TableBody>
						{materialRows}
						{productRows}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
};
