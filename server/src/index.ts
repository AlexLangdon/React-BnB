import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import imageUpload from "./routes/image-upload";
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
app.use(express.static("public"));

// Allow CORS for local UI requests
// Has to be declared before all route definitions
app.use(cors({ origin: "http://localhost:3000" }));

// Routes
app.use("/api/rentals", rentalRouter);
app.use("/api/users", userRouter);
app.use("/api/image-upload", imageUpload);

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