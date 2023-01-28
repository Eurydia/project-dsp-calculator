export const enum ProliferatorMode {
  EXTRA_PRODUCTS = "products",
  EXTRA_SPEED = "speed",
}

export type Proliferator = {
  mode: ProliferatorMode;
  level: number;
};

export const Proliferator = {
  getPowerMultiplier: (proliferator_level: number): number => {
    if (proliferator_level === 3) {
      return 2.5;
    }
    if (proliferator_level === 2) {
      return 1.7;
    }
    if (proliferator_level === 1) {
      return 1.3;
    }
    return 1;
  },

  getProductMultiplier: (proliferator_level: number): number => {
    if (proliferator_level === 3) {
      return 1.25;
    }
    if (proliferator_level === 2) {
      return 1.2;
    }
    if (proliferator_level === 1) {
      return 1.125;
    }
    return 1;
  },

  getSpeedMultiplier: (proliferator_level: number): number => {
    if (proliferator_level === 3) {
      return 2;
    }
    if (proliferator_level === 2) {
      return 1.5;
    }
    if (proliferator_level === 1) {
      return 1.25;
    }
    return 1;
  },

  getMultiplier: (
    prolfierator: Proliferator,
  ): {
    power_multiplier: number;
    product_multiplier: number;
    speed_multiplier: number;
  } => {
    const { level, mode } = prolfierator;

    const power_multiplier: number =
      Proliferator.getPowerMultiplier(level);

    if (mode === ProliferatorMode.EXTRA_PRODUCTS) {
      const product_multiplier: number =
        Proliferator.getProductMultiplier(level);
      return {
        power_multiplier,
        product_multiplier,
        speed_multiplier: 1,
      };
    }

    const speed_multiplier: number =
      Proliferator.getSpeedMultiplier(level);
    return {
      power_multiplier,
      speed_multiplier,
      product_multiplier: 1,
    };
  },
};

export type Flags = {
  preferEven: boolean;
  keepBeltUnderMaxFlow: boolean;
  accountForSortersConsumption: boolean;
};

export const Flags = {
  create: (): Flags => {
    return {
      preferEven: true,
      keepBeltUnderMaxFlow: true,
      accountForSortersConsumption: true,
    };
  },
};
