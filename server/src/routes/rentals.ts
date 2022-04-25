import express, { Router } from "express";
import { RentalModel } from "../models/rental";
import { CreateRentalRequest } from "react-bnb-common";
import { allowOnlyAuthUser } from "../controller/user";
import { BookingModel } from "../models/booking";

const router: Router = express.Router();

router.get("/", async (req, res) => {
	const { city } = req.query;
	const query = typeof city === "string" ? { city } : {};
	const rentals = await RentalModel
		.find(query)
		.populate("image")
		.populate("owner", "username email");
	return res.json(rentals);
});

router.get("/mine", allowOnlyAuthUser, async (_, res) => {
	const { user } = res.locals;
	const query = {owner: user};
	const rentals = await RentalModel
		.find(query)
		.populate("image")
		.populate("owner", "username email");
	return res.json(rentals);
});

router.get("/:rentalId", async (req, res) => {
	const { rentalId } = req.params;
	const matchingRental = await RentalModel
		.findById(rentalId)
		.populate("image")
		.populate("owner", "username email");
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

		const fullRental = createdRental
			.populate("image")
			.populate("owner", "username email");

		return res.json(fullRental);
	});
});

router.delete("/:rentalId", allowOnlyAuthUser, async (req, res) => {
	const { rentalId } = req.params;
	const { user } = res.locals;

	try {
		const rental = await RentalModel.findById(rentalId)
			.populate("owner", "username email");

		if(!rental) {
			return res
				.status(404)
				.send({
					errors: [{
						title: "Invalid rental ID!", 
						detail: "Specified rental cannot be found!"
					}]
				});
		}

		if(!rental.owner.equals(user)) {
			return res
				.status(401)
				.send({
					errors: [{
						title: "Unauthorized operation!", 
						detail: "Not authorized to perform this operation on the given object!"
					}]
				});
		}

		await rental.remove();
		await BookingModel.deleteMany({rental: rental._id}); 		

		return res.json(rental);
	} catch {
		return res.status(500);
	}
});

export default router;