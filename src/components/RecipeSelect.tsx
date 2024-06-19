import { Recipe } from "@eurydos/dsp-item-registry";
import {
	CircularProgress,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Select,
	SelectChangeEvent,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { toIconURL } from "~assets/icon";
import {
	getRecipe,
	getRecipeAll,
} from "~database/get";

type RecipeSelectProps = {
	value: Recipe;
	onChange: (next: Recipe) => void;
	recipeType: string;
};
export const RecipeSelect: FC<
	RecipeSelectProps
> = (props) => {
	const { onChange, value, recipeType } = props;

	const [options, setOptions] = useState<
		Recipe[] | undefined
	>();

	useEffect(() => {
		(async () => {
			setOptions(await getRecipeAll());
		})();
	}, []);

	const handleChange = async (
		e: SelectChangeEvent<string>,
	) => {
		const next = await getRecipe(e.target.value);
		if (next === undefined) {
			return;
		}
		onChange(next);
	};

	if (options === undefined) {
		return <CircularProgress />;
	}

	const activeOptions: Recipe[] = [];
	const disabledOptions: Recipe[] = [];
	for (const opt of options) {
		if (opt.recipeType === recipeType) {
			activeOptions.push(opt);
		} else {
			disabledOptions.push(opt);
		}
	}

	const activeItems = activeOptions.map(
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

	const disabledItems =
		disabledOptions.map(({ label }) => (
			<MenuItem
				disabled
				key={label}
				value={label}
				disableRipple
			>
				<ListItemText>{label}</ListItemText>
			</MenuItem>
		));

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
			{activeItems}
			{disabledItems}
		</Select>
	);
};
