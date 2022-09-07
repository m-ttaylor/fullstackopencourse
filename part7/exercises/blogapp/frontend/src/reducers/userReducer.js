import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: { token: null, username: '', name: '' },
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const updateUser = (user) => {
  console.log('test')
  return async (dispatch) => {
    dispatch(setUser(user))
  }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer
