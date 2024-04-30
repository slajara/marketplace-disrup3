// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import { data } from 'autoprefixer'
import type { NextApiRequest, NextApiResponse } from 'next'
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(!(req.method === "POST")) return res.status(400).json({message: "unauthorized"})

  const {nftAddress} = req.body
  
  try {
    if (!await prisma.collection.findUnique({where: {address: nftAddress}})) {
      await prisma.collection.create({
        data: {
          address: nftAddress
        }
      })
    }
  
    await prisma.listing.create(
      {
          data: {
              ...req.body
          }
      }
    )
  res.status(200).json({message: "ok"})
    
  } catch (error) {
    console.log(error)
  res.status(500).json({message: "something went wrong"})

  }
 
}