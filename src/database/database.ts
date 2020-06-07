import Mongoose = require("mongoose");
import { UserModel } from "./users/usersModel";

let database: Mongoose.Connection;

export const connect = () => {
	const uri = "mongodb://localhost:27017";
	const dbName = "stocksim";

	if (database) {
		return;
	}

	Mongoose.connect(uri, {
		useNewUrlParser: true,
		useFindAndModify: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		dbName: dbName,
	});
	database = Mongoose.connection;

	database.once("open", async () => {
		console.log("Connected to database");
	});

	database.on("error", () => {
		console.log("Error connecting to database");
	});
};

export const disconnect = () => {
	if (!database) {
		return;
	}
	Mongoose.disconnect();
};
