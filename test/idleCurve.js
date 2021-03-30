
const { expect } = require("chai");
const { BigNumber, Wallet } = require("ethers");
const { formatEther, parseEther } =require('@ethersproject/units')
const daiAbi = require('../abis/daiAbi.json');
const curveStablecoinAbi = require('../abis/curveStablecoinAbi.json');
const { ethers } = require("hardhat");

// Mainnet Fork and test case for mainnet with hardhat network by impersonate account from mainnet
describe("deployed Contract on Mainnet fork", function() {
  // it("hardhat_impersonateAccount and transfer balance to our account", async function() {
  //   const accounts = await ethers.getSigners();
    
  //   // Mainnet addresses
  //   const accountToImpersonate = '0x1759f4f92af1100105e405fca66abba49d5f924e'
  //   const daiAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
  //   const curveStablecoinAddress = '0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7'
  //   await hre.network.provider.request({
  //       method: "hardhat_impersonateAccount",
  //       params: [accountToImpersonate]}
  //   )
  //   let signer = await ethers.provider.getSigner(accountToImpersonate)
  //   let daiContract = new ethers.Contract(daiAddress, daiAbi, signer)
  //   await daiContract.transfer(accounts[0].address, daiContract.balanceOf(accountToImpersonate))
  //   signer = await ethers.provider.getSigner(accounts[0].address)
  //   daiContract = new ethers.Contract(daiAddress, daiAbi, signer)
  // });

  // it("Initialize IDle and CreamDAI startergy", async function() {
  //   const accounts = await ethers.getSigners();
  //   const accountToImpersonate = '0x1759f4f92af1100105e405fca66abba49d5f924e'
  //   const daiAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
  //   const curveStablecoinAddress = '0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7'
  //   await hre.network.provider.request({
  //       method: "hardhat_impersonateAccount",
  //       params: [accountToImpersonate]}
  //   )
  //   let signer = await ethers.provider.getSigner(accountToImpersonate)
  //   let daiContract = new ethers.Contract(daiAddress, daiAbi, signer)
  //   await daiContract.transfer(accounts[0].address, daiContract.balanceOf(accountToImpersonate))
  //   signer = await ethers.provider.getSigner(accounts[0].address)
  //   daiContract = new ethers.Contract(daiAddress, daiAbi, signer)
  //   const IdleCurve = await ethers.getContractFactory('IdleCurve', signer);
  //   const IdleCurve_Instance = await IdleCurve.deploy();
  //   let curveStablecoinContract = new ethers.Contract(curveStablecoinAddress, curveStablecoinAbi, signer)
  //   await IdleCurve_Instance.initialize(
  //       curveStablecoinContract.address, 
  //       accounts[0].address
  //   )
  // });

  it("Mint or add_liquidity in curve through idle startergy", async function() {
    const accounts = await ethers.getSigners();

    const accountToImpersonate = '0x1759f4f92af1100105e405fca66abba49d5f924e'
    const daiAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
    const curveStablecoinAddress = '0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7'
    const crvAddress = '0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490'

    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [accountToImpersonate]}
    )

    let signer = await ethers.provider.getSigner(accountToImpersonate)
    let daiContract = new ethers.Contract(daiAddress, daiAbi, signer)
    await daiContract.transfer(accounts[0].address, daiContract.balanceOf(accountToImpersonate))
    signer = await ethers.provider.getSigner(accounts[0].address)
    daiContract = new ethers.Contract(daiAddress, daiAbi, signer)
    const IdleCurve = await ethers.getContractFactory('IdleCurve', signer);
    const IdleCurve_Instance = await IdleCurve.deploy();
    let curveStablecoinContract = new ethers.Contract(curveStablecoinAddress, curveStablecoinAbi, signer)
    await IdleCurve_Instance.initialize(
        curveStablecoinContract.address, 
        accounts[0].address
    )
    await daiContract.approve(curveStablecoinContract.address, '1000000000000000000000000000000000')
    await daiContract.transfer(IdleCurve_Instance.address, '10000000')
    await IdleCurve_Instance.mint() //// Mint Tokens or BuyTokens 

    let crvContract = new ethers.Contract(crvAddress, daiAbi, signer)
    await crvContract.transfer(IdleCurve_Instance.address, crvContract.balanceOf(accounts[0].address))
    await IdleCurve_Instance.redeem(IdleCurve_Instance.address) //// Idle Redeem or SellTokens from BarnBeidge 

  });

  // it("Mint and Redeem from CreamDAI through idle startergy", async function() {
  //   const accounts = await ethers.getSigners();
  //   const accountToImpersonate = '0x1759f4f92af1100105e405fca66abba49d5f924e'
  //   const daiAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
  //   const curveStablecoinAddress = '0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7'
  //   await hre.network.provider.request({
  //       method: "hardhat_impersonateAccount",
  //       params: [accountToImpersonate]}
  //   )
  //   let signer = await ethers.provider.getSigner(accountToImpersonate)
  //   let daiContract = new ethers.Contract(daiAddress, daiAbi, signer)
  //   await daiContract.transfer(accounts[0].address, daiContract.balanceOf(accountToImpersonate))
  //   signer = await ethers.provider.getSigner(accounts[0].address)
  //   daiContract = new ethers.Contract(daiAddress, daiAbi, signer)
  //   const IdleCurve = await ethers.getContractFactory('IdleCurve', signer);
  //   const IdleCurve_Instance = await IdleCurve.deploy();
  //   let curveStablecoinContract = new ethers.Contract(curveStablecoinAddress, curveStablecoinAbi, signer)
  //   await IdleCurve_Instance.initialize(
  //       curveStablecoinContract.address, 
  //       accounts[0].address
  //   )
  //   await daiContract.approve(curveStablecoinContract.address, '1000000000000000000000000000000000')
  //   await daiContract.transfer(IdleCurve_Instance.address, '10000000')
  //   await IdleCurve_Instance.mint() //// Mint Tokens or BuyTokens from CreamDAI
  //   const balance = await curveStablecoinContract.balanceOf(accounts[0].address)
  //   await curveStablecoinContract.transfer(IdleCurve_Instance.address, balance)
  //   await IdleCurve_Instance.redeem(IdleCurve_Instance.address) //// Idle Redeem or SellTokens from BarnBeidge 
  // });

  
  // it("Get NextSupplyRate", async function() {
  //   const accounts = await ethers.getSigners();
  //   const accountToImpersonate = '0x1759f4f92af1100105e405fca66abba49d5f924e'
  //   const daiAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
  //   const curveStablecoinAddress = '0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7'
  //   await hre.network.provider.request({
  //       method: "hardhat_impersonateAccount",
  //       params: [accountToImpersonate]}
  //   )
  //   let signer = await ethers.provider.getSigner(accountToImpersonate)
  //   let daiContract = new ethers.Contract(daiAddress, daiAbi, signer)
  //   await daiContract.transfer(accounts[0].address, daiContract.balanceOf(accountToImpersonate))
  //   signer = await ethers.provider.getSigner(accounts[0].address)
  //   daiContract = new ethers.Contract(daiAddress, daiAbi, signer)
  //   const IdleCurve = await ethers.getContractFactory('IdleCurve', signer);
  //   const IdleCurve_Instance = await IdleCurve.deploy();
  //   let curveStablecoinContract = new ethers.Contract(curveStablecoinAddress, curveStablecoinAbi, signer)

  //   await IdleCurve_Instance.initialize(
  //       curveStablecoinContract.address,
  //       accounts[0].address
  //   )

  //   const rate = await IdleCurve_Instance.nextSupplyRate('0') //// Idle Redeem or SellTokens from BarnBeidge 
  //   console.log('rate: ', rate.toString());
  // });

  
  // it("This test case will print all state", async function() {
  //   const accounts = await ethers.getSigners();

  //   const accountToImpersonate = '0x1759f4f92af1100105e405fca66abba49d5f924e'
  //   const daiAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
  //   const curveStablecoinAddress = '0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7'

  //   await hre.network.provider.request({
  //       method: "hardhat_impersonateAccount",
  //       params: [accountToImpersonate]}
  //   )

  //   let signer = await ethers.provider.getSigner(accountToImpersonate)
  //   let daiContract = new ethers.Contract(daiAddress, daiAbi, signer)

  //   await daiContract.transfer(accounts[0].address, daiContract.balanceOf(accountToImpersonate))

  //   signer = await ethers.provider.getSigner(accounts[0].address)
  //   daiContract = new ethers.Contract(daiAddress, daiAbi, signer)
    
  //   const IdleCurve = await ethers.getContractFactory('IdleCurve', signer);
  //   const IdleCurve_Instance = await IdleCurve.deploy();
  //   console.log('IdleCurve_Instance: ', IdleCurve_Instance.address);

  //   const rate = await IdleCurve_Instance.nextSupplyRate('0') //// Idle Redeem or SellTokens from BarnBeidge 
  //   console.log('rate: ', rate.toString());

  //   let curveStablecoinContract = new ethers.Contract(curveStablecoinAddress, curveStablecoinAbi, signer)
  //   console.log('curveStablecoinContract.address: ', curveStablecoinContract.address)

  //   const maxBondDailyRate = await curveStablecoinContract.callStatic.maxBondDailyRate()
  //   console.log('maxBondDailyRate: ', maxBondDailyRate.toString())

  //   await IdleCurve_Instance.initialize(
  //       curveStablecoinContract.address, 
  //       accounts[0].address
  //   )

  //   await daiContract.approve(curveStablecoinContract.address, '1000000000000000000000000000000000')
  //   await daiContract.transfer(IdleCurve_Instance.address, '10000000')

  //   const bal4 = await daiContract.balanceOf(IdleCurve_Instance.address)
  //   console.log('IdleCurve_Instance.address-bal4: ', bal4.toString())

  //   const bal5 = await curveStablecoinContract.balanceOf(IdleCurve_Instance.address)
  //   console.log('curveStablecoinContract.address-bal5: ', bal5.toString())

  //   await IdleCurve_Instance.mint() //// Mint Tokens or BuyTokens from CreamDAI
    
  //   const bal6 = await daiContract.balanceOf(IdleCurve_Instance.address)
  //   console.log('IdleCurve_Instance.address-bal6: ', bal6.toString())

  //   const bal61 = await curveStablecoinContract.balanceOf(accounts[0].address)
  //   console.log('curveStablecoinContract.address-bal61: ', bal61.toString())

  //   await curveStablecoinContract.transfer(IdleCurve_Instance.address, bal61)

  //   const bal7 = await curveStablecoinContract.balanceOf(IdleCurve_Instance.address)
  //   console.log('curveStablecoinContract.address-bal7: ', bal7.toString())

  //   await IdleCurve_Instance.redeem(IdleCurve_Instance.address) //// Idle Redeem or SellTokens from BarnBeidge 

  //   const bal8 = await daiContract.balanceOf(IdleCurve_Instance.address)
  //   console.log('IdleCurve_Instance.address-bal8: ', bal8.toString())
    
  //   const bal9 = await curveStablecoinContract.balanceOf(IdleCurve_Instance.address)
  //   console.log('curveStablecoinContract.address-bal9: ', bal9.toString())

  // });
})