import {
	CssBaseline,
	ThemeProvider,
} from "@mui/material";
import { Editor } from "pages/Editor/Editor";
import { FC } from "react";
import { theme } from "./theme";

export const App: FC = () => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Editor />
		</ThemeProvider>
	);
};
