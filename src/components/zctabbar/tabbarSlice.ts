import { createSlice,  PayloadAction } from '@reduxjs/toolkit'



// type InitialState = {
//     numOfCakes: number
//   }
//   const initialState: InitialState = {
//     numOfCakes: 20
//   }

//   const cakeSlice = createSlice({
//     name: 'cake',
//     initialState,
//     reducers: {
//       ordered: state => {
//         state.numOfCakes--
//       },
//       restocked: (state, action: PayloadAction<number>) => {
//         state.numOfCakes += action.payload
//       }
//     }
//   })

//   export default cakeSlice.reducer
//   export const { ordered, restocked } = cakeSlice.actions


type InitialState = {
    curOfselected: number
}

const initialState: InitialState = {
    curOfselected: 0

}
 const tabbarSlice = createSlice({
    name:'tab',
    initialState,
    reducers:{
        selectTabbar:(state, action:PayloadAction<number>) => {
            state.curOfselected = action.payload;
        }
    }
})
export default tabbarSlice.reducer;
export const {selectTabbar} = tabbarSlice.actions;
