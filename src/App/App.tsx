import { FC } from "react";
import {
	ThemeProvider,
	CssBaseline,
} from "@mui/material";

import { theme } from "./theme";
import { Editor } from "components/Editor";

export const App: FC = () => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			<Editor />
		</ThemeProvider>
	);
};
