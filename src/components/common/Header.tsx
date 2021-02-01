import { AppBar, Button, InputAdornment, TextField, Toolbar, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import { ReactComponent as Logo } from "../../images/logo.svg";
import "./Header.scss";

export default function Header() {
	return <AppBar position="static">
		<Toolbar className="toolbar d-flex">
			<div className="flex-column flex-grow-1">
				<div className="d-flex flex-grow-1 justify-content-between mt-2 mt-md-0">
					<Logo className="logo" />
					<Button color="inherit" size="small" className="py-0 px-2">
						<Typography variant="h6" color="secondary" className="title" >
							React BnB
						</Typography>
					</Button>
					<div className="d-none d-md-block">
						<TextField size="small" className="search-field mx-2" placeholder="Search" variant="outlined" InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						}} />
						<Button className="search-button" color="secondary" variant="outlined">Search</Button>
					</div>
					<div className="ml-auto header-links">
						<Button color="inherit">Log in</Button>
						<Button color="inherit">Sign Up</Button>
					</div>
				</div>
				<div className="d-flex d-md-none my-2">
					<TextField size="small" className="search-field flex-grow-1 mr-2" placeholder="Search" variant="outlined" InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}} />
					<Button className="search-button" color="secondary" variant="outlined">Search</Button>
				</div>
			</div>
		</Toolbar>
	</AppBar>
}