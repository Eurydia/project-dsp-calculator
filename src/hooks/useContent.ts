import {
	Dispatch,
	SetStateAction,
	useEffect,
	useState,
} from "react";

export const useContent = (
	key: string,
	init: string,
): [string, Dispatch<SetStateAction<string>>] => {
	const [content, setContent] = useState(() => {
		const jsonString: string | null =
			localStorage.getItem(key);
		if (jsonString === null) {
			return init;
		}
		try {
			return jsonString;
		} catch {
			return init;
		}
	});

	useEffect(() => {
		localStorage.setItem(key, content);
	}, [key, content]);

	return [content, setContent];
};
