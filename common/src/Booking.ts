import { Rental } from "./Rental";

export interface Booking {
    _id: string;
    rental: Rental;
    startAt: Date;
    endAt: Date;
    totalCost: number;
    guests: number;
    user: string;
    createdAt: Date;
}
