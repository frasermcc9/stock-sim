export declare class UserAction {
    /**
     * @deprecated
     */
    static BuyShares(numOfShares: number, sym: string, userId: string): Promise<boolean>;
    static BuySharesReturnSharePrice(toSpend: number, sym: string, userId: string): Promise<ITradeShares>;
    static SellShares(n: number, sym: string, userId: string): Promise<ITradeShares>;
    static SellAllShares(sym: string, userId: string): Promise<ISellAllShares>;
}
export interface ITradeShares {
    success: boolean;
    price: number;
}
export interface ISellAllShares extends ITradeShares {
    holding: number;
}
//# sourceMappingURL=UserAction.d.ts.map