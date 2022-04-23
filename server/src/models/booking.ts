import { Schema } from "mongoose";
import mongoose from "mongoose";

const bookingSchema = new Schema({
    rentalId: { type: Schema.Types.ObjectId, ref: "Rental", required: true },
    startAt: { type: Date, required: "Starting date is required" },
    endAt: { type: Date, required: "Ending date is required" },
    totalCost: { type: Number, required: true },
    guests: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now }
});

export const BookingModel = mongoose.model("Booking", bookingSchema);