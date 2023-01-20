import { createSlice } from "@reduxjs/toolkit";

const AppSlice = createSlice({
    name:"AppSlice",
    initialState:{
        formVisibility:false,
        tasks:[{
            title:"Exemple",
            description:"This is one exemple of task",
            status:"toDo"
        }]
    },
    reducers:{
        showForm:(state) => {
            return {...state, formVisibility:true}
        },
        hideForm:(state) => {
            return {...state, formVisibility:false}
        }
    },
    extraReducers: builder => {}
})

export const {showForm, hideForm} = AppSlice.actions
export default AppSlice.reducer