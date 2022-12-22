import { cloudFunction } from '@/services/cloudFunction';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export interface Course {
  _id: string;
  cname: string;
}


type InitialState = {
    loading: boolean
    courses: Course[]
    selecteds: string[]
    error: string
}

const initialState: InitialState = {
    loading: false,
    courses: [],
    selecteds: [],
    error: ''
}

export const fetchCourses = createAsyncThunk('course/fetchCourses', ()=>{
    return cloudFunction({ name: "getCourses" }).then((res) => res);
});

const courseSlice = createSlice({name: "course", initialState,  reducers: {
   addselectCourses:(state, action:PayloadAction<string[]> )=>{
    state.selecteds =action.payload
   },
   addCourse: (state, action:PayloadAction<string>) => {
      if(state.selecteds.indexOf(action.payload) == -1) {
        state.selecteds.push(action.payload);
      }
      console.log(`selecteds is ${state.selecteds}`);
   },
   deleteCourse:(state, action:PayloadAction<string> )=>{
     const index = state.selecteds.indexOf(action.payload);
    if(index!= -1) {
      state.selecteds.splice(index, 1);
    }
    console.log(`selecteds is ${state.selecteds}`);

   },
   deleteAll:(state)=>{
     state.selecteds = [];
     console.log(`selecteds is ${state.selecteds}`);
   },
   addAll:(state) => {
    var curSelected :string[] =[];
    state.courses.forEach((item, _) => {
      curSelected.push(item.cname);
    })
    state.selecteds = curSelected;
    console.log(`selecteds is ${state.selecteds}`);
   }

},
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
export const {addCourse, deleteCourse, addAll, deleteAll,addselectCourses } = courseSlice.actions;

// const userSlice = createSlice({})

