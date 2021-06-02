import { createSlice, configureStore } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: '',
    user: {},
    loggedIn: false
  },
  reducers: {
    login: state => {
      const accessToken = localStorage.getItem('access_token')
      const userStr = localStorage.getItem('user')
      const user: {
        id: number,
        name: string,
        email: string
      } = userStr ? JSON.parse(userStr) : null

      state.loggedIn = true
      state.accessToken = accessToken ? accessToken : ''
      state.user = user
    },
    logout: state => {
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')

      state.loggedIn = false;
      state.user = {}
      state.accessToken = ''
    }
  }
})

export const { login, logout } = authSlice.actions

export const authStore = configureStore({
  reducer: authSlice.reducer
})