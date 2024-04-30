import { withSessionRoute } from "@/utils/ironSession";
import {NextApiRequest, NextApiResponse} from  "next"
import {generateNonce} from "siwe"

const handler = async  (req: NextApiRequest, res: NextApiResponse) => {
    switch(req.method) {
        case "GET":
            // LOGICA DEL ENDPOINT            
            // devolver un nonce aleatorio
            const nonce = generateNonce();
            console.log(nonce);
            req.session.nonce = nonce;
            await req.session.save()
            res.status(200).json({nonce});
            break;
        default: 
            // DEVOLVER QUE SOLO ACEPTAMOS METODO GET 
            res.status(400).json({message: "ONLY METHOD GET ALLOWED"})
    }
}


export default withSessionRoute(handler);