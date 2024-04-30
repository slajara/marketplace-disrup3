import { withSessionRoute } from "@/utils/ironSession";
import {NextApiRequest, NextApiResponse} from  "next"


const handler = async  (req: NextApiRequest, res: NextApiResponse) => {
    switch(req.method) {
        case "GET":
            if(req.session.user) {
                req.session.destroy()
                return res.status(200).json({ok: true})
            } 
           return res.status(200).json({ok: false})                          
      
        default: 
            // DEVOLVER QUE SOLO ACEPTAMOS METODO GET 
           return res.status(400).json({message: "ONLY METHOD GET ALLOWED"})
    }
}


export default withSessionRoute(handler);