export const enum ProliferatorMode {
  EXTRA_PRODUCTS = "products",
  EXTRA_SPEED = "speed",
}

export type Proliferator = {
  mode: ProliferatorMode;
  level: number;
};
