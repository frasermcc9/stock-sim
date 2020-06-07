import Mongoose = require("mongoose");
import { UserModel } from "./users/usersModel";
import { Client } from "../Client";

let database: Mongoose.Connection;

export const connect = () => {
	//const uri = "mongodb://localhost:27017";
	const uri = Client.getClient().uri;
	//const dbName = "stocksim";
	const dbName = Client.getClient().dbName;

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
    
	return {
		UserModel,
	};
};

export const disconnect = () => {
	if (!database) {
		return;
	}
    Mongoose.disconnect();
    console.log("Closed database");
};
