import { Proliferator, ProliferatorMode } from "../types";

export const AssetProliferators: Proliferator[] = [
  Proliferator.create(
    "None",
    ProliferatorMode.PRODUCTION_SPEEDUP,
    1,
    1,
    1,
  ),
];

(() => {
  const DATA_WORK_CONSUMPTION_MULTIPLIERS: number[] = [1.3, 1.7, 2.5];
  const DATA_PRODUCTION_MULTIPLIERS: number[] = [1.125, 1.2, 1.25];
  const DATA_SPEEDUP_MULTIPLIERS: number[] = [1.25, 1.5, 2];

  DATA_WORK_CONSUMPTION_MULTIPLIERS.forEach(
    (work_consumption_multiplier, level_index) => {
      const level: string = "I".repeat(level_index + 1);

      const bonus_speed = DATA_SPEEDUP_MULTIPLIERS[level_index];

      const bonus_speed_string =
        Math.round((bonus_speed - 1) * 1000) / 10;

      AssetProliferators.push(
        Proliferator.create(
          `(Mk.${level}) Cycle Speed +${bonus_speed_string}%`,
          ProliferatorMode.PRODUCTION_SPEEDUP,
          work_consumption_multiplier,
          1,
          bonus_speed,
        ),
      );
    },
  );

  DATA_WORK_CONSUMPTION_MULTIPLIERS.forEach(
    (work_consumption_multiplier, level_index) => {
      const level: string = "I".repeat(level_index + 1);

      const bonus_product = DATA_PRODUCTION_MULTIPLIERS[level_index];

      const bonus_product_string =
        Math.round((bonus_product - 1) * 1000) / 10;

      AssetProliferators.push(
        Proliferator.create(
          `(Mk.${level}) Products +${bonus_product_string}%`,
          ProliferatorMode.EXTRA_PRODUCTS,
          work_consumption_multiplier,
          bonus_product,
          1,
        ),
      );
    },
  );
})();
