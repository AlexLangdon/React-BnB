import { createSelector, createSlice, OutputSelector, PayloadAction } from "@reduxjs/toolkit";
import { RentalOption } from "react-bnb-common";
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
		dailyPrice: 100,
		amenities: [
			"Air Conditioning",
			"Dishwasher",
			"Dryer",
			"Free Breakfast",
			"Free Parking",
			"Fridge Freezer",
			"Heating",
			"Washing Machine",
			"Wifi",
			"Work Area"
		]
	}))
);

const initialState: RentalStoreState = {
	rentals: []
};

const rentalsSlice = createSlice({
	name: "rentalsState",
	initialState,
	reducers: {
		setRentals(state: RentalStoreState, action: PayloadAction<Array<RentalOption>>): RentalStoreState {
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
	RentalOption | undefined,
	(rentals: Array<RentalOption>) => RentalOption | undefined
> => {
	return createSelector(
		rentalsSelector,
		(rentals: Array<RentalOption>) => rentals.find(rental => rental.id === id)
	);
};

export const {
	setRentals
} = rentalsSlice.actions;
export default rentalsSlice.reducer;