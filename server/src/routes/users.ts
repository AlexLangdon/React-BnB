import express, { Router } from "express";
import jwt from "jsonwebtoken";
import { CreateUserRequest, LoginUserRequest } from "react-bnb-common";
import config from "../config";
import { UserDocument, UserModel } from "../models/user";

const router: Router = express.Router();

router.post("/login", (req, res) => {
	const { email, password }: LoginUserRequest = req.body;

	UserModel.findOne({ email }, (error: any, foundUser: UserDocument) => {
		if (error) {
			return error;
		}
		
		if(foundUser?.hasSamePassword(password)) {
			const token = jwt.sign({
				sub: foundUser.id,
				username: foundUser.username
			}, config.JWT_SECRET, { expiresIn: "10m" });
	
			return res.json(token);
		}

		return res.json({
			title: "Invalid login",
			detail: "Login details are incorrect"
		});
	});
});

router.post("/register", (req, res) => {
	const { email, password, username }: CreateUserRequest = req.body;

	const userAdd = new UserModel({
		username,
		email,
		password
	});

	userAdd.save((error) => {
		if (error) {
			console.error("ERROR", error);
			return res
				.status(422)
				.send({error});
		}

		return res.json({status: "registered"});
	});

	
});

export default router;