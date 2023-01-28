import { Flags } from "../../types";

export const getSupportableFacility = (
  belt_flowrate: number,
  item_flowrate: number,
  flags: Flags,
): number => {
  const supportable: number = Math.floor(
    belt_flowrate / item_flowrate,
  );
  if (
    flags.keepBeltUnderMaxFlow &&
    supportable * item_flowrate >= belt_flowrate
  ) {
    return supportable - 1;
  }
  return supportable;
};
