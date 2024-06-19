import {
	Proliferator,
	ProliferatorMode,
} from "@eurydos/dsp-item-registry";
import {
	ListItemIcon,
	ListItemText,
	MenuItem,
	Select,
	SelectChangeEvent,
} from "@mui/material";
import { FC } from "react";
import { proliferatorToIconURL } from "~assets/icon";
import { getProliferator } from "~database/get";

type ProlfieratorSelectProps = {
	value: Proliferator;
	onChange: (value: Proliferator) => void;
	options: Proliferator[];
	speedupOnly: boolean;
};
export const ProliferatorSelect: FC<
	ProlfieratorSelectProps
> = (props) => {
	const {
		options,
		onChange,
		value,
		speedupOnly,
	} = props;

	const activeOpts: Proliferator[] = [];
	const disabledOpts: Proliferator[] = [];
	for (const opt of options) {
		if (
			speedupOnly &&
			opt.mode === ProliferatorMode.EXTRA_PRODUCTS
		) {
			disabledOpts.push(opt);
		} else {
			activeOpts.push(opt);
		}
	}

	const renderedActiveOpts = activeOpts.map(
		(item) => {
			const { label } = item;
			return (
				<MenuItem
					key={label}
					value={label}
					disableRipple
				>
					{label !== "None" && (
						<ListItemIcon>
							<img
								src={proliferatorToIconURL(item)}
								alt={label}
							/>
						</ListItemIcon>
					)}
					<ListItemText>{label}</ListItemText>
				</MenuItem>
			);
		},
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
		const next = await getProliferator(
			e.target.value,
		);
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
