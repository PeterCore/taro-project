import { cloudFunction } from '@/services/cloudFunction';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'


export interface Grade {
    _id: string
    grade: string
}

type InitialState = {
    loading: boolean
    grades: Grade[]
    error: string
}

const initialState: InitialState = {
    loading: false,
    grades: [],
    error: ''
}

export const fetchGrades = createAsyncThunk('grades/fetchGrades', async ()=>{
    const res = await cloudFunction({ name: "getGrades" });
  return res;
});

const gradesSlice = createSlice({name: "grades", initialState,  reducers: {},
extraReducers: builder => {
  builder.addCase(fetchGrades.pending, state => {
    state.loading = true
  })
  builder.addCase(
    fetchGrades.fulfilled,
    (state, action: PayloadAction<Grade[]>) => {
      state.loading = false
      state.grades = action.payload
      state.error = ''
    }
  )
  builder.addCase(fetchGrades.rejected, (state, action) => {
    state.loading = false
    state.grades = []
    state.error = action.error.message || 'Something went wrong'
  })
}});

export default gradesSlice.reducer
