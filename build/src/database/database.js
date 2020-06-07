"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
const usersModel_1 = require("./users/usersModel");
const Client_1 = require("../Client");
let database;
exports.connect = () => {
    //const uri = "mongodb://localhost:27017";
    const uri = Client_1.Client.getClient().uri;
    //const dbName = "stocksim";
    const dbName = Client_1.Client.getClient().dbName;
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
        UserModel: usersModel_1.UserModel,
    };
};
exports.disconnect = () => {
    if (!database) {
        return;
    }
    Mongoose.disconnect();
    console.log("Closed database");
};
//# sourceMappingURL=database.js.map