export declare class Client {
    private static _client;
    private _marketHoursOnly;
    private _newUserCapital;
    private _iexKey;
    private _uri;
    private _dbName;
    private constructor();
    static CreateClient(options: IClientOptions): void;
    static getClient(): Client;
    setOptions(options: IClientOptions): void;
    get newUserValue(): number;
    get marketHoursOnly(): boolean;
    get newUserCapital(): number;
    get iexKey(): string;
    get uri(): string;
    get dbName(): string;
}
export interface IClientOptions {
    marketHoursOnly?: boolean;
    newUserValue?: number;
    iexKey: string;
    dbName: string;
    uri: string;
}
//# sourceMappingURL=Client.d.ts.map