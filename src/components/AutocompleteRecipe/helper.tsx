import { FilterOptionsState } from "@mui/material";
import { matchSorter } from "match-sorter";

import { Recipe } from "../../assets";

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

const termReducer = (options: Recipe[], term: string): Recipe[] => {
  return matchSorter(options, term, {
    keys: [
      (item) => item.label,
      (item) => Object.keys(item.material),
      (item) => Object.keys(item.product),
    ],
  });
};

const sieveOptions = (
  options: Recipe[],
  terms: string[],
): Recipe[] => {
  const fitlered_options: Recipe[] = terms.reduceRight(
    termReducer,
    options,
  );
  return fitlered_options;
};

export const filterOptions = (
  options: Recipe[],
  state: FilterOptionsState<Recipe>,
  size: number = 16,
) => {
  const value: string = state.inputValue;
  const terms: string[] = extractTerms(value);
  const filtered_options: Recipe[] = sieveOptions(
    options,
    terms,
  ).slice(0, size);
  return filtered_options;
};
