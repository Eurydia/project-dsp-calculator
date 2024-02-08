import { createTheme } from "@mui/material";

export const theme = createTheme({
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
