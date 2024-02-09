import { useEffect, useState } from "react";

export const useContent = (
	initValue: string,
	storageKey: string,
) => {
	const [content, setContent] = useState<string>(
		() => {
			const savedValue =
				localStorage.getItem(storageKey);
			if (savedValue === null) {
				return initValue;
			}
			try {
				return JSON.parse(savedValue);
			} catch {
				return initValue;
			}
		},
	);

	useEffect(() => {
		localStorage.setItem(
			storageKey,
			JSON.stringify(content),
		);
	}, [storageKey, content]);

	return { content, setContent };
};
