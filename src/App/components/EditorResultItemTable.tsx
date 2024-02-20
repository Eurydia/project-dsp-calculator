import { FC } from "react";

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
import {
	AddRounded,
	Remove,
} from "@mui/icons-material";

import { ingredientIconFromLabel } from "assets/ingredient.mts";
import { formatNumber } from "core/formatLocaleNumber";

const labelToIcon = (label: string) => {
	return ingredientIconFromLabel(
		label
			.replace(" (materials)", "")
			.replace(" (products)", ""),
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
					</TableHead>
					<TableBody>
						{Object.entries(
							materialFlowPerMinutePerFacility,
						).map(([label, value]) => (
							<TableRow key={label}>
								<TableCell colSpan={1}>
									<img
										alt={label}
										src={labelToIcon(label)}
									/>
								</TableCell>
								<TableCell colSpan={2}>
									{label}
								</TableCell>
								{[
									value * facilityNeededCount,
									value * facilityPerArrayCount,
									value,
								].map((data, index) => (
									<TableCell
										colSpan={1}
										key={`demand-${index}`}
									>
										<Typography
											display="flex"
											alignItems="center"
											justifyContent="flex-end"
											fontSize="inherit"
										>
											<Remove fontSize="inherit" />
											{formatNumber(data)}
										</Typography>
									</TableCell>
								))}
							</TableRow>
						))}
						{Object.entries(
							productFlowPerMinutePerFacility,
						).map(([label, value]) => (
							<TableRow key={label}>
								<TableCell colSpan={1}>
									<img
										alt={label}
										src={ingredientIconFromLabel(
											label,
										)}
									/>
								</TableCell>
								<TableCell colSpan={2}>
									{label}
								</TableCell>
								{[
									value * facilityNeededCount,
									value * facilityPerArrayCount,
									value,
								].map((data, index) => (
									<TableCell
										key={`supply-${index}`}
										colSpan={1}
									>
										<Typography
											display="flex"
											alignItems="center"
											justifyContent="flex-end"
											fontSize="inherit"
										>
											<AddRounded fontSize="inherit" />
											{formatNumber(data)}
										</Typography>
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
};
