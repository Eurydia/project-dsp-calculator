import { FC } from "react";
import { FacilitySelect } from "~components/FacilitySelect";

export const Editor: FC = () => {
	return (
		<FacilitySelect
			storeKey="f"
			onChange={(f) => console.debug(f)}
		/>
	);
	// const {
	// 	capacityRecord,
	// 	constraintRecord,
	// 	flowrateRecord,
	// 	prolifEffectLabel,
	// 	prolifSprayCount,
	// 	recipeLabel,
	// 	sorterRecord,
	// 	handleCapacityRecordChange,
	// 	handleConstraintRecordChange,
	// 	handleFlowrateRecordChange,
	// 	handleProlifChange,
	// 	handleProlifSprayCountChange,
	// 	handleRecipeChange,
	// 	handleSorterRecordChange,
	// } = useCalculator();

	// const flowrateItems = Object.entries(
	// 	flowrateRecord,
	// );
	// const renderedFlowrates = flowrateItems.map(
	// 	([label, value]) => (
	// 		<Stack
	// 			key={label}
	// 			direction="row"
	// 			alignItems="center"
	// 		>
	// 			<StyledTextField
	// 				label={label}
	// 				maxLength={6}
	// 				value={value}
	// 				suffix="/min"
	// 				onChange={(next) =>
	// 					handleFlowrateRecordChange(
	// 						label,
	// 						next,
	// 					)
	// 				}
	// 				prefix={
	// 					<img
	// 						alt={label}
	// 						src={ingredientIconFromLabel(label)}
	// 					/>
	// 				}
	// 			/>
	// 			<IconButton
	// 				disableRipple
	// 				size="small"
	// 				color="primary"
	// 				children={<RestartAltRounded />}
	// 				onClick={() =>
	// 					handleFlowrateRecordChange(label, "0")
	// 				}
	// 			/>
	// 		</Stack>
	// 	),
	// );
	// const renderedSorters = Object.entries(
	// 	sorterRecord,
	// ).map(([label, value]) => (
	// 	<Stack
	// 		key={label}
	// 		direction="row"
	// 		alignItems="center"
	// 	>
	// 		<StyledTextField
	// 			label={label}
	// 			maxLength={2}
	// 			value={value}
	// 			// suffix={`/${facility.connectionCount}`}
	// 			onChange={(nextValue) =>
	// 				handleSorterRecordChange(
	// 					label,
	// 					nextValue,
	// 				)
	// 			}
	// 			prefix={
	// 				<img
	// 					alt={label}
	// 					src={ingredientIconFromLabel(label)}
	// 				/>
	// 			}
	// 		/>
	// 		<IconButton
	// 			disableRipple
	// 			size="small"
	// 			color="primary"
	// 			children={<RestartAltRounded />}
	// 			onClick={() =>
	// 				handleSorterRecordChange(label, "0")
	// 			}
	// 		/>
	// 	</Stack>
	// ));

	// const { content: mode, setContent: setMode } =
	// 	useContent("0", "mode");

	// let facilitiesNeeded = 0;
	// if (mode === "0") {
	// 	facilitiesNeeded =
	// 		solveFacilityNeededCountConstraint(
	// 			facilityLabel,
	// 			recipeLabel,
	// 			prolifEffectLabel,
	// 			constraintRecord,
	// 		);
	// } else {
	// 	facilitiesNeeded =
	// 		solveFacilityNeededCountCapacity(
	// 			facilityLabel,
	// 			recipeLabel,
	// 			prolifEffectLabel,
	// 			capacityRecord,
	// 		);
	// }

	// const facilitiesPerArray =
	// 	solveFacilityPerArrayCount(
	// 		facilityLabel,
	// 		recipeLabel,
	// 		prolifEffectLabel,
	// 		flowrateRecord,
	// 	);

	// const materialPerMinutePerFacility =
	// 	solveDemandPerMinutePerFacility(
	// 		facilityLabel,
	// 		recipeLabel,
	// 		prolifEffectLabel,
	// 		prolifSprayCount,
	// 	);

	// const productPerMinutePerFacility =
	// 	solveProductionPerMinutePerFacility(
	// 		facilityLabel,
	// 		recipeLabel,
	// 		prolifEffectLabel,
	// 	);

	// let arraysNeeded = 0;
	// if (facilitiesPerArray > 0) {
	// 	arraysNeeded = Math.floor(
	// 		facilitiesNeeded / facilitiesPerArray,
	// 	);
	// }

	// const facilityLeftover =
	// 	facilitiesNeeded -
	// 	arraysNeeded * facilitiesPerArray;

	// const workConsumptionPerFacility =
	// 	solveWorkConsumptionMWPerFacility(
	// 		facilityLabel,
	// 		prolifEffectLabel,
	// 		sorterRecord,
	// 	);

	// const idleConsumptionPerFacility =
	// 	solveIdleConsumptionMWPerFacility(
	// 		facilityLabel,
	// 		sorterRecord,
	// 	);
	// const layoutDetails = [
	// 	facilitiesPerArray,
	// 	arraysNeeded,
	// 	facilitiesNeeded,
	// 	facilityLeftover,
	// ];
	// // const renderedLayoutInfo = (
	// // 	<PaddedPaper elevation={2}>
	// // 		<List
	// // 			dense
	// // 			disablePadding
	// // 			subheader={
	// // 				<StyledListSubheader
	// // 					disableGutters
	// // 					disableSticky
	// // 					children="Layout"
	// // 				/>
	// // 			}
	// // 		>
	// // 			{LAYOUT_INFO_DEFINITION.map(
	// // 				({ label, icon, render }, index) => (
	// // 					<ListItem key={label}>
	// // 						<ListItemIcon children={icon} />
	// // 						<ListItemText
	// // 							primary={label}
	// // 							secondary={render(
	// // 								layoutDetails[index],
	// // 							)}
	// // 						/>
	// // 					</ListItem>
	// // 				),
	// // 			)}
	// // 		</List>
	// // 	</PaddedPaper>
	// // );

	// // const renderedFacilityInfo = (
	// // 	<PaddedPaper elevation={2}>
	// // 		<List
	// // 			disablePadding
	// // 			dense
	// // 			subheader={
	// // 				<StyledListSubheader
	// // 					disableGutters
	// // 					disableSticky
	// // 					children="Facility information"
	// // 				/>
	// // 			}
	// // 		>
	// // 			{FACILITY_INFO_DEFINITIONS.map(
	// // 				({ icon, label, render }) => (
	// // 					<ListItem key={label}>
	// // 						<ListItemIcon children={icon} />
	// // 						<ListItemText
	// // 							primary={label}
	// // 							secondary={render(facility)}
	// // 						/>
	// // 					</ListItem>
	// // 				),
	// // 			)}
	// // 		</List>
	// // 	</PaddedPaper>
	// // );
	// // const renderedRecipeInfo = (
	// // 	<PaddedPaper elevation={2}>
	// // 		<List
	// // 			disablePadding
	// // 			dense
	// // 			subheader={
	// // 				<StyledListSubheader
	// // 					disableGutters
	// // 					disableSticky
	// // 					children="Recipe information"
	// // 				/>
	// // 			}
	// // 		>
	// // 			{RECIPE_INFO_DEFINITION.map(
	// // 				({ icon, label, render }) => (
	// // 					<ListItem key={label}>
	// // 						<ListItemIcon children={icon} />
	// // 						<ListItemText
	// // 							primary={label}
	// // 							secondary={render(recipe)}
	// // 						/>
	// // 					</ListItem>
	// // 				),
	// // 			)}
	// // 		</List>
	// // 	</PaddedPaper>
	// // );
	// // const renderedProlifInfo = (
	// // 	<PaddedPaper elevation={2}>
	// // 		<List
	// // 			disablePadding
	// // 			dense
	// // 			subheader={
	// // 				<StyledListSubheader
	// // 					disableGutters
	// // 					disableSticky
	// // 					children="Proliferator effects"
	// // 				/>
	// // 			}
	// // 		>
	// // 			{PROLIF_INFO_DEFINITION.map(
	// // 				({ icon, label, render }) => (
	// // 					<ListItem key={label}>
	// // 						<ListItemIcon children={icon} />
	// // 						<ListItemText
	// // 							primary={label}
	// // 							secondary={render(proliferator)}
	// // 						/>
	// // 					</ListItem>
	// // 				),
	// // 			)}
	// // 		</List>
	// // 	</PaddedPaper>
	// // );

	// return (
	// 	<PrimaryLayout
	// 		slotConfig={
	// 			<ConfigLayout
	// 				facility={
	// 					<StyledSelect
	// 						sort
	// 						label="Facility"
	// 						value={facilityLabel}
	// 						onChange={handleFacilityChange}
	// 						optionToIcon={
	// 							ingredientIconFromLabel
	// 						}
	// 						options={FACILITY_OPTIONS}
	// 						disabledOptions={[]}
	// 					/>
	// 				}
	// 				recipe={
	// 					<StyledSelect
	// 						sort
	// 						label="Recipe"
	// 						value={recipeLabel}
	// 						onChange={handleRecipeChange}
	// 						optionToIcon={
	// 							ingredientIconFromLabel
	// 						}
	// 						options={RECIPE_OPTIONS}
	// 						disabledOptions={[]}
	// 						// disabledOptions={getDisabledRecipeOptions(
	// 						// 	recipe.recipeType as RecipeType,
	// 						// )}
	// 					/>
	// 				}
	// 				flowrates={renderedFlowrates}
	// 				proliferator={
	// 					<StyledSelect
	// 						label="Proliferator"
	// 						value={prolifEffectLabel}
	// 						onChange={handleProlifChange}
	// 						options={PROLIF_OPTIONS}
	// 						optionToIcon={prolifLabelToIcon}
	// 						disabledOptions={[]}
	// 						// disabledOptions={getDisabledProlifOptions(
	// 						// 	recipe.speedupOnly,
	// 						// )}
	// 					/>
	// 				}
	// 				prolfieratorUses={
	// 					<Stack
	// 						direction="row"
	// 						alignItems="center"
	// 					>
	// 						<StyledTextField
	// 							// placeholder={proliferator.sprayCount.toString()}
	// 							maxLength={6}
	// 							label="Uses"
	// 							value={prolifSprayCount}
	// 							onChange={
	// 								handleProlifSprayCountChange
	// 							}
	// 							suffix="sprays"
	// 						/>
	// 						<IconButton
	// 							disableRipple
	// 							size="small"
	// 							color="primary"
	// 							children={<RestartAltRounded />}
	// 							onClick={() =>
	// 								handleProlifSprayCountChange(
	// 									"0",
	// 								)
	// 							}
	// 						/>
	// 					</Stack>
	// 				}
	// 				sorters={renderedSorters}
	// 			></ConfigLayout>
	// 		}
	// 		slotResult={
	// 			<Stack spacing={2}>
	// 				<ProductionConfig
	// 					mode={mode}
	// 					constraintRecord={constraintRecord}
	// 					capacityRecord={capacityRecord}
	// 					onModeChange={setMode}
	// 					onCapacityChange={
	// 						handleCapacityRecordChange
	// 					}
	// 					onConstraintChange={
	// 						handleConstraintRecordChange
	// 					}
	// 				/>
	// 				<FlowrateTable
	// 					facilityNeededCount={facilitiesNeeded}
	// 					facilityPerArrayCount={
	// 						facilitiesPerArray
	// 					}
	// 					materialFlowPerMinutePerFacility={
	// 						materialPerMinutePerFacility
	// 					}
	// 					productFlowPerMinutePerFacility={
	// 						productPerMinutePerFacility
	// 					}
	// 				/>
	// 				<PowerTable
	// 					facilityNeededCount={facilitiesNeeded}
	// 					facilityPerArrayCount={
	// 						facilitiesPerArray
	// 					}
	// 					idleConsumptionPerFacility={
	// 						idleConsumptionPerFacility
	// 					}
	// 					workConsumptionPerFacility={
	// 						workConsumptionPerFacility
	// 					}
	// 				/>
	// 				<DualColumnLayout
	// 					columnLeft={
	// 						<Fragment>
	// 							{/* {renderedLayoutInfo} */}
	// 							{/* {renderedRecipeInfo} */}
	// 						</Fragment>
	// 					}
	// 					columnRight={
	// 						<Fragment>
	// 							{/* {renderedFacilityInfo}
	// 							{renderedProlifInfo} */}
	// 						</Fragment>
	// 					}
	// 				/>
	// 			</Stack>
	// 		}
	// 	/>
	// );
};
