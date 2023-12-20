export type Preferences = {
	preferEven: boolean;
	keepBeltUnderMaxFlow: boolean;
	proliferateProducts: boolean;
};

export const Preferences = {
	create: (): Preferences => {
		return {
			preferEven: true,
			keepBeltUnderMaxFlow: true,
			proliferateProducts: false,
		};
	},
};

export type Configuration = {
	facilitySpeedupMultiplier: number;
	facilityWorkConsumptionMW: number;
	facilityIdleConsumptionMW: number;

	recipeCycleTimeSecond: number;
	recipeMaterialRatioRecord: Record<
		string,
		number
	>;
	recipeProductRatioRecord: Record<
		string,
		number
	>;

	sorterWorkConsumptionMW: number;
	sorterIdleConsumptionMW: number;

	proliferatorSpeedupMultiplier: number;
	proliferatorProductMultiplier: number;
	proliferatorWorkConsumptionMultiplier: number;

	inputFlowrateMinute: number;
	outputFlowrateMinute: number;
};

export const Configuration = {
	create: (): Configuration => {
		return {
			facilitySpeedupMultiplier: 1,
			facilityWorkConsumptionMW: 0,
			facilityIdleConsumptionMW: 0,

			recipeCycleTimeSecond: 1,
			recipeMaterialRatioRecord: {},
			recipeProductRatioRecord: {},

			sorterWorkConsumptionMW: 0,
			sorterIdleConsumptionMW: 0,

			proliferatorProductMultiplier: 1,
			proliferatorSpeedupMultiplier: 1,
			proliferatorWorkConsumptionMultiplier: 1,

			inputFlowrateMinute: 6,
			outputFlowrateMinute: 6,
		};
	},
};
