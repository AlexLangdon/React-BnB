import { Rental } from "react-bnb-common";
import { axiosService } from "services/AxiosService";

export function getCurrentUserRentals(): Promise<Array<Rental>> {
    return axiosService.reactBnBAxios.get("/rentals/mine")
        .then(res => res.data);
}

export function deleteRental(rentalId: string): Promise<Rental> {
    return axiosService.reactBnBAxios.delete(`/rentals/${rentalId}`)
        .then(res => res.data);
}