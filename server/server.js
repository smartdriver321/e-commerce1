const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const authRouter = require('./routes/auth/auth-routes')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())

app.use(
	cors({
		origin: 'http://localhost:5173',
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

mongoose
	.connect(
		'mongodb+srv://smart:admin@cluster0.d35uolv.mongodb.net/e-commerce1?retryWrites=true&w=majority&appName=Cluster0'
	)
	.then(() => console.log('MongoDB connected'))
	.catch((error) => console.log(error))

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`))
