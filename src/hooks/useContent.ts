import { useEffect, useState } from "react";

export const useContent = (
	init: string,
	key: string,
) => {
	const [content, setContent] = useState(init);

	useEffect(() => {
		const jsonString: string | null =
			localStorage.getItem(key);
		if (jsonString === null) {
			return;
		}
		try {
			setContent(jsonString);
		} catch {}
	}, []);

	useEffect(() => {
		localStorage.setItem(key, content);
	}, [key, content]);

	return { content, setContent };
};
