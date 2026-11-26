import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
  tasks: [
    {
      id: uuidv4(),
      body: 'Вивчити основи Redux Toolkit',
      isDone: false,
      deadline: '2026-11-01'
    },
    {
      id: uuidv4(),
      body: 'Підключити Formik та Yup до форми',
      isDone: true,
      deadline: '2026-10-20'
    }
  ]
}

const tasksSLice = createSlice({
  initialState,
  name: 'tasks',
  reducers: {
    addTask: (state, { payload }) => {
      state.tasks = [
        ...state.tasks,
        { id: uuidv4(), isDone: false, ...payload }
      ]
    },
    deleteTask: (state, { payload }) => {
      state.tasks = state.tasks.filter(task => task.id !== payload)
    },
    updateTask: (state, { payload }) => {
      const taskIndex = state.tasks.findIndex(task => task.id === payload.id)
      state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...payload.body }
    }
  }
})

const { reducer, actions } = tasksSLice

export const { addTask, deleteTask, updateTask } = actions

export default reducer
