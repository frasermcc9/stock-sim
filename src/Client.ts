export class Client {
	private static _client: Client;

	private _marketHoursOnly: boolean = false;
	private _newUserCapital: number = 1000;
	private _iexKey: string = "";
	private _uri: string = "";
	private _dbName: string = "";

	private constructor() {}

	public static CreateClient(options: IClientOptions) {
		if (!this._client) {
			if (!options.uri) throw new TypeError("Cannot start client without a URI");
			if (!options.dbName) throw new TypeError("Cannot start client without a database name");
			if (!options.iexKey) throw new TypeError("Cannot start client without a iex key");
			this._client = new Client();
			this._client.setOptions(options);
		}
	}

	public static getClient() {
		if (!this._client) {
			throw new TypeError("You must explicitly create the client with Client.CreateClient(options: IClientOptions)");
		}
		return this._client;
	}

	public setOptions(options: IClientOptions) {
		this._marketHoursOnly = options.marketHoursOnly || false;
		this._newUserCapital = options.newUserValue || 1000;
		this._iexKey = options.iexKey;
		this._dbName = options.dbName;
		this._uri = options.uri;
	}

	public get newUserValue(): number {
		return this._newUserCapital;
	}
	public get marketHoursOnly(): boolean {
		return this._marketHoursOnly;
	}

	public get newUserCapital(): number {
		return this._newUserCapital;
	}

	public get iexKey(): string {
		return this._iexKey;
	}

	public get uri(): string {
		return this._uri;
	}

	public get dbName(): string {
		return this._dbName;
	}
}

export interface IClientOptions {
	marketHoursOnly?: boolean;
	newUserValue?: number;
	iexKey: string;
	dbName: string;
	uri: string;
}
