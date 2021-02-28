import express from "express";
import path from "path";
import router from "./routes/rentals";

const app = express();
const port = process.env.PORT || 4000;

if (process.env.NODE_ENV === "production") {
	const buildPath = path.join(__dirname, "../../client/build");
	app.use(express.static(buildPath));
	app.get("*", (_, res) => {
		return res.sendFile(path.resolve(buildPath, "index.html"));
	});
}

// Routes
app.use("/api/rentals", router);

app.listen(port, () => {
	return console.log(`server is listening on ${port}`);
});