// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(!(req.method === "GET")) return res.status(400).json({message: "unauthorized"})

  res.status(200).json([
    {
        title: "Mr crypto",
        desc: "La colección nft top 1 en españa",
        img: "https://i.seadn.io/gae/v8Dg_YZ47r2dQKmhHokWOPXhRbQFXypOUyUI-c6lglCrG4YakL_mkYnBSBLFYTtU-HInJIA2gv5UGvxgPGElArgrwLFPX7KyFFc0?auto=format&w=1000",
        fp: 0.2
    },
    {
        title: "No solo un jpg",
        desc: "La colección nft top 1 en españa",
        img: "https://i.seadn.io/gae/pHVO7wz6NJ_2c1Wg4p6ecS5TR70j7TXpcdPKuVi67ywC65N62ZxhdGr6xVbYkk27mY2XkhpXy3SDJtXFeKHxh9Rcx8f5WdapMOE0VXc?auto=format&w=1000",
        fp: 0.1
    },
    {
        title: "Funny Apes",
        desc: "100% rug pull",
        img: "https://i.seadn.io/gae/BnaDnH10PLe3V0Z3mV8wTWkfX2tnsZ5t1K_gEUB390fBOEhijYoEFdWa22AGe2c9sCvD_oOAnALNtw9NgDdvYN-vt7P-BSsNFnD795Q?auto=format&w=1000",
        fp: 0.015
    },
    {
        title: "Azuki",
        desc: "La colección nft top 1 en españa",
        img: "https://i.seadn.io/gcs/files/29f9436a576394c58d9a11bb24b016e8.png?auto=format&w=1000",
        fp: 3
    },
])
}
