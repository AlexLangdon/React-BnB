import { AxiosRequestConfig } from "axios";
import { Booking, CreateBookingRequest } from "react-bnb-common";
import { axiosService } from "services/AxiosService";

export function createBooking(req: CreateBookingRequest): Promise<Booking> {
    return axiosService.reactBnBAxios.post<Booking>("/bookings/create", req)
        .then(res => res.data);
}

export function getBookingsForRental(rental: string): Promise<Array<Booking>> {
    const config: AxiosRequestConfig = {
        params: {
            rental
        }
    };
    return axiosService.reactBnBAxios.get<Array<Booking>>("/bookings", config)
        .then(res => res.data);
}

export function getCurrentUserBookings(): Promise<Array<Booking>> {
    return axiosService.reactBnBAxios.get("/bookings/mine")
        .then(res => res.data);
}

export function getReceivedBookings(): Promise<Array<Booking>> {
    return axiosService.reactBnBAxios.get("/bookings/received")
        .then(res => res.data);
}

export function cancelBooking(bookingId: string): Promise<Booking> {
    return axiosService.reactBnBAxios.delete<Booking>(`/bookings/${bookingId}`)
        .then(res => res.data);
}
