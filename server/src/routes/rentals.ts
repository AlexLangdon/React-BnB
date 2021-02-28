import express from "express";

const router = express.Router();

router.get("/", (_, res) => {
	return res.json([
		{
			id: "1000",
			title: "Modern apartment in city center",
			city: "NYC",
			category: "Apartment",
			imageSrc: "http://via.placeholder.com/300x200",
			numRooms: 1,
			shared: false,
			description: "Stylish third floor apartment in the heart of London",
			dailyPrice: 100,
			amenities: [
				"Air Conditioning",
				"Dishwasher",
				"Dryer",
				"Free Breakfast",
				"Free Parking",
				"Fridge Freezer",
				"Heating",
				"Washing Machine",
				"Wifi",
				"Work Area"
			]
		},
		{
			id: "1001",
			title: "Modern apartment in city center 2",
			city: "NYC",
			category: "Apartment",
			imageSrc: "http://via.placeholder.com/300x200",
			numRooms: 1,
			shared: false,
			description: "Stylish third floor apartment in the heart of London",
			dailyPrice: 100,
			amenities: [
				"Air Conditioning",
				"Dishwasher",
				"Dryer",
				"Free Breakfast",
				"Free Parking",
				"Fridge Freezer",
				"Heating",
				"Washing Machine",
				"Wifi",
				"Work Area"
			]
		}
	]);
});

export default router;