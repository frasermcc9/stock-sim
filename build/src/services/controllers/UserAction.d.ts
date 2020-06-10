import { IShareDocument } from "../../database/shares/sharesTypes";
export declare class UserAction {
    /**
     * @deprecated
     */
    static BuyShares(numOfShares: number, sym: string, userId: string): Promise<boolean>;
    static BuySharesReturnSharePrice(toSpend: number, sym: string, userId: string): Promise<ITradeShares>;
    static SellShares(n: number, sym: string, userId: string): Promise<ITradeShares>;
    static SellAllShares(sym: string, userId: string): Promise<ISellAllShares>;
    static SymbolValueMapFromId(userId: string): Promise<Map<string, number>>;
    static SymbolValueMap(records: IShareDocument[]): Promise<Map<string, number>>;
    static NetAssetWorth(userId: string): Promise<number>;
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