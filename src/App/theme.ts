import {
	alpha,
	createTheme,
} from "@mui/material";

export const theme = createTheme({
	components: {
		MuiTypography: {
			styleOverrides: {
				root: {
					"userSelect": "none",
					"&.MuiTypography-h1": {
						fontSize: "1.4rem",
						fontWeight: "500",
						color: "#C8AA81",
					},
					"&.MuiTypography-h2": {
						fontSize: "1.2rem",
						fontWeight: "400",
						color: "#C8AA81",
					},
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					"&.MuiTableCell-head": {
						color: "#C8AA81",
					},
				},
			},
		},
		MuiList: {
			styleOverrides: {
				root: {
					"&.MuiList-subheader": {
						color: "#C8AA81",
					},
				},
			},
		},
		MuiListItemIcon: {
			styleOverrides: {
				root: { color: "#CEB697" },
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: { color: "#7ABBAD" },
			},
		},
		MuiListItemText: {
			styleOverrides: {
				root: ({ theme: t }) => {
					return {
						color: t.palette.text.primary,
					};
				},
			},
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
		background: {
			paper: "#181D22",
		},
	},
});
