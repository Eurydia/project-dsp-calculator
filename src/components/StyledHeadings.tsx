import {
	Typography,
	styled,
} from "@mui/material";

export const StyledHeadingA = styled(Typography)(
	({ theme }) => ({
		fontWeight: "600",
		fontSize: "x-large",
		color: theme.palette.secondary.main,
	}),
);
export const StyledHeadingB = styled(Typography)(
	({ theme }) => ({
		fontWeight: "500",
		fontSize: "large",
		color: theme.palette.secondary.main,
	}),
);
export const StyledSubtitle = styled(Typography)({
	fontSize: "small",
	fontWeight: "400",
});
