import { getFacilityAll } from "database/get";
import { useEffect, useState } from "react";

export const useFacilityOptions = ():
	| string[]
	| undefined => {
	const [options, setOptions] = useState<
		string[] | undefined
	>(undefined);
	useEffect(() => {
		(async () => {
			const req = await getFacilityAll();
			const opts = req.map(({ label }) => label);
			opts.sort();
			setOptions(opts);
		})();
	}, []);
	return options;
};
