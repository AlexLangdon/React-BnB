import { Booking } from "react-bnb-common";
import { axiosService } from "services/AxiosService";

export const createBooking = (booking: Booking) => {
    return axiosService.reactBnBAxios.post("/bookings/create", booking)
        .then(res => res.data);
};
