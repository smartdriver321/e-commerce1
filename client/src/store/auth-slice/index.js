import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isAuthenticated: false,
	isLoading: true,
	user: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: () => {},
	},
})

export const { setUser } = authSlice.actions
export default authSlice.reducer
