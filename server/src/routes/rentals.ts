import express, { Router } from "express";
import { RentalModel } from "../models/rental";
import { CreateRentalRequest } from "react-bnb-common";

const router: Router = express.Router();

router.get("/", async (req, res) => {
	const { city } = req.query;
	const query = typeof city === "string" ? { city } : {};

	const allRentals = await RentalModel
		.find(query)
		.populate("image");
	return res.json(allRentals);
});

router.get("/:rentalId", async (req, res) => {
	const { rentalId } = req.params;
	const matchingRental = await RentalModel
		.findById(rentalId)
		.populate("image");
	return res.json(matchingRental);
});

router.post("/create", (req, res) => {
	const rentalData: CreateRentalRequest = req.body;
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