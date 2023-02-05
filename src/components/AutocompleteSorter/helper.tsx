import { FilterOptionsState } from "@mui/material";
import { matchSorter } from "match-sorter";

import { Sorter } from "../../assets";

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

const termReducer = (options: Sorter[], term: string): Sorter[] => {
  return matchSorter(options, term, {
    keys: [(item) => item.label],
  });
};

const sieveOptions = (
  options: Sorter[],
  terms: string[],
): Sorter[] => {
  const fitlered_options: Sorter[] = terms.reduceRight(
    termReducer,
    options,
  );
  return fitlered_options;
};

export const filterOptions = (
  options: Sorter[],
  state: FilterOptionsState<Sorter>,
) => {
  const value: string = state.inputValue;
  const terms: string[] = extractTerms(value);
  const filtered_options: Sorter[] = sieveOptions(options, terms);
  return filtered_options;
};
