"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const usersSchema_1 = __importDefault(require("./usersSchema"));
exports.UserModel = mongoose_1.model("users", usersSchema_1.default);
//# sourceMappingURL=usersModel.js.map