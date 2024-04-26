import {
	CssBaseline,
	ThemeProvider,
} from "@mui/material";
import { FC } from "react";

import { Editor } from "~pages/Editor";
import { theme } from "./theme";

export const App: FC = () => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Editor />
		</ThemeProvider>
	);
};
