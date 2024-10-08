import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
	isLoading: false,
	productList: [],
	productDetails: null,
}

export const fetchAllFilteredProducts = createAsyncThunk(
	'/products/fetchAllProducts',
	async () => {
		console.log(fetchAllFilteredProducts, 'fetchAllFilteredProducts')

		const result = await axios.get(
			`http://localhost:5000/api/shop/products/get`
		)

		console.log(result)

		return result?.data
	}
)

export const fetchProductDetails = createAsyncThunk(
	'/products/fetchProductDetails',
	async (id) => {
		const result = await axios.get(
			`http://localhost:5000/api/shop/products/get/${id}`
		)

		return result?.data
	}
)

const shoppingProductSlice = createSlice({
	name: 'shoppingProducts',
	initialState,
	reducers: {
		setProductDetails: (state) => {
			state.productDetails = null
		},
	},
	extraReducers: (builder) => {
		builder
			// eslint-disable-next-line no-unused-vars
			.addCase(fetchAllFilteredProducts.pending, (state, action) => {
				state.isLoading = true
			})
			.addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
				state.isLoading = false
				state.productList = action.payload.data
			})
			// eslint-disable-next-line no-unused-vars
			.addCase(fetchAllFilteredProducts.rejected, (state, action) => {
				state.isLoading = false
				state.productList = []
			})
			// eslint-disable-next-line no-unused-vars
			.addCase(fetchProductDetails.pending, (state, action) => {
				state.isLoading = true
			})
			.addCase(fetchProductDetails.fulfilled, (state, action) => {
				state.isLoading = false
				state.productDetails = action.payload.data
			})
			// eslint-disable-next-line no-unused-vars
			.addCase(fetchProductDetails.rejected, (state, action) => {
				state.isLoading = false
				state.productDetails = null
			})
	},
})

export const { setProductDetails } = shoppingProductSlice.actions

export default shoppingProductSlice.reducer
