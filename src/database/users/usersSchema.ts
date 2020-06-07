import { Schema } from "mongoose";
import { findOneOrCreate } from "./userStatics";
import { setLastUpdated, removeUserCapital, addUserCapital } from "./usersMethods";

const UserSchema = new Schema({
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

UserSchema.statics.findOneOrCreate = findOneOrCreate;

UserSchema.methods.setLastUpdated = setLastUpdated;
UserSchema.methods.removeUserCapital = removeUserCapital;
UserSchema.methods.addUserCapital = addUserCapital;

export default UserSchema;
