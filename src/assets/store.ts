import { configureStore } from "@reduxjs/toolkit";
import AppSlice from "./AppSlice";

export const store =  configureStore({
    reducer:{
    App: AppSlice        
    }
})