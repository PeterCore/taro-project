import { UserType } from '@/constants/constants'
import { createSlice,  PayloadAction } from '@reduxjs/toolkit'




type InitialState = {
    accountInfo: {avatarUrl: string, name: string, openid?: string, userType?:UserType }
}

const initialState: InitialState  = {
    accountInfo: {avatarUrl: "", name: "",}
}


const accountInfoSlice = createSlice({
    name:'account',
    initialState,
    reducers:{
        setAccountInfo:(state, action:PayloadAction<{avatarUrl: string, name: string, openid?:string,  userType?:UserType}>) => {
            state.accountInfo = action.payload;
        }
    }
})

export default accountInfoSlice.reducer;
export const {setAccountInfo} = accountInfoSlice.actions;
