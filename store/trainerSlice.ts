import { createSlice, current } from "@reduxjs/toolkit";



type Object = {

   

    trainerid: number,
    uploadimage: string|undefined,
    firstName: string,
    lastName: string,
    email: string,
    birthdate: string,
    programplan: string,
    sex: string,


  }

type TrainerType = {
    trainerList:Object[]
}
const initialState : TrainerType= {

    trainerList: []

} 

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