import express, { RequestHandler, Response, Router } from "express";
import { BookingModel } from "../models/booking";
import { Booking } from "react-bnb-common";
import config from "../config";
import jwt from "jsonwebtoken";
import { UserDocument, UserModel } from "../models/user";
import { CallbackError } from "mongoose";

const router: Router = express.Router();

interface JwtUserPayload {
    sub: string;
    username: string;
}

const onlyAuthUser: RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return notAuthorized(res);
    }

    const decodedToken = extractHeaderToken(authHeader);
    if (!decodedToken) { 
        return notAuthorized(res); 
    }

    UserModel.findById(decodedToken.sub, (error: CallbackError, foundUser: UserDocument) => {
        if(error) {
            // return res.mongoError(error);
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

router.post("/create", onlyAuthUser, async (req, res) => {
    const bookingData: Booking = req.body;

    if(!isBookingValid(bookingData)) {
        return res
            .status(400)
            .send({
                errors: [
                    {
                        title: "Invalid Booking Error",
                        detail: "Invalid Booking Error"
                    }
                ]
            });
    }

    try {
        const foundUser = res.locals.user;
        const booking = new BookingModel({
            ...bookingData,
            user: foundUser
        });
        const savedBooking = await booking.save();
        return res.json(savedBooking);
    } catch(saveError) {
        return res
            .status(422)
            .send({saveError});
    }
});

function isBookingValid(booking: Booking): boolean {
    console.log(booking);
    return true;
}

export default router;