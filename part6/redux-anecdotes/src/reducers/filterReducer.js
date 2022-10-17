import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    applyFilter(state, action) {
      state = action.payload
      return state
    }
  },
})

export const { applyFilter } = filterSlice.actions
export default filterSlice.reducer
