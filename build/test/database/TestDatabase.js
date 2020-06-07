"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
let database;
exports.connect = () => {
    const uri = "mongodb://localhost:27017";
    const dbName = "stocksimTest";
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
exports.disconnect = () => {
    if (!database) {
        return;
    }
    Mongoose.disconnect();
};
//# sourceMappingURL=TestDatabase.js.map