import { configureStore } from '@reduxjs/toolkit'

import authSlice from './auth-slice'
import adminProductsSlice from './admin/products-slice'
import shopProductsSlice from './shop/products-slice'

const store = configureStore({
	reducer: {
		auth: authSlice,

		adminProducts: adminProductsSlice,
		shopProducts: shopProductsSlice,
	},
})

export default store
