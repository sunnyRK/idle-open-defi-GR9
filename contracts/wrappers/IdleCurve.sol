/**
 * @title: Curve.fi: DAI/USDC/USDT Pool  wrapper
 * @summary: Used for interacting with Curve.fi. Has
 *           a common interface with all other protocol wrappers.
 *           This contract holds assets only during a tx, after tx it should be empty
 * @author: Idle Labs Inc., idle.finance
 */
pragma solidity 0.5.16;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "../interfaces/ILendingProtocol.sol";
import "hardhat/console.sol";

interface ICurveStablecoin {
  function add_liquidity(uint256[3] calldata amounts, uint256 min_mint_amount) external;
  function remove_liquidity(uint256 _amount, uint256[4] calldata min_amounts) external;
  function remove_liquidity_one_coin(
        uint256 _token_amount,
        int128 i,
        uint256 min_amount
    ) external;
  function coins(uint index) external view returns (address);
  function get_virtual_price() external view returns (uint256);
}

contract IdleCurve is ILendingProtocol, Ownable {
  using SafeERC20 for IERC20;
  using SafeMath for uint256;

  // protocol contract (Curve.fi: DAI/USDC/USDT Pool) address
  address public token;

  // protocol token (crv token) address
  address public crvToken = 0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490;
  // underlying token (token eg DAI) address
  address public underlying;

  address public idleToken;
  bool public initialized;

  /**
   * @param _token : Curve.fi: DAI/USDC/USDT Pool
   * @param _idleToken : idleToken address
   */
  function initialize(address _token, address _idleToken) public {
    require(!initialized, "Already initialized");
    require(_token != address(0), 'Curve.fi: DAI/USDC/USDT Pool: addr is 0');

    token = _token;
    underlying = address(ICurveStablecoin(_token).coins(0));
    idleToken = _idleToken;
    IERC20(underlying).safeApprove(_token, 0);
    IERC20(underlying).safeApprove(_token, uint256(-1));
    
    IERC20(crvToken).safeApprove(_token, 0);
    IERC20(crvToken).safeApprove(_token, uint256(-1));
    initialized = true;
  }

  /**
   * Throws if called by any account other than IdleToken contract.
   */
  modifier onlyIdle() {
    require(msg.sender == idleToken, "Ownable: caller is not IdleToken");
    _;
  }
  
  function nextSupplyRateWithParams(uint256[] memory params)
    public view
    returns (uint256) {
      return 0;
  }

  /**
   * Calculate next supply rate for Curve.fi: DAI/USDC/USDT Pool, given an `_amount` supplied
   *
   * @param _amount : new underlying amount supplied (eg DAI)
   * @return : yearly net rate
   */
  function nextSupplyRate(uint256 _amount)
    external view
    returns (uint256) {
      return 0;
  }

  /**
   * @return current price of DAI in underlying, 
   */
  function getPriceInToken()
    external view
    returns (uint256) {
      // uint256 _want = IERC20(crvToken).balanceOf(address(this));
      // uint256 v = _want.mul(1e18).div(ICurveStablecoin(token).get_virtual_price());
      return 10**18;
  }

  /**
   * @return apr : current yearly net rate
   */
  function getAPR()
    external view
    returns (uint256) {
      return 0;
  }

  /**
   * Gets all underlying tokens in this contract and mints crv Tokens
   * tokens are then transferred to msg.sender
   * NOTE: underlying tokens needs to be sent here before calling this
   *
   * @return crv Tokens minted
   */
  function mint()
    external onlyIdle
    returns (uint256 crvTokens) {
      uint256 balance = IERC20(underlying).balanceOf(address(this));
      if (balance == 0) {
        return crvTokens;
      }
      ICurveStablecoin(token).add_liquidity([balance, 0, 0], 0);
      crvTokens = IERC20(crvToken).balanceOf(address(this));
      IERC20(crvToken).safeTransfer(msg.sender, crvTokens); 
  }

  /**
   * Gets all crv in this contract and redeems underlying tokens.
   * underlying tokens are then transferred to `_account`
   * NOTE: crv needs to be sent here before calling this
   *
   * @return underlying tokens redeemd
   */
  function redeem(address _account)
    external onlyIdle
    returns (uint256 tokens) {
    ICurveStablecoin(token).remove_liquidity_one_coin(
      IERC20(crvToken).balanceOf(address(this)), 
      0,
      0
    );
    IERC20 _underlying = IERC20(underlying);
    tokens = _underlying.balanceOf(address(this));
    _underlying.safeTransfer(_account, tokens);
  }

  /**
   * Get the underlying balance on the lending protocol
   *
   * @return underlying tokens available
   */
  function availableLiquidity() external view returns (uint256) {
    return IERC20(underlying).balanceOf(token);
  }
}
