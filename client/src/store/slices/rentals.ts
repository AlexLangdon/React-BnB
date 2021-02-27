import { createSelector, createSlice, OutputSelector, PayloadAction } from "@reduxjs/toolkit";
import { Rental } from "react-bnb-common";
import { RootState } from "store/root-reducer";

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
		(rentals: Array<Rental>) => rentals.find(rental => rental.id === id)
	);
};

export const {
	setRentals
} = rentalsSlice.actions;
export default rentalsSlice.reducer;