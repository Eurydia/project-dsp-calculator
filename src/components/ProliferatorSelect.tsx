import {
	Proliferator,
	ProliferatorMode,
} from "@eurydos/dsp-item-registry";
import {
	CircularProgress,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Select,
	SelectChangeEvent,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { proliferatorToIconURL } from "~assets/icon";
import {
	getProliferator,
	getProliferatorAll,
} from "~database/get";

type ProlfieratorSelectProps = {
	value: Proliferator;
	onChange: (value: Proliferator) => void;
	speedupOnly: boolean;
};
export const ProliferatorSelect: FC<
	ProlfieratorSelectProps
> = (props) => {
	const { onChange, value, speedupOnly } = props;

	const [options, setOptions] = useState<
		Proliferator[] | undefined
	>();
	useEffect(() => {
		(async () => {
			setOptions(await getProliferatorAll());
		})();
	}, []);

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

	if (options === undefined) {
		return <CircularProgress />;
	}

	const activeOptions: Proliferator[] = [];
	const disabledOptions: Proliferator[] = [];
	for (const opt of options) {
		if (
			speedupOnly &&
			opt.mode === ProliferatorMode.EXTRA_PRODUCTS
		) {
			disabledOptions.push(opt);
		} else {
			activeOptions.push(opt);
		}
	}

	const activeItems = activeOptions.map(
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

	const disabledItems = disabledOptions.map(
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
