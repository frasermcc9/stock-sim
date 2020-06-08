"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const sharesSchema_1 = __importDefault(require("./sharesSchema"));
exports.ShareModel = mongoose_1.model("shares", sharesSchema_1.default);
//# sourceMappingURL=sharesModel.js.map