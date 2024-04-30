import { withSessionRoute } from "@/utils/ironSession";
import {NextApiRequest, NextApiResponse} from  "next"
import {generateNonce} from "siwe"

const handler = async  (req: NextApiRequest, res: NextApiResponse) => {
    switch(req.method) {
        case "GET":
            // obtener informacion de la sesion que viene en el objeto req
            // y devolver esa informacion si es todo correcto
            // si no destruiremos la sesion
            if(req.session.user) {
            
                return res.status(200).json({
                    isLoggedIn: true,
                    user: {
                        address: req.session.user?.address,
                        role: req.session.user?.role
                    }
                });
               } else {
                return res.status(200).json({isLoggedIn: false});
               }
      
        default: 
            // DEVOLVER QUE SOLO ACEPTAMOS METODO GET 
           return res.status(400).json({message: "ONLY METHOD GET ALLOWED"})
    }
}


export default withSessionRoute(handler);