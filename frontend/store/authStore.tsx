import { createSlice, configureStore } from '@reduxjs/toolkit'
import User from '../types/User'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: '',
    user: { name: '', email: '', id: 0 },
    loggedIn: false
  },
  reducers: {
    login: state => {
      const accessToken = localStorage.getItem('access_token')
      const userStr = localStorage.getItem('user')
      if (!accessToken || !userStr)
        return;

      const user: User = userStr ? JSON.parse(userStr) : null

      state.loggedIn = true
      state.accessToken = accessToken ? accessToken : ''
      state.user = user
    },
    logout: state => {
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')

      state.loggedIn = false;
      state.user = { name: '', email: '', id: 0 }
      state.accessToken = ''
    }
  }
})

export const { login, logout } = authSlice.actions

export const authStore = configureStore({
  reducer: authSlice.reducer
})