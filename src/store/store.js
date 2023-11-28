import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { homeReducer } from "../Pages/HomePage/HomeReducer";


let rootReducer = combineReducers({
    homeReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))