import MainLayout from "@/components/layouts/MainLayout";
import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useState } from "react";

const mockNFT = [
  {
    title: "Azuki",
    desc: "La colección nft top 1 en españa",
    img: "https://i.seadn.io/gcs/files/29f9436a576394c58d9a11bb24b016e8.png?auto=format&w=1000",
    fp: 3,
  },
  {
    title: "Azuki",
    desc: "La colección nft top 1 en españa",
    img: "https://i.seadn.io/gcs/files/29f9436a576394c58d9a11bb24b016e8.png?auto=format&w=1000",
    fp: 3,
  },

];

type NFTData = {
  title: string;
  media: media[];
};

type media = {
  gateway: string;
};

const CollectionPage: NextPage<{collection: Collection; collNfts: NFTData[] }> = ({
  collection,
  collNfts
}) => {

  
  console.log(collNfts);
  return (
    <MainLayout>
      <section>
        <div className="h-[300px] w-full relative overflow-visible bg-cover bg-center bg-[url('https://i.seadn.io/gae/4elUtz8UyFYDH34vDxd4hpQX8S-EdkFq8s9ombkuQTDBWLwHvsjRM_RXWT2zX8Vt2bAiO2BHslwN57FyTW1JIn_FyFI0BsZfmvmeJQ?auto=format&dpr=1&w=1920')]">
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-12vh] flex flex-col items-center">
            <div className="w-20 h-20 bg-contain rounded-full bg-[url('https://i.seadn.io/gcs/files/35ab5a6cfc3847460a9d282e4297dd1d.png?auto=format&dpr=1&w=1000')] "></div>

            <h3> CLONE X - X TAKASHI MURAKAMI </h3>
            <p> By </p>

            <div className="flex gap-3">
              <p>Items</p>
              <p>Created</p>
              <p>Creator earnings</p>
              <p>Chain</p>
              <p>Category</p>
            </div>

            <div>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet
              repudiandae deleniti ad doloremque accusantium fugit, veniam
              repellat ab nesciunt fugiat repellendus, aspernatur quasi laborum
              adipisci animi. Saepe iure consequuntur quaerat.
            </div>  

          </div>
        </div>
      </section>
      <div className="divider mt-[14vh]"></div>
      
      <section className=" mx-10 flex items-center gap-5 flex-wrap mt-10">
        { collNfts.map(nft => (
        <div className="card w-[250px] bg-base-100 shadow-xl">
          <figure>
            <img src={nft.media[0].gateway} alt={`imagen del nft ${nft.title}`}/>
          </figure>
          <div className="card-body">
            <p>{nft.title}</p>
          </div>

        </div>
        ))}
      </section>

    </MainLayout>
  );
};

export default CollectionPage;

import axios from "axios";
import { Collection, PrismaClient } from "@prisma/client";

export const getServerSideProps: GetServerSideProps = async () => {
  const prisma = new PrismaClient(); 
  const colAddress = "0xED5AF388653567Af2F388E6224dC7C4b3241C544";

  const collData = await prisma.collection.findUnique({
    where: {
      address: (colAddress as string) || "",
    },
  });

  
    const { data } = await axios.get(
      `https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.ALCHEMY_API_KEY}/getNFTsForCollection?contractAddress=0xED5AF388653567Af2F388E6224dC7C4b3241C544`
    );

    return {
      props: {
        collection: collData,
        collNfts: data.nfts,
      },
    };
};

