import { Button, FormGroup, TextField } from "@material-ui/core";
import axios from "axios";
import { useAuth } from "providers/AuthProvider";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { ApiError } from "../../../common";
import "./FormPage.scss";

interface LogInFormValues {
	email: string;
	password: string;
}

export default function LogInPage(): JSX.Element {
	const { register, handleSubmit, errors } = useForm();
	const history = useHistory();
	const [apiErrors, setApiErrors] = useState<Array<ApiError>>([]);
	const auth = useAuth();

	const onSubmit: SubmitHandler<LogInFormValues> = (data: LogInFormValues) => {
		axios.post("/api/users/login", data)
			.then(resp => {
				auth?.saveLocalUserToken(resp.data);
				history.push("/");
			})
			.catch(error => {
				console.error(error);
				const errors = error.response?.data.errors ?? [{
					title: error.name, 
					detail: error.message
				}];
				setApiErrors(errors);
			});
	};

	return (
		<div className="container pt-5">
			<div className="row justify-content-center">
				<form onSubmit={handleSubmit(onSubmit)} className="col-md-6 col-lg-5 mb-4">
					<h2>Log In</h2>
					<FormGroup>
						<TextField id="email" name="email" label="Email" type="email"
							variant="outlined" className="mt-3"
							error={!!errors.email} helperText={errors?.email?.message}
							inputRef={register({
								required: "Email is required",
								pattern: {
									value: /^\S+@\S+$/i,
									message: "Invalid email format"
								}
							})} />
						<TextField id="password" name="password" label="Password" type="password"
							variant="outlined" className="mt-3"
							error={!!errors.password} helperText={errors?.password?.message}
							inputRef={register({ required: "Password is required" })} />
					</FormGroup>
					{apiErrors.map(error => <div key={error.title} className="alert alert-danger">{error.detail}</div>)}
					<Button type="submit" color="primary" variant="contained" className="mt-3">
						Log In
					</Button>
				</form>
				<div className="col-md-6 col-lg-5">
					<h2 className="catchphrase">Locations across the world in just a few clicks</h2>
					<img className="decoration" src="images/log-in-image.jpg" alt="decoration" />
				</div>
			</div>
		</div>
	);
}