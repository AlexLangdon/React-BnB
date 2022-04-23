import { RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { CallbackError } from "mongoose";
import config from "../config";
import { UserDocument, UserModel } from "../models/user";

interface JwtUserPayload {
    sub: string;
    username: string;
}

export const allowOnlyAuthUser: RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return notAuthorized(res);
    }

    const decodedToken = extractHeaderToken(authHeader);
    if (!decodedToken) { 
        return notAuthorized(res); 
    }

    return UserModel.findById(decodedToken.sub, (error: CallbackError, foundUser: UserDocument) => {
        if(error) {
            return res.status(500);
        }

        if (foundUser) {
            res.locals.user = foundUser;
            next();
            return;
        } else {
            return notAuthorized(res);
        }
    });
};

function extractHeaderToken(authHeader: string) {
    try {
        const token = authHeader.split(" ")[1];
        return jwt.verify(token, config.JWT_SECRET) as JwtUserPayload;
    } catch(error) {
        return null;
    }
  }

function notAuthorized(res: Response) {
    return res
        .status(401)
        .send({errors: 
          [{title: "Not Authorized!", detail: "You need to log in to get an access!"}]});
}