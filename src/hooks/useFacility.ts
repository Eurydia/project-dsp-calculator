import { Dispatch, SetStateAction } from "react";
import { useContent } from "./useContent";

export const useFacility = (
	storeKey: string,
	init: string = "Arc Smelter",
): [string, Dispatch<SetStateAction<string>>] => {
	const [item, setItem] = useContent(
		storeKey,
		init,
	);
	// const [f, setF] = useState<Facility>({
	// 	cycleMultiplier: 1,
	// 	connectionCount: 0,
	// 	idleConsumptionMW: 0,
	// 	workConsumptionMW: 0,
	// 	label: "Uhoh",
	// 	recipeType: "Unknown",
	// });

	// useEffect(() => {
	// 	(async () => {
	// 		const item = await getFacility(label);
	// 		if (item === undefined) {
	// 			return;
	// 		}
	// 		setF(item);
	// 		setLabel(item.label);
	// 	})();
	// }, []);

	return [item, setItem];
};
