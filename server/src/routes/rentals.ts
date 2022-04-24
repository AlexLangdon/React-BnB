import express, { Router } from "express";
import { RentalModel } from "../models/rental";
import { CreateRentalRequest } from "react-bnb-common";
import { allowOnlyAuthUser } from "../controller/user";

const router: Router = express.Router();

router.get("/", async (req, res) => {
	const { city } = req.query;
	const query = typeof city === "string" ? { city } : {};
	const rentals = await RentalModel
		.find(query)
		.populate("image");
	return res.json(rentals);
});

router.get("/mine", allowOnlyAuthUser, async (_, res) => {
	const { user } = res.locals;
	const query = {owner: user};
	const rentals = await RentalModel
		.find(query)
		.populate("image");
	return res.json(rentals);
});

router.get("/:rentalId", async (req, res) => {
	const { rentalId } = req.params;
	const matchingRental = await RentalModel
		.findById(rentalId)
		.populate("image");
	return res.json(matchingRental);
});

router.post("/create", allowOnlyAuthUser, (req, res) => {
	const reqData: CreateRentalRequest = req.body;
	const rentalData = {
		...reqData,
		owner: res.locals.user
	};
	RentalModel.create(rentalData, (error, createdRental) => {
		if(error) {
			console.error("/create ERROR", error);
			return res
				.status(422)
				.send({
					errors: [{
						title: error.name,
						detail: error.message
					}]
				});
		}

		return res.json(createdRental);
	});
});

export default router;