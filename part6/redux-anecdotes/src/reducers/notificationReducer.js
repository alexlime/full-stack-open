import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return action.payload
    }
  },
})


let timeID = null

export const setNotification = (content, seconds) => {

  return async (dispatch, getState) => {

    dispatch(showNotification(content))

    if (timeID) {
      clearTimeout(timeID)
    }

    timeID = setTimeout(() => {
      dispatch(showNotification(null))
    }, seconds * 1000)

  }
}

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer
