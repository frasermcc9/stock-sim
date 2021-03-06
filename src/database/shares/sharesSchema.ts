import { Schema } from "mongoose";
import { findOneOrCreate, allHeldByUser } from "./sharesStatics";
import { setLastUpdated, sellShares, addShares } from "./sharesMethods";

const ShareSchema = new Schema({
	symbol: String,
	shares: Number,
	uId: String,
	dateOfEntry: {
		type: Date,
		default: new Date(),
	},
	lastUpdated: {
		type: Date,
		default: new Date(),
	},
});

ShareSchema.statics.findOneOrCreate = findOneOrCreate;
ShareSchema.statics.allHeldByUser = allHeldByUser;

ShareSchema.methods.setLastUpdated = setLastUpdated;
ShareSchema.methods.sellShares = sellShares;
ShareSchema.methods.addShares = addShares;

export default ShareSchema;
