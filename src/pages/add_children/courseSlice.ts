import { cloudFunction } from '@/services/cloudFunction';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export interface Course {
  _id: string;
  cname: string;
}


type InitialState = {
    loading: boolean
    courses: Course[]
    error: string
}

const initialState: InitialState = {
    loading: false,
    courses: [],
    error: ''
}

export const fetchCourses = createAsyncThunk('course/fetchCourses', ()=>{
    return cloudFunction({ name: "getCourses" }).then((res) => res);
});

const courseSlice = createSlice({name: "course", initialState,  reducers: {},
extraReducers: builder => {
  builder.addCase(fetchCourses.pending, state => {
    state.loading = true
  })
  builder.addCase(
     fetchCourses.fulfilled,
    (state, action: PayloadAction<Course[]>) => {
      state.loading = false
      state.courses = action.payload
      state.error = ''
    }
  )
  builder.addCase(fetchCourses.rejected, (state, action) => {
    state.loading = false
    state.courses = []
    state.error = action.error.message || 'Something went wrong'
  })
}});

export default courseSlice.reducer

// const userSlice = createSlice({})

