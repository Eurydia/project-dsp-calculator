const SORTER_TABLE: { [key: string]: Sorter } = {};

export type Sorter = Readonly<{
  label: string;
  work_consumption: number;
  idle_consumption: number;
}>;

export const Sorter = {
  fromLabel: (label: string): Sorter | null => {
    if (label in SORTER_TABLE) {
      return SORTER_TABLE[label];
    }
    return null;
  },

  toJSON: (sorter: Sorter): string => {
    return JSON.stringify(sorter);
  },

  register: (sorter: Sorter) => {
    const { label } = sorter;
    SORTER_TABLE[label] = sorter;
  },

  create: (
    label: string,
    work_consumption: number,
    idle_consumption: number,
  ): Sorter => {
    const new_sorter: Sorter = {
      label,
      work_consumption,
      idle_consumption,
    };
    Sorter.register(new_sorter);
    return new_sorter;
  },
};
