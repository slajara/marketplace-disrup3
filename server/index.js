require("dotenv").config();
const contractData = require("./constants/constant.json");
const { PrismaClient } = require("@prisma/client");
const processMarketplaceEvents = require("./services/paymentsTracker");
const prisma = new PrismaClient();

const CHAIN_ID = process.env.NETWORK_CHAINID;

const connect = async () => {
  // Check last block processed;
  const result = await prisma.Tracker_State.findMany();
  if (!result.length) {
    await prisma.Tracker_State.create({
      data: {
        contractAddress: contractData[CHAIN_ID].address,
        lastBlockProcessed: 0,
        chainId: CHAIN_ID,
      },
    });
  }

  console.log();

  const trackContractCallback = async () => {
    const lastBlocks = await prisma.Tracker_State.findMany();
    await processMarketplaceEvents(lastBlocks[0].lastBlockProcessed, prisma);
    setTimeout(() => trackContractCallback(), 2000);
  };
  await trackContractCallback();
};

setTimeout(connect, 2000);
