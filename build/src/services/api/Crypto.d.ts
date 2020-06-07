import { BaseService } from "./BaseService";
import { CryptoQuote } from "node-iex-cloud/lib/types";
export declare class Crypto extends BaseService {
    private _symbol;
    constructor(symbol: string);
    CurrentPrice(): Promise<number>;
    FullQuote(): Promise<CryptoQuote>;
}
//# sourceMappingURL=Crypto.d.ts.map