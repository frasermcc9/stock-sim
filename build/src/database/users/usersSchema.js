"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const usersStatics_1 = require("./usersStatics");
const usersMethods_1 = require("./usersMethods");
const UserSchema = new mongoose_1.Schema({
    uId: String,
    capital: Number,
    dateOfEntry: {
        type: Date,
        default: new Date(),
    },
    lastUpdated: {
        type: Date,
        default: new Date(),
    },
});
UserSchema.statics.findOneOrCreate = usersStatics_1.findOneOrCreate;
UserSchema.methods.setLastUpdated = usersMethods_1.setLastUpdated;
UserSchema.methods.removeUserCapital = usersMethods_1.removeUserCapital;
UserSchema.methods.addUserCapital = usersMethods_1.addUserCapital;
exports.default = UserSchema;
//# sourceMappingURL=usersSchema.js.map