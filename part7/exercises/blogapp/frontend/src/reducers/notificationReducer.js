import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: null, errorState: false }
let timeoutId

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    changeNotification(state, action) {
      const errorState = action.payload.errorState
      const message = action.payload.message
      return { message, errorState }
    },
  },
})

export const updateNotification = ({ message, errorState, timeout }) => {
  return async (dispatch) => {
    dispatch(changeNotification({ message, errorState }))
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      if (errorState) {
        dispatch(changeNotification({ message: null, errorState: false }))
      } else {
        dispatch(changeNotification({ errorState: false, message: null }))
      }
    }, timeout * 1000)
  }
}

export const { changeNotification, changeErrorState, changeAllState } =
  notificationSlice.actions
export default notificationSlice.reducer
