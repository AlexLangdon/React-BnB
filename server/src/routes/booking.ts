import express, { Router } from "express";
import { UserDocument } from "models/user";
import moment from "moment";
import { CreateBookingRequest } from "react-bnb-common";
import { allowOnlyAuthUser } from "../controller/user";
import { BookingDocument, BookingModel } from "../models/booking";

const router: Router = express.Router();

router.post("/create", allowOnlyAuthUser, async (req, res) => {
    const bookingReq: CreateBookingRequest = req.body;

    if(!(await isBookingValid(bookingReq))) {
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
            ...bookingReq,
            user: foundUser._id
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

    const bookingsForRental = await BookingModel.find({rental: rentalId});

    return res.json(bookingsForRental);
});

router.get("/mine", allowOnlyAuthUser, async (_, res) => {
    const {user} = res.locals;

    const bookingsForUser = await BookingModel.find({user});

    return res.json(bookingsForUser);
});

router.delete("/:bookingId", allowOnlyAuthUser, async (req, res) => {
    const {bookingId} = req.params;
    const {user} = res.locals;

    try {
        const booking: BookingDocument | null = await BookingModel.findById(bookingId);

        if(!booking) {
            return res.status(404);
        }

        if(!booking.user.equals(user)) {
            return res.status(401);
        }

        await booking.remove();
        return res.json({id: booking});
    } catch(error) {
        return res.status(500);
    }
});

async function isBookingValid(booking: CreateBookingRequest): Promise<boolean> {
    const bookingsForRental = await BookingModel.find({rental: booking.rental});

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