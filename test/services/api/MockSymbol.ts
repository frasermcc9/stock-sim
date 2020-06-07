import { BaseService } from "../../../src/services/api/BaseService";

export class MockSymbol extends BaseService {
	private _symbol: string;
	constructor(symbol: string) {
		super();
		this._symbol = symbol;
	}
	public CurrentPrice(): 10 {
		return 10;
	}
	public FullQuote(): void {}
	public CompanyProfile(): void {}
	public CompanyLogo() {}
}
