import { Facility } from "@eurydos/dsp-item-registry";
import { db } from "database";

export const getFacility = async (
	label: string,
): Promise<Facility | undefined> => {
	const item = await db.get("facilities", label);
	return item;
};

export const getFacilityAll = async (): Promise<
	Facility[]
> => {
	const items = await db.getAll("facilities");
	return items;
};
