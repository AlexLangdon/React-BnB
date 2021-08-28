import express, { Router } from "express";
import { RentalModel } from "../models/rental";
import { CreateRentalRequest } from "react-bnb-common";

const router: Router = express.Router();

router.get("/", async (_, res) => {
	const allRentals = await RentalModel.find({});
	return res.json(allRentals);
});

router.get("/:rentalId", async (req, res) => {
	const { rentalId } = req.params;
	const matchingRental = await RentalModel.findById(rentalId);
	return res.json(matchingRental);
});

router.post("/create", (req, res) => {
	console.log("!!!", req);
	const reqBody: CreateRentalRequest = req.body;
	const rentalAdd = new RentalModel(reqBody);

	rentalAdd.save((error) => {
		if (error) {
			console.error("ERROR", error);
			return res
				.status(422)
				.send({error});
		}

		return res.json({status: "created"});
	});
});

export default router;