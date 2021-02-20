import express from "express";

const app = express();
const port = 4000;
app.get("/api/rentals", (_, res) => {
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
		}
	]);
});
app.listen(port, () => {
	return console.log(`server is listening on ${port}`);
});