// Count the number of used connection slot

import { safeParseClamp } from "./parsing";

/**
 *
 * @param key
 * @param available
 * @param sorterRec
 * @returns
 */
export const getAvailableConnection = (
	key: string,
	available: number,
	sorterRec: Record<string, string>,
): number => {
	let takenConnection = 0;
	for (const [k, v] of Object.entries(
		sorterRec,
	)) {
		if (k === key) {
			continue;
		}
		takenConnection += safeParseClamp(
			v,
			0,
			takenConnection,
		);
	}
	return available - takenConnection;
};
