import { AxiosRequestConfig } from "axios";
import { CreateBookingRequest } from "react-bnb-common";
import { axiosService } from "services/AxiosService";

export function createBooking(req: CreateBookingRequest) {
    return axiosService.reactBnBAxios.post("/bookings/create", req)
        .then(res => res.data);
}

export function getBookingsForRental(rental: string) {
    const config: AxiosRequestConfig = {
        params: {
            rental
        }
    };
    return axiosService.reactBnBAxios.get("/bookings", config)
        .then(res => res.data);
}

export function getCurrentUserBookings() {
    return axiosService.reactBnBAxios.get("/bookings/mine")
        .then(res => res.data);
}

export function cancelBooking(bookingId: string) {
    return axiosService.reactBnBAxios.delete(`/bookings/${bookingId}`)
        .then(res => res.data);
}

