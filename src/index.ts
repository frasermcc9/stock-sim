import { connect } from "./database/database";
import { Client } from "./Client";

import * as auth from "../auth.json";

Client.CreateClient({
	dbName: "stocksimTest",
	iexKey: auth.iexKey,
	uri: auth.uri,
	marketHoursOnly: false,
	newUserValue: 1000,
});

connect();
