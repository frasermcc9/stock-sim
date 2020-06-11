

# Stock-Sim

This is a simple application that creates a back-end system for a stock-market simulator. It uses a IEXCloud for getting stock data and MongoDB for storing information about users on the system.

## Installation

`npm install https://github.com/frasermcc9/stock-sim`

## Usage
Basic Usage:
```js
const StockClient = require("stocksim");
StockClient.Client.CreateClient({
	uri: "The URI to your database",
	dbName:  "YourDatabaseName",
	iexKey: "Your IEXCloud token",
});
stockClient.connect();
```
Getting a Quote
```js
const sym = new Symbol("AAPL");
const data = await sym.FullQuote();
```
A User Buying Shares
```js
const user = new UserAction("Some unique id");
const spend = 100;
const symbol = "AAPL";
//returns an object detailing the success and the current share price
const result = await user.BuySharesReturnSharePrice(spend, symbol).catch(() => {
	//if the symbol is unknown symbol
});
```
A User Checking Their Net Worth
```js
const user = new UserAction("Some unique id");
await user.SetUserCache();
//returns an array containing the sum of the users assets, and sum of their unspent capital
const result = await Promise.all([user.NetAssetWorth(), user.FreeCapital()]);
```
## License
MIT License

Copyright 2020 Fraser McCallum

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
