import { DataFetchFailure, DataFetchRequest, DataFetchSuccess } from "./actionTypes"


let initialData = {
    data: [],
    isLoading: false,
    isError: false
}

export const homeReducer = (state = initialData, { type, payload }) => {   
    switch (type) {
        case DataFetchRequest: return { ...state, isLoading: true }
        case DataFetchSuccess: return { ...state, isLoading: false, data: payload }
        case DataFetchFailure: return { ...state, isLoading: false, isError: true }
        default: return state
    }
}