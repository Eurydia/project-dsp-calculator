const LOOKUP_SORTERS: { [key: string]: Sorter } = {};

export type Sorter = Readonly<{
  label: string;
  work_consumption: number;
  idle_consumption: number;
}>;

export const Sorter = {
  fromLabel: (label: string): Sorter | null => {
    if (label in LOOKUP_SORTERS) {
      return LOOKUP_SORTERS[label];
    }
    return null;
  },

  toString: (sorter: Sorter): string => {
    return JSON.stringify(sorter.label);
  },

  create: (
    label: string,
    work_consumption: number,
    idle_consumption: number,
  ): Sorter => {
    const sorter: Sorter = {
      label,
      work_consumption,
      idle_consumption,
    };

    LOOKUP_SORTERS[label] = sorter;

    return sorter;
  },
};
