import MainLayout from "@/components/layouts/MainLayout";
import React from "react";

//TODO: Mostrar colecciones
//
type collection = {
  title: string;
  desc: string;
  img: string;
  fp: number;
};

type PageProps = {
  collections: collection[];
};

const explore: NextPage<PageProps> = (ctx) => {
  const { collections } = ctx;

  return (
    <MainLayout>
      <div className="m-5">
        <h2 className="text-4xl font-bold text-primary text-center mb-2">
          Explora las mejores colecciones NFT
        </h2>
        <p className="text-center text-xl opacity-80">
          Browse between the collections listed in our marketplace
        </p>
      </div>

      <div className="flex flex-wrap gap-5 m-auto w-[80%] justify-center mt-14 mb-10">
        {collections.map((collection) => (
          <div
            key={collection.title}
            className="card w-[150px] md:w-[240px] bg-base shadow-xl cursor-pointer hover:scale-105 transition-all ease-linear"
          >
            <figure>
              <img src={collection.img} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h3 className="text-accent">{collection.title}</h3>
              <p className="text-base opacity-80">{collection.desc}</p>
              <p className=" opacity-80">
                Floor price:{" "}
                <span className="text-primary">{collection.fp} ETH</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default explore;

import { GetServerSideProps, NextPage } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const collections = await (
    await fetch("http://localhost:3000/api/getCollections")
  ).json();

  return {
    props: {
      collections,
    },
  };
};
