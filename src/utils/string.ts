import { capitalize } from "lodash";

export const capitalizeAll = (
  s: string,
  separator: string = " ",
): string => {
  return s.split(separator).map(capitalize).join(separator);
};
