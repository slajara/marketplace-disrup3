import { withSessionRoute } from "@/utils/ironSession";
import {  PrismaClient } from "@prisma/client";
import {NextApiRequest, NextApiResponse} from  "next"
import {SiweMessage} from "siwe"

const prisma = new PrismaClient()

const handler = async  (req: NextApiRequest, res: NextApiResponse) => {
    switch(req.method) {
        case "POST":
            try {
                // recibir mensaje y firma del frontend
                const {signature, message} = req.body;
                const siweMessage = new SiweMessage(message);
                // comparar la firma con el mensaje y comprobar que venga del address que dice ser 
                const fields = await siweMessage.verify({signature});

                if(fields.data.nonce !== req.session.nonce) {
                    return res.status(400).json({success: false});
                }

                req.session.siwe = siweMessage;
                // checkear si el usuario existe en nuestra db 
                // si no existe crear nuevo usuario 

                let user;
                
                user = await prisma.user.findUnique({
                    where: {
                        address: fields.data.address
                    }
                })

                if(!user) {
                    user = await prisma.user.create({
                        data: {
                            address: fields.data.address,
                            userName: fields.data.address
                        }
                    })
                }

                req.session.user = {
                    address: user.address,
                    role: user.role
                }
                
                await req.session.save()
                return res.status(200).json({success: true})
            // si la firma es correcta, actualizamos e objeto session y autenticamos al usuario 
                
            } catch (error) {
                return res.status(400).json({success: false})
            }
            
        default: 
            // DEVOLVER QUE SOLO ACEPTAMOS METODO GET 
            res.status(400).json({message: "error"})
    }
}


export default withSessionRoute(handler);