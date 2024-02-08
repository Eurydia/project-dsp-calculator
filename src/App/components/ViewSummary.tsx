import { FC, Fragment, useState } from "react";
import {
	Grid,
	Stack,
	Tab,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tabs,
	Typography,
} from "@mui/material";
import {
	AddRounded,
	Remove,
} from "@mui/icons-material";

const formatNumber = (value: number): string => {
	return value.toPrecision();
};

type ViewSummaryProps = {
	facilitiesNeeded: number;
	facilitiesPerArray: number;
	workConsumptionMWPerFacility: number;
	idleConsumptionMWPerFacility: number;
	materialPerFacility: Record<string, number>;
	productPerFacility: Record<string, number>;
};
export const ViewSummary: FC<ViewSummaryProps> = (
	props,
) => {
	const {
		facilitiesNeeded,
		facilitiesPerArray,
		idleConsumptionMWPerFacility,
		workConsumptionMWPerFacility,
		materialPerFacility,
		productPerFacility,
	} = props;

	const [currTab, setCurrTab] = useState(0);

	const arraysNeeded: number =
		Math.floor(
			facilitiesNeeded / facilitiesPerArray,
		) || 0;
	const facilitiesLeftover: number =
		facilitiesNeeded % facilitiesPerArray || 0;

	return (
		<Grid
			container
			spacing={2}
			sx={{
				height: "100%",
			}}
		>
			<Grid
				item
				md={12}
			>
				<Tabs
					visibleScrollbar
					orientation="horizontal"
					variant="scrollable"
					scrollButtons="auto"
					value={currTab}
					onChange={(_, value: number) =>
						setCurrTab(value)
					}
				>
					{[
						"Facilities",
						"Consumption/Production",
						"Power",
					].map((label, index) => (
						<Tab
							key={`tab-${index}`}
							value={index}
							label={label}
						/>
					))}
				</Tabs>
			</Grid>
			<Grid
				item
				md={12}
			>
				{currTab !== 0 ? (
					<Fragment />
				) : (
					<Stack spacing={2}>
						<Typography>
							{facilitiesNeeded > 1
								? "Total facilities needed"
								: "Total facility needed"}
							:{" "}
							{facilitiesNeeded.toLocaleString(
								"en-US",
							)}
						</Typography>
						<Typography>
							{arraysNeeded > 1
								? "Arrays needed"
								: "Array needed"}
							:{" "}
							{arraysNeeded.toLocaleString(
								"en-US",
							)}
						</Typography>
						<Typography>
							{facilitiesPerArray > 1
								? "Facilities per array"
								: "Facility per array"}
							:{" "}
							{facilitiesPerArray.toLocaleString(
								"en-US",
							)}
						</Typography>
						<Typography>
							{facilitiesLeftover > 1
								? "Leftover facilities"
								: "Leftover facility"}
							:{" "}
							{facilitiesLeftover.toLocaleString(
								"en-US",
							)}
						</Typography>
					</Stack>
				)}
				{currTab !== 1 ? (
					<Fragment />
				) : (
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell colSpan={3}>
										<Typography color="primary">
											Item (per minute)
										</Typography>
									</TableCell>
									<TableCell
										colSpan={1}
										align="right"
									>
										<Typography color="primary">
											Total
										</Typography>
									</TableCell>
									<TableCell
										colSpan={1}
										align="right"
									>
										<Typography color="primary">
											Per array
										</Typography>
									</TableCell>
									<TableCell
										colSpan={1}
										align="right"
									>
										<Typography color="primary">
											Per facility
										</Typography>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{Object.entries(
									materialPerFacility,
								).map((entry) => {
									const [label, value] = entry;

									return (
										<TableRow key={label}>
											<TableCell colSpan={3}>
												{label}
											</TableCell>
											{[
												value * facilitiesNeeded,
												value *
													facilitiesPerArray,
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
									);
								})}
								{Object.entries(
									productPerFacility,
								).map((entry) => {
									const [label, value] = entry;
									return (
										<TableRow key={label}>
											<TableCell colSpan={3}>
												{label}
											</TableCell>
											{[
												value * facilitiesNeeded,
												value *
													facilitiesPerArray,
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
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
				)}
				{currTab !== 2 ? (
					<Fragment />
				) : (
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell colSpan={3}>
										<Typography color="primary">
											Category (MW)
										</Typography>
									</TableCell>
									<TableCell
										colSpan={1}
										align="right"
									>
										<Typography color="primary">
											Total
										</Typography>
									</TableCell>
									<TableCell
										colSpan={1}
										align="right"
									>
										<Typography color="primary">
											Per array
										</Typography>
									</TableCell>
									<TableCell
										colSpan={1}
										align="right"
									>
										<Typography color="primary">
											Per facility
										</Typography>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									<TableCell colSpan={3}>
										Work
									</TableCell>
									{[
										workConsumptionMWPerFacility *
											facilitiesNeeded,
										workConsumptionMWPerFacility *
											facilitiesPerArray,
										workConsumptionMWPerFacility,
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
												<Remove fontSize="inherit" />
												{formatNumber(data)}
											</Typography>
										</TableCell>
									))}
								</TableRow>
								<TableRow>
									<TableCell colSpan={3}>
										Idle
									</TableCell>
									{[
										idleConsumptionMWPerFacility *
											facilitiesNeeded,
										idleConsumptionMWPerFacility *
											facilitiesPerArray,
										idleConsumptionMWPerFacility,
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
												<Remove fontSize="inherit" />
												{formatNumber(data)}
											</Typography>
										</TableCell>
									))}
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</Grid>
		</Grid>
	);
};
