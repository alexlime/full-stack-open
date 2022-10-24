import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    content: null,
    timeID: null
  },
  reducers: {
    showNotification(state, action) {
      return state = action.payload
    },
    hideNotification(state) { 
      return state = {content: null, timeID: null}
    }
  },
})

export const setNotification = (content, seconds) => {

  return async (dispatch, getState) => {

    // Clear previous timeout using getState method
    clearTimeout(getState().notification.timeID)

    const timeID = setTimeout(() => {
      dispatch(hideNotification())
    }, seconds * 1000)

    dispatch(showNotification({content, timeID}))
    
  }
}

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer
