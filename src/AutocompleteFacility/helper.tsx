import { FilterOptionsState } from "@mui/material";
import { matchSorter } from "match-sorter";

import { Facility } from "../assets/data";

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
  options: Facility[],
  term: string,
): Facility[] => {
  return matchSorter(options, term, {
    keys: [(item) => item.label, (item) => item.recipe_type],
  });
};

const sieveOptions = (
  options: Facility[],
  terms: string[],
): Facility[] => {
  const fitlered_options: Facility[] = terms.reduceRight(
    termReducer,
    options,
  );
  return fitlered_options;
};

export const filterOptions = (
  options: Facility[],
  state: FilterOptionsState<Facility>,
  size: number = 16,
) => {
  const value: string = state.inputValue;
  const terms: string[] = extractTerms(value);
  const filtered_options: Facility[] = sieveOptions(
    options,
    terms,
  ).slice(0, size);
  return filtered_options;
};
