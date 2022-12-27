import {createSlice, current} from '@reduxjs/toolkit';

interface UserType {
    loginUser: {}
}

const initialState = {

    loginUser: {},
    

} as UserType

const loginSlice = createSlice({
    
    name: 'login',

    initialState,
    
    reducers: {
    
        loginuser:(state, action) => {

            state.loginUser = action.payload

           

        },

    }
})

export const {loginuser} = loginSlice.actions;

export default loginSlice.reducer;