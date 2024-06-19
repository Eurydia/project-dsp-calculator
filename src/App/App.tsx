import {
	Facility,
	Proliferator,
	Recipe,
} from "@eurydos/dsp-item-registry";
import {
	CircularProgress,
	CssBaseline,
	ThemeProvider,
} from "@mui/material";
import {
	FC,
	useEffect,
	useRef,
	useState,
} from "react";
import {
	getFacility,
	getFacilityAll,
	getProliferator,
	getProliferatorAll,
	getRecipe,
	getRecipeAll,
} from "~database/get";
import { Editor } from "~pages/Editor";
import { ConfigFormData } from "~types/query";
import { theme } from "./theme";

export const App: FC = () => {
	const [isBusy, setIsBusy] = useState(true);

	const f = useRef<Facility | undefined>();
	const r = useRef<Recipe | undefined>();
	const p = useRef<Proliferator | undefined>();
	const fOpt = useRef<Facility[] | undefined>();
	const rOpt = useRef<Recipe[] | undefined>();
	const pOpt = useRef<
		Proliferator[] | undefined
	>();

	useEffect(() => {
		(async () => {
			fOpt.current = await getFacilityAll();
			rOpt.current = await getRecipeAll();
			pOpt.current = await getProliferatorAll();

			const fLabel =
				localStorage.getItem("f") ??
				"Arc Smelter";
			const nextF = await getFacility(fLabel);
			if (nextF !== undefined) {
				f.current = nextF;
			}
			const rLabel =
				localStorage.getItem("r") ??
				"Copper Ingot";
			const nextR = await getRecipe(rLabel);
			if (nextR !== undefined) {
				r.current = nextR;
			}
			const pLabel =
				localStorage.getItem("p") ?? "None";
			const nextP = await getProliferator(pLabel);
			if (nextP !== undefined) {
				p.current = nextP;
			}
			setIsBusy(false);
		})();
	}, []);

	if (
		isBusy ||
		f.current === undefined ||
		r.current === undefined ||
		p.current === undefined ||
		fOpt.current === undefined ||
		rOpt.current === undefined ||
		pOpt.current === undefined
	) {
		return <CircularProgress />;
	}

	const query: ConfigFormData = {
		f: f.current,
		r: r.current,
		p: p.current,
		pSprayCount:
			localStorage.getItem("pSprayCount") ??
			p.current.sprayCount.toString(),
		s: JSON.parse(
			localStorage.getItem("flowrate") ?? "",
		) ?? {
			"Sorter Mk.I": "0",
			"Sorter Mk.II": "0",
			"Sorter Mk.III": "0",
			"Pile Sorter": "0",
		},
		capacity: {},
		constraint: {},
		flowrate:
			JSON.parse(
				localStorage.getItem("flowrate") ?? "",
			) ?? {},
	};

	const options = {
		f: fOpt.current,
		r: rOpt.current,
		p: pOpt.current,
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Editor
				init={query}
				options={options}
			/>
		</ThemeProvider>
	);
};
