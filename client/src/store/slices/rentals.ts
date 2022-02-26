import { createSelector, createSlice, OutputSelector, PayloadAction } from "@reduxjs/toolkit";
import { Rental } from "react-bnb-common";
import { RootState } from "store/root-reducer";
import axios from "axios";
import { CloudinaryImage } from "react-bnb-common/src/CloudinaryImage";

interface RentalStoreState {
	rentals: Array<Rental>;
}

const initialState: RentalStoreState = {
	rentals: []
};

const rentalsSlice = createSlice({
	name: "rentalsState",
	initialState,
	reducers: {
		setRentals(state: RentalStoreState, action: PayloadAction<Array<Rental>>): RentalStoreState {
			return {
				rentals: action.payload
			};
		}
	}
});

export const uploadImage = (image: File): Promise<CloudinaryImage> => {
	const formData = new FormData();
	formData.append("image", image, image.name);

	return axios.post("api/image-upload", formData).then(res => res.data);
};

export const rentalsSelector = createSelector(
	(state: RootState) => state.rentalsState,
	(rentalState: RentalStoreState) => rentalState.rentals
);

export const rentalsByIdSelectorFactory = (id: string): OutputSelector<
	RootState,
	Rental | undefined,
	(rentals: Array<Rental>) => Rental | undefined
> => {
	return createSelector(
		rentalsSelector,
		(rentals: Array<Rental>) => rentals.find(rental => rental._id === id)
	);
};

export const {
	setRentals
} = rentalsSlice.actions;
export default rentalsSlice.reducer;