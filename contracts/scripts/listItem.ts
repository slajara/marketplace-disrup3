// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const D3Mkplace = await ethers.getContractFactory("NftMarketplace");
  const d3mkplace = D3Mkplace.attach(
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  );

  const MockNft = await ethers.getContractFactory("MockERC721");
  const mockNft = MockNft.attach("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0");

  try {
    const tx = await mockNft.mintNft();
    await tx.wait();
    const currTokenId = await mockNft.getTokenCounter();
    await mockNft.approve(d3mkplace.address, 0);
    await d3mkplace.listItem(
      mockNft.address,
      ethers.constants.AddressZero,
      0,
      100
    );
    console.log("nft listed");
  } catch (error) {
    console.log("algo fue mal", error);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
