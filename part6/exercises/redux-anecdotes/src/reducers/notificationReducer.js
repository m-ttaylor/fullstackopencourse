import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: 'initial notification' }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    changeNotification(state, action) {
      const message = action.payload
      return { message }
    },
  }
})

export const { changeNotification } = notificationSlice.actions
export default notificationSlice.reducer