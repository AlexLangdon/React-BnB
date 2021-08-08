import { Button, FormGroup, TextField } from "@material-ui/core";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "./FormPage.scss";

interface LogInFormValues {
	email: string;
	password: string;
}

export default function LogInPage(): JSX.Element {
	const { register, handleSubmit, errors } = useForm();

	const onSubmit: SubmitHandler<LogInFormValues> = (data: LogInFormValues) => {
		const requestOptions: RequestInit = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data)
		};

		fetch("http://localhost:4000/api/users/login", requestOptions)
			.then(response => response.json())
			.then(json => console.log(json))
			.catch(error => console.error(error));
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