import { cloudFunction } from '@/services/cloudFunction';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export interface VAccount{
    phone: string
}

type InitialState = {
    loading: boolean
    hasAccount: boolean
    error: string
}

const initialState: InitialState = {
    loading: false,
    hasAccount: false,
    error: ''
}


export const thasAccount = createAsyncThunk('thas/t_has_account', async (params)=>{
    return cloudFunction({ name: "t_has_account" , data: {userinfo: params}}).then((res) => res);
});

const tHasAccountSlice = createSlice({name: "thas", initialState,  reducers: {},
extraReducers: builder => {
  builder.addCase(thasAccount.pending, state => {
    state.loading = true
  })
  builder.addCase(
    thasAccount.fulfilled,
    (state, action: PayloadAction<boolean>) => {
      state.loading = false
      state.hasAccount = action.payload
      state.error = ''
    }
  )
  builder.addCase(thasAccount.rejected, (state, action) => {
    state.loading = false
    state.hasAccount = false
    state.error = action.error.message || 'Something went wrong'
  })
}});
export default tHasAccountSlice.reducer
