import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const loginUserLocalStorage = () => {
  // Sets state according to localStoragge contents
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    } else {
      dispatch(setUser(null))
    }
  }
}

export const loginUser = (credentials) => {
  // Logs in user (backend api) and sets the redux state
  // Returns object with status and data
  return async dispatch => {
    try {
      const loginData = await loginService.login(credentials)
      dispatch(setUser(loginData))
      window.localStorage.setItem('loggedUser', JSON.stringify(loginData))
      return { status: true, data: loginData }
    } catch (exc) {
      return { status: false, data: exc }
    }
  }
}

export const { setUser } = loginSlice.actions
export default loginSlice.reducer