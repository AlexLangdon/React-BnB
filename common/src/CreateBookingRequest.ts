export interface CreateBookingRequest {
    rental: string,
    startAt: Date,
    endAt: Date,
    totalCost: number,
    guests: number
}
