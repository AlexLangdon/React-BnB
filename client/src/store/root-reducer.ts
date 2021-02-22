import { combineReducers } from "redux";
import rentalsState from "./slices/rentals";
import userState from "./slices/user";

const rootReducer = combineReducers({
	rentalsState,
	userState
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;