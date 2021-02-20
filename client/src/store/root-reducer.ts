import { combineReducers } from "redux";
import rentalsState from "./slices/rentals";

const rootReducer = combineReducers({
	rentalsState
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;