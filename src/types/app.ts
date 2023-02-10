export const enum ConsumptionUnit {
  KILOWATT = "kW",
  MEGAWATT = "MW",
  GIGAWATT = "GW",
}

export type Flags = {
  consumptionUnit: ConsumptionUnit;
  preferEven: boolean;
  keepBeltUnderMaxFlow: boolean;
};

export const Flags = {
  create: (): Flags => {
    return {
      consumptionUnit: ConsumptionUnit.MEGAWATT,
      preferEven: true,
      keepBeltUnderMaxFlow: true,
    };
  },
};
