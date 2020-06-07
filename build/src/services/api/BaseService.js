"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_iex_cloud_1 = require("node-iex-cloud");
const Client_1 = require("../../Client");
const node_fetch_1 = __importDefault(require("node-fetch"));
/**
 * base class for stock market API requests. Cannot be instantiated.
 * @abstract
 */
class BaseService {
    constructor() {
        this.iex = new node_iex_cloud_1.IEXCloudClient(node_fetch_1.default, {
            sandbox: false,
            publishable: Client_1.Client.getClient().iexKey,
            version: "stable",
        });
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=BaseService.js.map