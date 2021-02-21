import express from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 4000;
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


if (process.env.NODE_ENV === "production") {
	const buildPath = path.join(__dirname, "../../client/build");
	app.use(express.static(buildPath));
	app.get("*", (_, res) => {
		return res.sendFile(path.resolve(buildPath, "index.html"));
	});
}

app.listen(port, () => {
	return console.log(`server is listening on ${port}`);
});