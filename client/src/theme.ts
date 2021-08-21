import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core";

export const appTheme = createMuiTheme({
	typography: {
		fontFamily: [
			"Segoe UI",
			"sans-serif"
		].join(","),
		button: {
			textTransform: "none"
		}
	},
	palette: {
		primary: {
			main: "#61dbfb"
		},
		secondary: {
			main: "#61dbfb"
		}
	}
});