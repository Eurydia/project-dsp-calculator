export type Preferences = {
  preferEven: boolean;
  keepBeltUnderMaxFlow: boolean;
};

export const Preferences = {
  create: (): Preferences => {
    return {
      preferEven: true,
      keepBeltUnderMaxFlow: true,
    };
  },
};
