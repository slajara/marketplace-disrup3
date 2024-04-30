import { withSessionRoute } from "@/utils/ironSession";
import { PrismaClient } from "@prisma/client";
import {NextApiRequest, NextApiResponse} from  "next"

const prisma = new PrismaClient()

const handler = async  (req: NextApiRequest, res: NextApiResponse) => {
    switch(req.method) {
        case "PATCH":
        const userAddress = req.session.user?.address;
        const { formData } = req.body;
        console.log(formData, "_-------------______---______--______--____")
         // comprobamos que el usuario esta autenticado 
         if(!userAddress) {
            return res.status(400).json({message: "no estas autorizado"})
         }

         
         const newUserData = await prisma.user.update({
            where: {
                address: userAddress
            },
            data: {
                description: formData.description || undefined,
                bannerImage: formData.bgImg || undefined,
                profileImage: formData.pImg || undefined,
                userName: formData.userName || undefined
            }
         })
         console.log(newUserData)
         return res.status(200).json({user: newUserData, message: "user updated"})
        default: 
            // DEVOLVER QUE SOLO ACEPTAMOS METODO GET 
           return res.status(400).json({message: "ONLY METHOD GET ALLOWED"})
    }
}


export default withSessionRoute(handler);