import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "react-bnb-common";
import { RootState } from "store/root-reducer";

interface UserStoreState {
	user: User | null;
}

const initialState: UserStoreState = {
	user: null
};

const userSlice = createSlice({
	name: "userState",
	initialState,
	reducers: {
		setCurrentUser(state: UserStoreState, action: PayloadAction<User | null>): UserStoreState {
			return {
				user: action.payload
			};
		}
	}
});

export const userSelector = createSelector(
	(state: RootState) => state.userState,
	(userState: UserStoreState) => userState.user
);

export default userSlice.reducer;