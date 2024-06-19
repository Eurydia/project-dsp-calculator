import { Recipe } from "@eurydos/dsp-item-registry";
import {
	ListItemIcon,
	ListItemText,
	MenuItem,
	Select,
	SelectChangeEvent,
} from "@mui/material";
import { FC } from "react";
import { toIconURL } from "~assets/icon";
import { getRecipe } from "~database/get";

type RecipeSelectProps = {
	value: Recipe;
	onChange: (value: Recipe) => void;
	options: Recipe[];
	recipeType: string;
};
export const RecipeSelect: FC<
	RecipeSelectProps
> = (props) => {
	const { options, onChange, value, recipeType } =
		props;

	const activeOpts: Recipe[] = [];
	const disabledOpts: Recipe[] = [];
	for (const opt of options) {
		if (opt.recipeType === recipeType) {
			activeOpts.push(opt);
		} else {
			disabledOpts.push(opt);
		}
	}

	const renderedActiveOpts = activeOpts.map(
		({ label }) => (
			<MenuItem
				key={label}
				value={label}
				disableRipple
			>
				<ListItemIcon>
					<img
						src={toIconURL(label)}
						alt={label}
					/>
				</ListItemIcon>
				<ListItemText>{label}</ListItemText>
			</MenuItem>
		),
	);

	const renderedDisabledOpts = disabledOpts.map(
		({ label }) => (
			<MenuItem
				disabled
				key={label}
				value={label}
				disableRipple
			>
				<ListItemText>{label}</ListItemText>
			</MenuItem>
		),
	);
	const handleChange = async (
		e: SelectChangeEvent<string>,
	) => {
		const next = await getRecipe(e.target.value);
		if (next === undefined) {
			return;
		}
		onChange(next);
	};

	return (
		<Select
			size="small"
			value={value.label}
			onChange={handleChange}
			SelectDisplayProps={{
				style: {
					display: "flex",
					alignItems: "center",
				},
			}}
		>
			{renderedActiveOpts}
			{renderedDisabledOpts}
		</Select>
	);
};
