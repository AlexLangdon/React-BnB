import { AxiosRequestConfig } from "axios";
import { Booking } from "react-bnb-common";
import { axiosService } from "services/AxiosService";

export const createBooking = (booking: Booking) => {
    return axiosService.reactBnBAxios.post("/bookings/create", booking)
        .then(res => res.data);
};

export const getBookingsForRental = (rentalId: string) => {
    const config: AxiosRequestConfig = {
        params: {
            rentalId
        }
    };
    return axiosService.reactBnBAxios.get("/bookings", config)
        .then(res => res.data);
};
