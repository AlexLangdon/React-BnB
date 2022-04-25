import express, { Router } from "express";
import jwt from "jsonwebtoken";
import { CallbackError } from "mongoose";
import { CreateUserRequest, LoginUserRequest } from "react-bnb-common";
import config from "../config";
import { UserDocument, UserModel } from "../models/user";

const router: Router = express.Router();

router.post("/login", (req, res) => {
	const { email, password }: LoginUserRequest = req.body;

	return UserModel.findOne({email}, (error: CallbackError, foundUser: UserDocument) => {
		if (error) {
			return error;
		}
		
		if(foundUser?.hasSamePassword(password)) {
			const token = jwt.sign({
				sub: foundUser.id,
				username: foundUser.username
			}, config.JWT_SECRET, { expiresIn: "12h" });
	
			return res.json(token);
		}

		return res
			.status(422)
			.send({
				errors: [
					{
						title: "Invalid login",
						detail: "Login details are incorrect"
					}
				]
			});
	});
});

router.post("/register", (req, res) => {
	const { email, password, username }: CreateUserRequest = req.body;

	if(!email || !password) {
		return res
			.status(422)
			.send({
				errors: [
					{
						title: "Missing data",
						detail: "Must provide an email and password"
					}
				]
			});
	}

	if(password.length < 8) {
		return res
			.status(422)
			.send({
				errors: [
					{
						title: "Invalid Password",
						detail: "Password must be at least 8 characters"
					}
				]
			});
	}

	if(username.length < 4) {
		return res
			.status(422)
			.send({
				errors: [
					{
						title: "Invalid Username",
						detail: "Username must be at least 4 characters"
					}
				]
			});
	}

	return UserModel.findOne({email}, async (error: CallbackError, foundUser: UserDocument) => {
		if (error) {
			return error;
		}

		if(foundUser) {
			return res
				.status(422)
				.send({
					errors: [
						{
							title: "Invalid email",
							detail: "User with provided email already exists"
						}
					]
				});
		}

		const userAdd = new UserModel({
			username,
			email,
			password
		});


		try {
			await userAdd.save();
			return res.json({status: "registered"});
		} catch(saveError) {
			console.error("ERROR SAVING", error);
			return res
				.status(422)
				.send({saveError});
		}		
	});
});

export default router;