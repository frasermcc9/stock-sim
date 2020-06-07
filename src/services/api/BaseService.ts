import { IEXCloudClient } from "node-iex-cloud";
import { Client } from "../../Client";
import fetch from "node-fetch";
/**
 * base class for stock market API requests. Cannot be instantiated.
 * @abstract
 */
export abstract class BaseService {
	protected readonly iex: IEXCloudClient;
	constructor() {
		this.iex = new IEXCloudClient(fetch, {
			sandbox: false,
			publishable: Client.getClient().iexKey,
			version: "stable",
		});
	}
}
