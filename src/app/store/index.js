import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from '../../entities/task/model/tasksSlice'

const store = configureStore({
  reducer: {
    tasksList: tasksReducer
  }
})

export default store
