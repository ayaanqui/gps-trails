import { createSlice, configureStore } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: '',
    user: { name: '', email: '', id: 0 },
    loggedIn: false
  },
  reducers: {
    login: (state, { payload }) => {
      const aT = localStorage.getItem('access_token')
      if (!aT || aT.trim() === '')
        return;

      state.loggedIn = true
      state.accessToken = payload.accessToken
      state.user = {
        id: payload.user.id,
        name: payload.user.name,
        email: payload.user.email
      }
    },
    logout: state => {
      localStorage.removeItem('access_token')

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