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
import { Remove } from "@mui/icons-material";

import { formatNumber } from "core/formatLocaleNumber";

type EditorResultPowerTableProps = {
	facilityNeededCount: number;
	facilityPerArrayCount: number;
	workConsumptionPerFacility: number;
	idleConsumptionPerFacility: number;
};
export const EditorResultPowerTable: FC<
	EditorResultPowerTableProps
> = (props) => {
	const {
		facilityNeededCount,
		facilityPerArrayCount,
		workConsumptionPerFacility,
		idleConsumptionPerFacility,
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
					<TableBody>
						<TableRow>
							<TableCell colSpan={3}>
								Work
							</TableCell>
							{[
								workConsumptionPerFacility *
									facilityNeededCount,
								workConsumptionPerFacility *
									facilityPerArrayCount,
								workConsumptionPerFacility,
							].map((value, index) => (
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
										<Remove fontSize="inherit" />
										{formatNumber(value)}
									</Typography>
								</TableCell>
							))}
						</TableRow>
						<TableRow>
							<TableCell colSpan={3}>
								Idle
							</TableCell>
							{[
								idleConsumptionPerFacility *
									facilityNeededCount,
								idleConsumptionPerFacility *
									facilityPerArrayCount,
								idleConsumptionPerFacility,
							].map((value, index) => (
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
										<Remove fontSize="inherit" />
										{formatNumber(value)}
									</Typography>
								</TableCell>
							))}
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
};
