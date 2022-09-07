import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setusers(state, action) {
      return action.payload
    },
  },
})

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setusers(users))
  }
}

export const { setusers } = usersSlice.actions
export default usersSlice.reducer
