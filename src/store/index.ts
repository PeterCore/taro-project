import { configureStore } from '@reduxjs/toolkit'
import courseReducer from '@/pages/add_children/courseSlice'
import thasAccountReducer from '@/pages/login/verifyAccountSlice'
import accountReducer from '@/pages/user/userInfoSlice'
import gradesReducer from '@/pages/add_children/gradeSlice'

const store = configureStore({
  reducer: {
    course: courseReducer,
    thas: thasAccountReducer,
    account:accountReducer,
    grades: gradesReducer
  }
})

export default store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
