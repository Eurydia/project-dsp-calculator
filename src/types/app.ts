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
	workConsumptionMWPerFacility: number;
	idleConsumptionMWPerFacility: number;

	recipeCycleTime: number;
	recipeMaterialRatioRecord: Record<
		string,
		number
	>;
	recipeProductRatioRecord: Record<
		string,
		number
	>;

	workConsumptionMWPerSorter: number;
	idleConsumptionMWPerSorter: number;

	proliferatorSpeedupMultiplier: number;
	proliferatorProductMultiplier: number;
	proliferatorWorkConsumptionMultiplier: number;

	materialFlowratePerMinute: number;
	productFlowratePerMinute: number;
};

export const Configuration = {
	create: (): Configuration => {
		return {
			facilitySpeedupMultiplier: 1,
			workConsumptionMWPerFacility: 0,
			idleConsumptionMWPerFacility: 0,

			recipeCycleTime: 1,
			recipeMaterialRatioRecord: {},
			recipeProductRatioRecord: {},

			workConsumptionMWPerSorter: 0,
			idleConsumptionMWPerSorter: 0,

			proliferatorProductMultiplier: 1,
			proliferatorSpeedupMultiplier: 1,
			proliferatorWorkConsumptionMultiplier: 1,

			materialFlowratePerMinute: 6,
			productFlowratePerMinute: 6,
		};
	},
};
