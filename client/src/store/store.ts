import { applyMiddleware, createStore, Middleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "store/root-reducer";

const middleware: Array<Middleware> = [thunk];

if (process.env.NODE_ENV === "development") {
	middleware.push(logger);
}

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;