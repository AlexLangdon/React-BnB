
import express, { Router } from "express";
import jwt from "jsonwebtoken";
import { User } from "react-bnb-common";
import { JWT_SECRET } from "../config";

const router: Router = express.Router();

const mockUser: User = {
	id: "mock-id",
	username: "mock-username",
	email: "mock-email",
	password: "mock-password"
};

router.get("/", (_, res) => {
	const token = jwt.sign({
		sub: mockUser.id,
		username: mockUser.username
	}, JWT_SECRET, { expiresIn: "2m" });

	return res.json(token);
});

export default router;