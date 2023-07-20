import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit'
import exerciseService from './exerciseService'
const initialState = {
  exercises: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}
// Create exercise
export const createExercise = createAsyncThunk(
  'exercise/create',
  async (exerciseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      // console.log(token)
      return await exerciseService.createExercise(exerciseData, token)
    } catch (error) {
      // console.log(
      //   'error on add exercise ->',
      //   error.response.data.errors.map((item) => item.msg).toString()
      // )
      const message =
        error.response.data.message ||
        error.response.data.errors.map((item) => item.msg).toString() ||
        error.response ||
        error.response.data ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// Get Exercises
export const getExercises = createAsyncThunk(
  'exercise/get',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await exerciseService.getExercises(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete Exercise
export const deleteExercise = createAsyncThunk(
  'exercise/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      // console.log(token)
      return await exerciseService.deleteExercise(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// Update Exercise
export const updateExercise = createAsyncThunk(
  'exercise/update',
  async (update, thunkAPI) => {
    try {
      // console.log('exerciseId reached in Slice', exerciseId)
      const token = thunkAPI.getState().auth.user.token
      return await exerciseService.updateExercise(update, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
export const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {
    resetExercises: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createExercise.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createExercise.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createExercise.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.exercises.push(action.payload)
      })
      .addCase(getExercises.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getExercises.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getExercises.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.exercises = action.payload
      })
      .addCase(deleteExercise.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteExercise.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteExercise.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.exercises = state.exercises.filter(
          (exercise) => exercise._id !== action.payload.id
        )
      })
      .addCase(updateExercise.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateExercise.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateExercise.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.exercises = action.payload
      })
  },
})

export const { resetExercises } = exerciseSlice.actions

export default exerciseSlice.reducer