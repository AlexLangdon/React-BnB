import { allowOnlyAuthUser } from "../controller/user";
import express, { Router } from "express";
import { Booking } from "react-bnb-common";
import { BookingDocument, BookingModel } from "../models/booking";
import { UserDocument } from "models/user";
import moment from "moment";

const router: Router = express.Router();

router.post("/create", allowOnlyAuthUser, async (req, res) => {
    const bookingData: Booking = req.body;

    if(!(await isBookingValid(bookingData))) {
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

router.get("", async (req, res) => {
    const rentalId = req.query.rentalId as string;

    const bookingsForRental = await BookingModel.find({rentalId});

    return res.json(bookingsForRental);
});

async function isBookingValid(booking: Booking): Promise<boolean> {
    const bookingsForRental = await BookingModel.find({rentalId: booking.rentalId});

    const bookingStart = moment(booking.startAt);
    const bookingEnd = moment(booking.endAt);

    return bookingsForRental.every((otherBooking: BookingDocument) => {
        const otherBookingStart = moment(otherBooking.startAt);
        const otherBookingEnd = moment(otherBooking.endAt);

        // No date overlaps allowed
        return !bookingStart.isBetween(otherBookingStart, otherBookingEnd, undefined, "[]") &&
            !otherBookingStart.isBetween(bookingStart, bookingEnd, undefined, "[]");
    });
}

export default router;