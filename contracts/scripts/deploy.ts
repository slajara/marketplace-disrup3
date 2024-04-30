// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  const D3Martketplace = await ethers.getContractFactory("NftMarketplace");
  const d3Martketplace = await D3Martketplace.deploy();

  const MockToken = await ethers.getContractFactory("MockERC20");
  const mockToken = await MockToken.deploy("pepe", "pepe", 1000);

  const MockNFT = await ethers.getContractFactory("MockERC721");
  const mockNft = await MockNFT.deploy();

  await d3Martketplace.deployed();
  await mockToken.deployed();
  await mockNft.deployed();

  const chainID = (await ethers.provider.getNetwork()).chainId

  const contractsObj = {} as any

  contractsObj[chainID] = {
    address: d3Martketplace.address,
    abi: d3Martketplace.interface.format(ethers.utils.FormatTypes.json)
  }

  fs.writeFileSync("../server/constants/constant.json", JSON.stringify(contractsObj))

  await mockNft.mintNft();
  await mockNft.approve(d3Martketplace.address, 0);
  await d3Martketplace.listItem(mockNft.address, ethers.constants.AddressZero, 0, ethers.utils.parseEther("0.01"))

  console.log("MKplace deployed to:", d3Martketplace.address, "\n",
  "nft deployed to:", mockNft.address, "\n",
  "token deployed to:", mockToken.address, "\n",);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
