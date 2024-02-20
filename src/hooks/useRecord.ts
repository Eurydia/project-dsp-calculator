import { useEffect, useState } from "react";

export const useRecord = (
	initValue: Record<string, string>,
	storageKey: string,
) => {
	const [content, setContent] = useState<
		Record<string, string>
	>(() => {
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
	});

	useEffect(() => {
		localStorage.setItem(
			storageKey,
			JSON.stringify(content),
		);
	}, [content, storageKey]);

	const resetContent = (
		labels: string[],
		value: string,
	) => {
		const nextRecord: Record<string, string> = {};
		for (const label of labels) {
			nextRecord[label] = value;
		}
		setContent(nextRecord);
	};

	return { content, setContent, resetContent };
};
