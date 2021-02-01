import { MuiThemeProvider } from "@material-ui/core";
import { LocalizationProvider } from '@material-ui/pickers';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import "./App.css";
import Header from "./components/common/Header";
import { appTheme } from "./theme";

function App() {
	return (
		<div className="App">
			<LocalizationProvider dateAdapter={DateFnsUtils}>
				<MuiThemeProvider theme={appTheme}>
					<Header />
				</MuiThemeProvider>
			</LocalizationProvider>
		</div>
	);
}

export default App;
