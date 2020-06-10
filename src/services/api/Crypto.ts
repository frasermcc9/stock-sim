import { BaseService } from "./BaseService";
import { Quote, Company, Logo, CryptoQuote } from "node-iex-cloud/lib/types";

export class Crypto extends BaseService {
	private _symbol: string;

	constructor(symbol: string) {
		super();
		this._symbol = symbol.toUpperCase();
	}

	public async CurrentPrice(): Promise<number> {
		return Number((await this.iex.crypto(this._symbol + "usd").quote()).latestPrice);
	}
	public async FullQuote(): Promise<CryptoQuote> {
		return this.iex.crypto(this._symbol).quote();
	}
}
