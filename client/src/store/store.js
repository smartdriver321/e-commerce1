import { configureStore } from '@reduxjs/toolkit'

import authSlice from './auth-slice'
import adminProductsSlice from './admin/products-slice'
import adminOrderSlice from './admin/order-slice'
import shopProductsSlice from './shop/products-slice'
import shopOrderSlice from './shop/order-slice'
import shopCartSlice from './shop/cart-slice'
import shopAddressSlice from './shop/address-slice'

const store = configureStore({
	reducer: {
		auth: authSlice,

		adminProducts: adminProductsSlice,
		adminOrder: adminOrderSlice,

		shopProducts: shopProductsSlice,
		shopOrder: shopOrderSlice,

		shopCart: shopCartSlice,
		shopAddress: shopAddressSlice,
	},
})

export default store
