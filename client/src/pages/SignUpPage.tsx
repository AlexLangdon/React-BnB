import { Button, FormGroup, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { ApiError } from "react-bnb-common";
import "./FormPage.scss";
import axios from "axios";

interface SignUpFormValues {
	username: string;
	email: string;
	password: string;
}

export default function SignUpPage(): JSX.Element {
	const { register, handleSubmit, errors, getValues } = useForm();
	const history = useHistory();
	const [apiErrors, setApiErrors] = useState<Array<ApiError>>([]);

	const onSubmit: SubmitHandler<SignUpFormValues> = (data: SignUpFormValues) => {
		const request: SignUpFormValues = {
			username: data.username,
			email: data.email,
			password: data.password
		};

		axios.post("/api/users/register", request)
			.then(resp => {
				history.push("/login");
			})
			.catch(error => { 
				console.error(error.response);
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
					<h2>Sign Up</h2>
					<FormGroup>
						<TextField id="username" name="username" label="Username" type="text"
							variant="outlined" className="mt-3"
							error={!!errors.username} helperText={errors?.username?.message}
							inputRef={register({
								required: "Username is required",
								minLength: {
									value: 4,
									message: "Username must be at least 4 characters"
								}
							})} />
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
							inputRef={register({
								required: "Password is required",
								minLength: {
									value: "8",
									message: "Password must be at least 8 characters in length"
								}
							})} />
						<TextField id="passwordConfirm" name="passwordConfirm" label="Confirm Password"
							type="password" variant="outlined" className="mt-3"
							error={!!errors.passwordConfirm} helperText={errors?.passwordConfirm?.message}
							inputRef={register({
								validate: (value: string) => (
									value === getValues("password") || "Password confirmation must match password"
								)
							})} />
						{apiErrors.map(error => <div key={error.title} className="alert alert-danger">{error.detail}</div>)}
					</FormGroup>
					<Button type="submit" color="primary" variant="contained" className="mt-3">
						Sign Up
					</Button>
				</form>
				<div className="col-md-6 col-lg-5">
					<h2 className="catchphrase">Locations across the world in just a few clicks</h2>
					<img className="decoration" src="images/sign-up-image.jpg" alt="decoration" />
				</div>
			</div>
		</div>
	);
}
