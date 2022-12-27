import { createSlice, current } from "@reduxjs/toolkit";



type Object = {

    profilePath: string,
    firstName: String,
    lastName: String,
    email: string,
    userName: string,
    systemRole: String,
    payableFees?: number,
    feesPaid?: number,


  }

interface TrainerType {
    trainerList: Object[]
}
const initialState = {

    trainerList: []

} as TrainerType

const trainerSlice = createSlice({

    name: 'trainer',

    initialState,

    reducers: {
        addtrainer: (state, action) => {
            let currentState = current(state)

          
             state.trainerList = [...currentState.trainerList, action?.payload];



        },

        removetrainer: (state, action) => {
         
            state.trainerList = state.trainerList.filter(( item:any )=> item.trainerid !== action.payload)
        }
    }

})

export const { addtrainer, removetrainer } = trainerSlice.actions;

export default trainerSlice.reducer;