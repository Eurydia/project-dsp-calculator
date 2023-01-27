import { createContext } from "react";
import { Flags } from "../types";

export const FlagContext = createContext<{
  flags: Flags;
  setFlags: (
    next_flags: Flags | ((prev_flags: Flags) => Flags),
  ) => void;
}>({
  flags: Flags.create(),
  setFlags: (next_flags) => {
    return;
  },
});
