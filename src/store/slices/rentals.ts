import { createSelector, createSlice, OutputSelector } from "@reduxjs/toolkit";
import { RentalOption } from "models/RentalOption";
import { RootState } from "store/root-reducer";

interface RentalStoreState {
	rentals: Array<RentalOption>;
}

const generateInitialRentals = (): Array<RentalOption> => (
	new Array(10).fill(null).map((_, i) => ({
		id: i.toString(),
		title: "Modern apartment in city center",
		city: "London",
		category: "Apartment",
		imageSrc: "http://via.placeholder.com/300x200",
		numRooms: 1,
		shared: false,
		description: "Stylish third floor apartment in the heart of London",
		dailyPrice: 100
	}))
);

const initialState: RentalStoreState = {
	rentals: generateInitialRentals()
};

const rentalsSlice = createSlice({
	name: "rentalsState",
	initialState,
	reducers: {}
});

export const rentalsSelector = createSelector(
	(state: RootState) => state.rentalsState,
	(rentalState: RentalStoreState) => rentalState.rentals
);

export const rentalsByIdSelectorFactory = (id: string): OutputSelector<
	RootState,
	RentalOption | undefined,
	(rentals: Array<RentalOption>) => RentalOption | undefined
> => {
	return createSelector(
		rentalsSelector,
		(rentals: Array<RentalOption>) => rentals.find(rental => rental.id === id)
	);
};

export default rentalsSlice.reducer;