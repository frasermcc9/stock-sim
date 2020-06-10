import { BaseService } from "./BaseService";
import { Quote, Company, Logo } from "node-iex-cloud/lib/types";
export declare class Symbol extends BaseService {
    private _symbol;
    constructor(symbol: string);
    CurrentPrice(): Promise<number>;
    FullQuote(): Promise<Quote>;
    CompanyProfile(): Promise<Company>;
    CompanyLogo(): Promise<Logo>;
    get symbol(): string;
}
//# sourceMappingURL=Symbol.d.ts.map