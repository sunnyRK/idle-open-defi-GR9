# Idle Finance & Curve.fi: DAI/USDC/USDT Pool DAI Strategy

## Solution

I have used Idle finance interface `ILendingProtocol` to starture for strategy.

Where strategy consumes a `DAI` token and internall it will call `mint` of Curve.fi: DAI/USDC/USDT Pool and get CRV DAO token.

## IdleCurve Strategy Code and test case:

`Strategy:` You can find code in `contracts/wrappers/IdleCurve.sol` path.  
[Clieck here to go strategy code](https://github.com/sunnyRK/idle-open-defi-GR9/blob/master/contracts/wrappers/IdleCurve.sol)


`Test-case:` You can find test case in `test/IdleCurve.js` path.  
[Click here to go test cases](https://github.com/sunnyRK/idle-open-defi-GR9/blob/master/test/idleCurve.js)  

## Run

`Download code`  
1). Clone repo

`Install dependency`  
2). yarn

`to run on mainnet fork`  
3). npx hardhat test --network hardhat

## Contact

[Twitter](https://twitter.com/RadadiyaSunny)  
`Discord: sunny#3937` 




