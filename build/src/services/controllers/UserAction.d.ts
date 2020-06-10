export declare class UserAction {
    private userId;
    private stockCache;
    private holdingsCache;
    constructor(userId: string);
    BuySharesReturnSharePrice(toSpend: number, sym: string): Promise<ITradeShares>;
    SellShares(n: number, sym: string): Promise<ITradeShares>;
    SellAllShares(sym: string): Promise<ISellAllShares>;
    CacheMarketValues(): Promise<Map<string, number>>;
    /**
     * Refreshes both caches
     */
    RefreshUserCache(): Promise<Map<string, number>>;
    /**
     * alias for the RefreshUserCache() command
     */
    SetUserCache(): Promise<Map<string, number>>;
    /**
     * Returns a map of symbols and their market prices. Uses iex API.
     * @param records
     */
    private static SymbolValueMapFromDocument;
    /**
     * Must SetCache() before use
     */
    NetAssetWorth(): number;
}
interface ITradeShares {
    success: boolean;
    price: number;
}
interface ISellAllShares extends ITradeShares {
    holding: number;
}
export {};
//# sourceMappingURL=UserAction.d.ts.map