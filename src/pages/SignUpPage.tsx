import { Button, FormGroup, TextField } from "@material-ui/core";
import React from "react";
import "./FormPage.scss";

export default function SignUpPage(): JSX.Element {
	return (
		<div className="container pt-5">
			<div className="row justify-content-center">
				<form className="col-md-6 col-lg-5 mb-4">
					<h2>Sign Up</h2>
					<FormGroup>
						<TextField label="Username" type="text" variant="outlined" className="mt-3" />
						<TextField label="Email" type="email" variant="outlined" className="mt-3" />
						<TextField label="Password" type="password" variant="outlined" className="mt-3" />
						<TextField label="Confirm Password" type="password" variant="outlined" className="mt-3" />
					</FormGroup>
					<Button type="submit" color="primary" variant="contained" className="mt-3">Sign Up</Button>
				</form>
				<div className="col-md-6 col-lg-5">
					<h2 className="catchphrase">Locations across the world in just a few clicks</h2>
					<img className="decoration" src="images/sign-up-image.jpg" alt="decoration" />
				</div>
			</div>
		</div>
	);
}
