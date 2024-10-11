const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

const authRouter = require('./routes/auth/auth-routes')
const adminProductsRouter = require('./routes/admin/products-routes')
const adminOrderRouter = require('./routes/admin/order-routes')
const shopProductsRouter = require('./routes/shop/products-routes')
const shopOrderRouter = require('./routes/shop/order-routes')
const shopCartRouter = require('./routes/shop/cart-routes')
const shopAddressRouter = require('./routes/shop/address-routes')
const shopSearchRouter = require('./routes/shop/search-routes')
const shopReviewRouter = require('./routes/shop/review-routes')
const commonFeatureRouter = require('./routes/common/feature-routes')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())

app.use(
	cors({
		origin: process.env.CLIENT_BASE_URL,
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: [
			'Content-Type',
			'Authorization',
			'Cache-Control',
			'Expires',
			'Pragma',
		],
		credentials: true,
	})
)

app.use('/api/auth', authRouter)
app.use('/api/admin/products', adminProductsRouter)
app.use('/api/admin/orders', adminOrderRouter)
app.use('/api/shop/products', shopProductsRouter)
app.use('/api/shop/order', shopOrderRouter)

app.use('/api/shop/cart', shopCartRouter)
app.use('/api/shop/address', shopAddressRouter)
app.use('/api/shop/search', shopSearchRouter)
app.use('/api/shop/review', shopReviewRouter)
app.use('/api/common/feature', commonFeatureRouter)
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log('MongoDB connected'))
	.catch((error) => console.log(error))

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`))
