import {createSlice, current} from '@reduxjs/toolkit';


interface UserType {
    userList: Array<Object>
}

const initialState = {

    userList: [],
    

} as UserType

const userSlice = createSlice({
    
    name: 'user',

    initialState,
    
    reducers: {
    
        adduser:(state, action) => {

            let currentState = current(state)

           
            // state.userList = [action?.payload]
           state.userList  = [...currentState.userList,action?.payload] 

        },

        updateuser : (state, action) => {

            const {userName,payableFees}  = action.payload
            let currentUser:any = current(state).userList.find((user: any) => user.userName === userName)

            if(currentUser.hasOwnProperty('payableFees')){
                
              
                    const {feesPaid,totalFees} =action.payload
                let UpdatedUser= {...currentUser,feesPaid,totalFees}
                    state.userList =  current(state).userList.filter((user:any)=> user.userName !== userName );
                    console.log("State",state.userList)
                    state.userList = current(state).userList.concat(UpdatedUser);
                    console.log("Updated State" , state.userList);

            }
          
            else {
               
                let UpdatedUser= {...currentUser,payableFees}
                state.userList =  current(state).userList.filter((user:any)=> user.userName !== userName );
                console.log("State",state.userList)
                state.userList = current(state).userList.concat(UpdatedUser);
                console.log("Updated State" , state.userList);


            }
           
                
            
            
        }
          

    }
})

export const {adduser,updateuser} = userSlice.actions;

export default userSlice.reducer;