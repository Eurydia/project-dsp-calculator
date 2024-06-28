import { useState } from "react";

/**
 * @version 2.6.0
 * @description
 * A generic hook for strings.
 * Whenever the state changes, the new state is also saved to local storage using the given key.
 *
 * I can probably use useEffect hook to archieve the same result, but this implementation is nice, concise and readable, so there is no incentive to refactor for now.
 */
export const useString = (
	key: string,
	init: string,
): [string, (next: string) => void] => {
	const [item, setItem] = useState(init);

	const handleChange = (next: string) => {
		setItem(next);
		localStorage.setItem(key, next);
	};

	return [item, handleChange];
};
