import {createSlice} from '@reduxjs/toolkit';


const traineeSlice = createSlice({

    name : 'trainee',
    
    initialState: [] as Array<Object>,

    reducers : {

        addtrainee(state, action) {

            return  [...state,action.payload ]
        }, 

        removetrainee( state, action) {

            state.filter((item:any)=> item.id !== action.payload)

        }

    }



})

export const {addtrainee , removetrainee} = traineeSlice.actions

export default  traineeSlice.reducer;
