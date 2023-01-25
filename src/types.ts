export interface BOM {
  [key: string]: number;
}

export interface Flag {
  label: string;
  tooltip: string;
}

export interface Proliferator {
  product_multiplier: number;
  speedup_multiplier: number;
  work_consumption_multiplier: number;
}
