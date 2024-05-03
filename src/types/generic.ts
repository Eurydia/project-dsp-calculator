import { ReactNode } from "react";

export type InfoDefinition<T> = {
	icon: ReactNode;
	label: string;
	render: (t: T) => ReactNode;
};
