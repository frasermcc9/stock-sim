import { IShareDocument } from "./sharesTypes";
export declare function setLastUpdated(this: IShareDocument): Promise<void>;
/**
 * @param this
 * @param numberOfShares
 * @returns whether the operation was successful
 */
export declare function sellShares(this: IShareDocument, { numberOfShares }: {
    numberOfShares: number;
}): Promise<boolean>;
/**
 * @param this
 * @param numberOfShares
 * @returns the new number of shares
 */
export declare function addShares(this: IShareDocument, { numberOfShares }: {
    numberOfShares: number;
}): Promise<number>;
//# sourceMappingURL=sharesMethods.d.ts.map