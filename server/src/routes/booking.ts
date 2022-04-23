import { allowOnlyAuthUser } from "../controller/user";
import express, { Router } from "express";
import { Booking } from "react-bnb-common";
import { BookingModel } from "../models/booking";
import { UserDocument } from "models/user";

const router: Router = express.Router();

router.post("/create", allowOnlyAuthUser, async (req, res) => {
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
        const foundUser: UserDocument = res.locals.user;
        const booking = new BookingModel({
            ...bookingData,
            userId: foundUser._id
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