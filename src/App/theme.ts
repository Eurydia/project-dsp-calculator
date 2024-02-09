import {
	alpha,
	createTheme,
} from "@mui/material";

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
		text: {
			primary: alpha("#fff", 0.87),
		},
	},
});
