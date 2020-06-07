import { Schema } from "mongoose";
import { findOneOrCreate } from "./userStatics";
import { setLastUpdated, removeUserCapital } from "./usersMethods";

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
UserSchema.methods.sameLastName = removeUserCapital;

export default UserSchema;
