import { BaseService } from "./BaseService";
import { Quote, Company, Logo } from "node-iex-cloud/lib/types";

export class Symbol extends BaseService {
	private _symbol: string;
	constructor(symbol: string) {
		super();
		this._symbol = symbol;
	}
	public async CurrentPrice(): Promise<number> {
		return (await this.iex.symbol(this._symbol).quote()).latestPrice;
	}
	public async FullQuote(): Promise<Quote> {
		return this.iex.symbol(this._symbol).quote();
	}
	public async CompanyProfile(): Promise<Company> {
		return this.iex.symbol(this._symbol).company();
	}
	public async CompanyLogo(): Promise<Logo> {
		return this.iex.symbol(this._symbol).logo();
	}
}
