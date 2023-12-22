import { createTheme } from "@mui/material";

export const theme = createTheme({
	typography: {
		fontFamily: ["Fira Code", "monospace"].join(
			",",
		),
	},
	components: {
		MuiTypography: {
			styleOverrides: {
				root: {
					userSelect: "none",
				},
			},
		},
	},
	palette: {
		mode: "dark",
	},
});
