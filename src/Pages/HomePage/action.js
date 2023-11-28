import axios from "axios"
import { DataFetchFailure, DataFetchRequest, DataFetchSuccess } from "./actionTypes"


export const dataFetch = (para) => (dispatch) => {
    dispatch({ type: DataFetchRequest })
    axios({
        method: "get",
        url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR`,
        params: { para, per_page: 10 }
    })
        .then((res) => { dispatch({ type: DataFetchSuccess, payload: res.data }) })
        .catch((err) => { dispatch({ type: DataFetchFailure }); console.log(err) })
}