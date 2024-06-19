import {
	CssBaseline,
	ThemeProvider,
} from "@mui/material";
import { FC } from "react";
import {
	RouterProvider,
	createHashRouter,
} from "react-router-dom";
import { Editor } from "~pages/Editor";
import { theme } from "./theme";

const router = createHashRouter([
	{
		path: "/",
		element: <Editor />,
	},
]);

export const App: FC = () => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<RouterProvider router={router} />
		</ThemeProvider>
	);
};
