import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return state = action.payload
    },
    hideNotification(state) { 
      return state = null
    }
  },
})

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer
