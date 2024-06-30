import {
	Dispatch,
	SetStateAction,
	useEffect,
	useState,
} from "react";

/**
 * @version 2.5.0
 * @description
 * A hook for handling string-string records.
 * It provides simplified APIs for interating with the record.
 *
 * It also saves the record to local storage whenever it is modified.
 *
 */
export const useRecord = (
	key: string,
	init: Record<string, string>,
): [
	Record<string, string>,
	(k: string, v: string) => void,
	Dispatch<
		SetStateAction<Record<string, string>>
	>,
] => {
	const [record, setRecord] = useState(init);
	useEffect(() => {
		localStorage.setItem(
			key,
			JSON.stringify(record),
		);
	}, [record]);

	/**
	 * @version 2.6.0
	 * @description
	 * Modifies the value of the given key and saves the updated record to local storage.
	 */
	const handleUpdate = (k: string, v: string) => {
		setRecord((prev) => {
			const next = { ...prev };
			next[k] = v;
			return next;
		});
	};

	return [record, handleUpdate, setRecord];
};
