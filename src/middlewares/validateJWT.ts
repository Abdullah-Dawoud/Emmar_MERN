import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel";

declare module "express-serve-static-core" {
    interface Request {
        user?: any; // Replace 'any' with your actual user type if you have one
    }
}

const validateJWt = (req: Request , res: Response, next: NextFunction) => {
    const authorizationHeader = req.get('Authorization');

    if(!authorizationHeader){
        res.status(403).send({message: 'Authorization header missing'})
        return;
    }
    const token = authorizationHeader.split(' ')[1];
    if(!token){
        res.status(403).send('Token missing')
        return;
    }
    jwt.verify(token, "+@DLCv{UE;z5p>7`%d~ja@i$L%-qPz", async (err,payload) => {
        if(err){
            res.status(403).send('Invalid token')
            return;
        }

        if(!payload){
            res.status(403).send("Invalid token payload")
            return;
        }

        const userPayload = payload as {
            email: string;
            firstName: string;
            lastName: string;
        }   

        //fetch user from database based on payload
        const user = await userModel.findOne({email: userPayload.email})
        req.user = user;
        next();
    });
};
export default validateJWt;