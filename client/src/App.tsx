import { MuiThemeProvider } from "@material-ui/core";
import { LocalizationProvider } from "@material-ui/pickers";
import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";
import RentalDetail from "components/RentalDetail/RentalDetail";
import NewRentalPage from "pages/NewRentalPage";
import { AuthProvider } from "providers/AuthProvider";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import store from "store/store";
import "./App.css";
import Header from "./components/common/Header/Header";
import LogInPage from "./pages/LogInPage";
import RentalHomePage from "./pages/RentalHomePage/RentalHomePage";
import SignUpPage from "./pages/SignUpPage";
import { appTheme } from "./theme";

function App(): JSX.Element {
	return (
		<div className="App">
			<Provider store={store}>
				<BrowserRouter>
					<LocalizationProvider dateAdapter={DateFnsUtils}>
						<MuiThemeProvider theme={appTheme}>
							<AuthProvider>
								<Header />
								<Switch>
									<Route path="/" exact component={RentalHomePage} />
									<Route path="/rentals/:location" component={RentalHomePage} />
									<Route path="/signup" component={SignUpPage} />
									<Route path="/rental/:rentalId" component={RentalDetail} />
									<Route path="/login" component={LogInPage} />
									<Route path="/new-rental" component={NewRentalPage} />
								</Switch>
							</AuthProvider>
						</MuiThemeProvider>
					</LocalizationProvider>
				</BrowserRouter>
			</Provider>
		</div>
	);
}

export default App;
