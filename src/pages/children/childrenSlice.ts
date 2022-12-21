import { Item } from '@/components/ICell';
import { cloudFunction } from '@/services/cloudFunction';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export interface ChildCourseInfo {
  _id: string;
  name: string;
  grade: string;
  courses: string[];
}

// { code: 1, msg: '请添加课程', result: null }
type InitialState = {
  loading: boolean
  courses: ChildCourseInfo[]
  configs: Array<Array<Item>>
  error: string
}

const initialState: InitialState = {
  loading: false,
  courses: [],
  configs: [[]],
  error: ''
}

const configItems = (opt: ChildCourseInfo) => {
  var items: Item[] = [];
  let key: (keyof ChildCourseInfo);
  for (key in opt) {
    var key_str = key as string;
    if(key_str ==='name'){
      items.push({title:"姓名: ",content:(opt[key] as string )})
    }
     else if(key_str === 'grade'){
      items.push({title:"年级: ",content:(opt[key] as string ) })
    } else if(key_str === 'courses'){
      const courses: string[] = opt[key] as string[]
      items.push({title:"课程: ",content:courses.join(',') })
    }
  }
  console.log(items);
  return items.reverse();
}


export const getStdCourses = createAsyncThunk('ccs/get_students_course', ()=>{
  return cloudFunction({ name: "get_students_course" }).then((res) => res.result);
});

const stdCoursesSlice = createSlice({name: "ccs", initialState,  reducers: {},
extraReducers: builder => {
  builder.addCase(getStdCourses.pending, state => {
    state.loading = true
  })
  builder.addCase(
    getStdCourses.fulfilled,
    (state, action: PayloadAction<ChildCourseInfo[]>) => {
      state.loading = false
      state.courses = action.payload
      state.error = ''
      const configs: Array<Array<Item>> = [];
      if(action.payload.length){
        const items: ChildCourseInfo[] = action.payload
        for (let index = 0; index < items.length; index++) {
          const childItem = items[index];
          const config = configItems(childItem);
          configs.push(config);
        }
      }
      state.configs = configs;
    }
  )
  builder.addCase(getStdCourses.rejected, (state, action) => {
    state.loading = false
    state.courses = []
    state.error = action.error.message || 'Something went wrong'
  })
}});

export default stdCoursesSlice.reducer
