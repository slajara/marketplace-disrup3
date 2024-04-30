import { expect } from "chai";
import { ethers } from "hardhat";
import { MockERC20 } from "../typechain";
import { hrtime } from "process";

describe("Marketplace mock", function () {

  const testMarketplaceFixture = async() =>  {
    const [deployer, add1, add2] = await ethers.getSigners()
    const NftMarketplace_ = await ethers.getContractFactory("NftMarketplace");
    const NftMarketplace = await NftMarketplace_.deploy();
    
    const mocktoken = await ethers.getContractFactory("MockERC20");
    const Mocktoken = await mocktoken.deploy("pepe", "pepelotas", 1000);

    const mocknft = await ethers.getContractFactory("MockERC721");
    const Mocknft = await mocknft.deploy();
    await Mocknft.mintNft();
    return {NftMarketplace, Mocktoken, Mocknft, deployer, add1, add2}
    // tokenId 0 
    // feeRecipient = deployer address
  }

  it("should list, buy and distribute fees", async function () {
    const {deployer, Mocknft, Mocktoken, NftMarketplace, add1, add2} = await testMarketplaceFixture()
    // approve nft to marketplace
    await Mocknft.connect(add2).mintNft();
    await Mocknft.connect(add2).approve(NftMarketplace.address, 1);
    // list item
    await NftMarketplace.connect(add2).listItem(Mocknft.address, Mocktoken.address, 1, 100);
    
    await Mocktoken.connect(add1).mint();
    await Mocktoken.connect(add1).approve(NftMarketplace.address, 200);

    console.log(await Mocktoken.balanceOf(add2.address), "db");
    console.log(await Mocktoken.balanceOf(add1.address),"ab");
    const tx = await NftMarketplace.connect(add1).buyItem(Mocknft.address, 1);
  
   console.log(await Mocktoken.balanceOf(add2.address), "db2");
   console.log(await Mocktoken.balanceOf(add1.address), "ab2");
   console.log(await Mocktoken.balanceOf(deployer.address), "fee")

    console.log( await Mocknft.ownerOf(0), add1.address)
  
  });

  it("should list, buy and distribute fees with native token", async function () {
    
    const {deployer, Mocknft, Mocktoken, NftMarketplace, add1, add2} = await testMarketplaceFixture()
    // approve nft to marketplace
    await Mocknft.connect(add2).mintNft();
    await Mocknft.connect(add2).approve(NftMarketplace.address, 1);
    // list item
    await NftMarketplace.connect(add2).listItem(Mocknft.address, ethers.constants.AddressZero, 1, ethers.utils.parseEther("1000"));
    


    console.log(await add2.getBalance(), "db");
    console.log(await add1.getBalance(),"ab");
    const tx = await NftMarketplace.connect(add1).buyItem(Mocknft.address, 1, {value: ethers.utils.parseEther("1000")});
  
   console.log(await add2.getBalance(), "db2");
   console.log(await add1.getBalance(), "ab2");
   console.log(await deployer.getBalance(), "fee")

    console.log( await Mocknft.ownerOf(1), add1.address)
  
  });
});
