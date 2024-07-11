import { configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from "../features/userDetailsSlice";

export const store = configureStore({
    reducer:{
        userDetailsData:userDetailsReducer
    }
})