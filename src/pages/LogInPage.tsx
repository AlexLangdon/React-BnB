import { Button, FormGroup, TextField } from "@material-ui/core";
import React from "react";

export default function LogInPage(): JSX.Element {
	return (
		<div className="container pt-5">
			<div className="row justify-content-center">
				<form className="col-md-6 col-lg-5 mb-4">
					<h2>Log In</h2>
					<FormGroup>
						<TextField label="Email" type="email" variant="outlined" className="mt-3" />
						<TextField label="Password" type="password" variant="outlined" className="mt-3" />
					</FormGroup>
					<Button type="submit" color="primary" variant="contained" className="mt-3">Log In</Button>
				</form>
				<img className="col-md-6 col-lg-5" src="http://via.placeholder.com/400x600" alt="decoration" />
			</div>
		</div>
	);
}
