const PROLIFERATOR_TABLE: { [K: string]: Proliferator } = {};

export enum ProliferatorMode {
  EXTRA_PRODUCTS = "Extra Products",
  PRODUCTION_SPEEDUP = "Production Speedup",
}

export type Proliferator = Readonly<{
  label: string;
  mode: ProliferatorMode;
  work_consumption_multiplier: number;
  production_multiplier: number;
  speedup_multiplier: number;
}>;

export const Proliferator = {
  toJSON: (proliferator: Proliferator): string => {
    return JSON.stringify(proliferator);
  },

  fromLabel: (label: string): Proliferator | null => {
    if (label in PROLIFERATOR_TABLE) {
      return PROLIFERATOR_TABLE[label];
    }
    return null;
  },

  register: (proliferator: Proliferator): void => {
    const { label } = proliferator;
    PROLIFERATOR_TABLE[label] = proliferator;
  },

  create: (
    label: string,
    mode: ProliferatorMode,
    work_consumption_multiplier: number,
    production_multiplier: number,
    speedup_multiplier: number,
  ): Proliferator => {
    const new_proliferator: Proliferator = {
      label,
      mode,
      work_consumption_multiplier,
      production_multiplier,
      speedup_multiplier,
    };

    Proliferator.register(new_proliferator);

    return new_proliferator;
  },
};
