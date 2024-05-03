import {
	alpha,
	createTheme,
} from "@mui/material";

export const theme = createTheme({
	components: {
		MuiCssBaseline: {
			styleOverrides: `img {
					loading: lazy;
					width: auto;
					height: 40px;
			}`,
		},
	},
	palette: {
		mode: "dark",
		text: {
			primary: alpha("#fff", 0.87),
		},
		primary: {
			main: "#7ABBAD",
		},
		secondary: {
			main: "#C8AA81",
		},
		background: {
			paper: "#181D22",
		},
	},
});
