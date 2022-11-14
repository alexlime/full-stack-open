import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'

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
  // Logs in user and sets the state
  return async dispatch => {
    try {
      const loginData = await loginService.login(credentials)
      dispatch(setUser(loginData))
      window.localStorage.setItem('loggedUser', JSON.stringify(loginData))
    } catch (exc) {
      console.log(exc)
    } 
  }
}

export const { setUser } = loginSlice.actions
export default loginSlice.reducer