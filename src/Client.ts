export class Client {
	private static _client: Client;

	private _marketHoursOnly!: boolean;
	private _newUserCapital!: number;

	private constructor() {}

	public static getClient() {
		if (!this._client) {
			this._client = new Client();
			this._client.setOptions({});
		}
		return this._client;
	}
	public setOptions(options: IClientOptions) {
		this._marketHoursOnly = options.marketHoursOnly || false;
		this._newUserCapital = options.newUserValue || 1000;
	}

	public get newUserValue(): number {
		return this._newUserCapital;
	}
	public get marketHoursOnly(): boolean {
		return this._marketHoursOnly;
	}
}

export interface IClientOptions {
	marketHoursOnly?: boolean;
	newUserValue?: number;
}
