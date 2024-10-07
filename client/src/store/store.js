import { configureStore } from '@reduxjs/toolkit'

import authSlice from './auth-slice'
import adminProductsSlice from './admin/products-slice'

const store = configureStore({
	reducer: {
		auth: authSlice,

		adminProducts: adminProductsSlice,
	},
})

export default store
