import { Document, Schema, Types } from "mongoose";
import mongoose from "mongoose";

interface Booking {
    rental: Types.ObjectId;
    startAt: Date;
    endAt: Date;
    totalCost: number;
    guests: number;
    user: Types.ObjectId;
    createdAt: Date;
}

export interface BookingDocument extends Booking, Document {}

const bookingSchema = new Schema<BookingDocument>({
    rental: { type: Schema.Types.ObjectId, ref: "Rental", required: true },
    startAt: { type: Date, required: "Starting date is required" },
    endAt: { type: Date, required: "Ending date is required" },
    totalCost: { type: Number, required: true },
    guests: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now }
});

export const BookingModel = mongoose.model("Booking", bookingSchema);