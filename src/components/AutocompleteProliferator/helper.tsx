import { FilterOptionsState } from "@mui/material";
import { matchSorter } from "match-sorter";

import { Proliferator } from "../../assets";

const extractTerms = (data: string): string[] => {
  const terms: string[] = [];
  const items: string[] = data.split(" ");
  for (const item of items) {
    const item_trimmed = item.trim();
    if (item_trimmed === "") {
      continue;
    }
    terms.push(item_trimmed);
  }
  return terms;
};

const termReducer = (
  options: Proliferator[],
  term: string,
): Proliferator[] => {
  return matchSorter(options, term, {
    keys: [(item) => item.label],
  });
};

const sieveOptions = (
  options: Proliferator[],
  terms: string[],
): Proliferator[] => {
  const fitlered_options: Proliferator[] = terms.reduceRight(
    termReducer,
    options,
  );
  return fitlered_options;
};

export const filterOptions = (
  options: Proliferator[],
  state: FilterOptionsState<Proliferator>,
) => {
  const value: string = state.inputValue;
  const terms: string[] = extractTerms(value);
  const filtered_options: Proliferator[] = sieveOptions(
    options,
    terms,
  );
  return filtered_options;
};
