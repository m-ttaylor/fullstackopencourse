import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '' }

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

export const setNotification = (message, timeout) => {
  return async dispatch => {
    dispatch(changeNotification(message))
    setTimeout(() => {
      dispatch(changeNotification(''))
    }, timeout*1000)
  }
}

export const { changeNotification } = notificationSlice.actions
export default notificationSlice.reducer