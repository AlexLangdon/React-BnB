import { AppBar, Button, InputAdornment, TextField, Toolbar, Typography, Menu, MenuItem, List, ListItem, ListItemText, SwipeableDrawer, IconButton, ListItemIcon } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddBoxIcon from "@material-ui/icons/AddBox";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import MenuIcon from "@material-ui/icons/Menu";
import CollectionsIcon from "@material-ui/icons/Collections";
import LocalActivityIcon from "@material-ui/icons/LocalActivity";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { ReactComponent as Logo } from "images/logo.svg";
import { useAuth } from "providers/AuthProvider";
import React, { useEffect } from "react";
import { Link, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import "./Header.scss";

interface HeaderRouteMatch {
	locationString: string;
}

export default function Header(): JSX.Element {
	const auth = useAuth();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleManageClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
  
	const handleManageClose = () => {
		setAnchorEl(null);
	};

	const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);

	const [locationSearch, setLocationSearch] = React.useState("");
	const routeMatch = useRouteMatch<HeaderRouteMatch>("/rentals/:locationString");
	const location = useLocation();
	useEffect(() => {
		// Set search bar string from URL params when opening a rentals search URL
		// Clear the search bar when navigating away from rentals search page
		setLocationSearch(routeMatch?.params.locationString ?? "");
	}, [routeMatch?.params.locationString, location]);

	const history = useHistory();
	const handleSearch = () => {
		history.push(`/rentals/${locationSearch}`);
	};
	const logout = () => {
		auth.removeLocalUserToken();
		history.push("/");
	};
	
	return <AppBar position="static">
		<Toolbar className="toolbar d-flex">
			<div className="flex-column flex-grow-1 mx-auto col-xl-9 px-0 px-md-2">
				<div className="d-flex flex-grow-1 justify-content-between mt-2 mt-md-0">
					<Logo className="logo my-auto" />
					<Button color="inherit" size="small" className="py-0 px-2">
						<Typography variant="h6" color="secondary" className="title d-none d-sm-block">
							<Link to="/">React BnB</Link>
						</Typography>
						<Typography variant="subtitle1" color="secondary" className="title d-block d-sm-none font-500">
							<Link to="/">React BnB</Link>
						</Typography>
					</Button>
					<div className="d-none d-md-flex my-auto">
						<TextField size="small" className="search-field mx-2" placeholder="Search"
							variant="outlined" InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								)
							}}
							value={locationSearch}
							onChange={(e) => setLocationSearch(e.target.value)}
						/>
						<Button className="search-button" color="secondary" variant="outlined" onClick={handleSearch}>
							Search
						</Button>
					</div>
					{
						auth?.isAuthenticated ?
						<>
							<div className="ml-sm-auto header-links d-none d-lg-block">
								<div className="user-name mr-sm-3">{auth.getUserName()}</div>
								<Button className="mr-1" color="inherit" variant="outlined" 
									onClick={handleManageClick} endIcon={<ArrowDropDownIcon />}>
									Manage
								</Button>
								<Menu
									anchorEl={anchorEl}
									keepMounted
									open={Boolean(anchorEl)}
									onClose={handleManageClose}
									getContentAnchorEl={null}
									anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
									transformOrigin={{ vertical: "top", horizontal: "left" }}
								>
									<MenuItem onClick={handleManageClose}><a href="/new-rental">New Rental</a></MenuItem>
									<MenuItem onClick={handleManageClose}><a href="/manage-rentals">Manage Rentals</a></MenuItem>
									<MenuItem onClick={handleManageClose}><a href="/manage-bookings">Manage Bookings</a></MenuItem>
									<MenuItem onClick={handleManageClose}><a href="/received-bookings">Received Bookings</a></MenuItem>
								</Menu>
								<Button color="inherit" variant="outlined" onClick={logout}>Log out</Button>
							</div>
							<div className="d-block d-lg-none">
								<IconButton onClick={() => setDrawerOpen(true)} aria-label="menu" color="primary">
									<MenuIcon />
								</IconButton>
								<SwipeableDrawer
									anchor={"right"}
									open={drawerOpen}
									onClose={() => setDrawerOpen(false)}
									onOpen={() => setDrawerOpen(true)}
								>
									<div
										role="presentation"
										onClick={() => setDrawerOpen(false)}
										onKeyDown={() => setDrawerOpen(false)}
									>
										<List>
											<ListItem button key="new-rental" component="a" href="/new-rental">
													<ListItemIcon><AddBoxIcon /></ListItemIcon>
													<ListItemText primary="New Rental" />
											</ListItem>
											<ListItem button key="manage-rentals" component="a" href="/manage-rentals">
													<ListItemIcon><CollectionsIcon /></ListItemIcon>
													<ListItemText primary="Manage Rentals" />
											</ListItem>
											<ListItem button key="manage-bookings" component="a" href="/manage-bookings">
													<ListItemIcon><LocalActivityIcon /></ListItemIcon>
													<ListItemText primary="Manage Bookings" />
											</ListItem>
											<ListItem button key="received-bookings" component="a" href="/received-bookings">
													<ListItemIcon><EventAvailableIcon /></ListItemIcon>
													<ListItemText primary="Received Bookings" />
											</ListItem>
											<ListItem button key="log-out" onClick={logout}>
												<ListItemIcon><ExitToAppIcon /></ListItemIcon>
												<ListItemText primary="Log Out" />
											</ListItem>
										</List>
									</div>
								</SwipeableDrawer>
							</div>
						</>
						:
						<div className="ml-auto header-links">
							<Button className="mr-1 h-100" color="inherit" size="small" variant="outlined">
								<Link to="/login">Log In</Link>
							</Button>
							<Button className="h-100" color="inherit" size="small" variant="outlined">
								<Link to="/signup">Sign Up</Link>
							</Button>
						</div>
					}
				</div>
				<div className="d-flex d-md-none my-2">
					<TextField size="small" className="search-field flex-grow-1 mr-2"
						placeholder="Search" variant="outlined" InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							)
						}}
						onChange={(e) => setLocationSearch(e.target.value)}
					/>
					<Button className="search-button" color="secondary" variant="outlined" onClick={handleSearch}>
						Search
					</Button>
				</div>
			</div>
		</Toolbar>
	</AppBar>;
}