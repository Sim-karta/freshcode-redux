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
  reducers: {}
})

const { reducer, actions } = tasksSLice

export default reducer
