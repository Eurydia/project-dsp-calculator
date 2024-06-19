import { LoaderFunction } from "react-router-dom";
import { getFacility } from "~database/get";
import {
	ComputeFormData,
	ConfigFormData,
} from "~types/query";

export type LoaderData = {
	configFormData: ConfigFormData;
	computeFormData: ComputeFormData;
};

export const loader: LoaderFunction =
	async () => {
		const fLabel: string =
			localStorage.getItem("facility") ??
			"Arc Smelter";
		const fItem = (await getFacility(fLabel))!;
		console.log("hi");
		return null;
	};
