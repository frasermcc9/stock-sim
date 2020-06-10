"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const sharesStatics_1 = require("./sharesStatics");
const sharesMethods_1 = require("./sharesMethods");
const ShareSchema = new mongoose_1.Schema({
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
ShareSchema.statics.findOneOrCreate = sharesStatics_1.findOneOrCreate;
ShareSchema.statics.allHeldByUser = sharesStatics_1.allHeldByUser;
ShareSchema.methods.setLastUpdated = sharesMethods_1.setLastUpdated;
ShareSchema.methods.sellShares = sharesMethods_1.sellShares;
ShareSchema.methods.addShares = sharesMethods_1.addShares;
exports.default = ShareSchema;
//# sourceMappingURL=sharesSchema.js.map