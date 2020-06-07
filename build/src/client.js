"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Client {
    constructor() {
        this._marketHoursOnly = false;
        this._newUserCapital = 1000;
        this._iexKey = "";
        this._uri = "";
        this._dbName = "";
    }
    static CreateClient(options) {
        if (!this._client) {
            if (!options.uri)
                throw new TypeError("Cannot start client without a URI");
            if (!options.dbName)
                throw new TypeError("Cannot start client without a database name");
            if (!options.iexKey)
                throw new TypeError("Cannot start client without iex key");
            this._client = new Client();
            this._client.setOptions(options);
        }
    }
    static getClient() {
        if (!this._client) {
            throw new TypeError("You must explicitly create the client with Client.CreateClient(options: IClientOptions)");
        }
        return this._client;
    }
    setOptions(options) {
        this._marketHoursOnly = options.marketHoursOnly || false;
        this._newUserCapital = options.newUserValue || 1000;
        this._iexKey = options.iexKey;
        this._dbName = options.dbName;
        this._uri = options.uri;
    }
    get newUserValue() {
        return this._newUserCapital;
    }
    get marketHoursOnly() {
        return this._marketHoursOnly;
    }
    get newUserCapital() {
        return this._newUserCapital;
    }
    get iexKey() {
        return this._iexKey;
    }
    get uri() {
        return this._uri;
    }
    get dbName() {
        return this._dbName;
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map