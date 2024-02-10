import { FC } from "react";
import {
	ThemeProvider,
	CssBaseline,
	Divider,
	Stack,
} from "@mui/material";

import { theme } from "./theme";
import { Editor } from "App/pages/Editor";
import { About } from "App/pages/About";

export const App: FC = () => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Stack divider={<Divider flexItem />}>
				<Editor />
				<About />
			</Stack>
		</ThemeProvider>
	);
};
