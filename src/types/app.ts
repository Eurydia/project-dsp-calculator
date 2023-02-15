export type Flags = {
  preferEven: boolean;
  keepBeltUnderMaxFlow: boolean;
};

export const Flags = {
  create: (): Flags => {
    return {
      preferEven: true,
      keepBeltUnderMaxFlow: true,
    };
  },
};
