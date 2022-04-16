import { Button, InputAdornment, TextField } from "@material-ui/core";
import { AppBar, Toolbar, Typography, Menu, MenuItem, List, ListItem, ListItemText, SwipeableDrawer, IconButton, ListItemIcon } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";
import "./RentalSearchInput.scss";

// TODO Check if this is still needed
export default function RentalSearchInput(): JSX.Element {
    return (
        <div className="d-flex d-md-none my-2">
            <TextField size="small" className="search-field mx-2" placeholder="Search"
                variant="outlined" InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />
            <Button className="search-button" color="secondary" variant="outlined">
                Search
            </Button>
        </div>
    );
}