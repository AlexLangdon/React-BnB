import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import config from "./config";
import rentalRouter from "./routes/rentals";
import userRouter from "./routes/users";

const app = express();
const port = process.env.PORT || 4000;

mongoose.connect(config.DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
}, () => {
	console.log("Connected to Database");
});

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/rentals", rentalRouter);
app.use("/api/users", userRouter);

// Has to be declared last due to the wildcard get
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