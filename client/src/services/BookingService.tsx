import { AxiosRequestConfig } from "axios";
import { CreateBookingRequest } from "react-bnb-common";
import { axiosService } from "services/AxiosService";

export const createBooking = (req: CreateBookingRequest) => {
    return axiosService.reactBnBAxios.post("/bookings/create", req)
        .then(res => res.data);
};

export const getBookingsForRental = (rental: string) => {
    const config: AxiosRequestConfig = {
        params: {
            rental
        }
    };
    return axiosService.reactBnBAxios.get("/bookings", config)
        .then(res => res.data);
};

export const getCurrentUserBookings = () => {
    return axiosService.reactBnBAxios.get("/bookings/mine")
        .then(res => res.data);
};

export const cancelBooking = (bookingId: string) => {
    return axiosService.reactBnBAxios.delete(`/bookings/${bookingId}`)
        .then(res => res.data);
};

