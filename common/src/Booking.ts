export interface Booking {
    _id: string,
    rentalId: string,
    startAt: Date,
    endAt: Date,
    totalCost: number,
    guests: number
}
