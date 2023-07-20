import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import exerciseReducer from '../features/activities/exerciseSlice'
export default configureStore({
  reducer: {
    auth: authReducer,
    exercises: exerciseReducer,
  },
})