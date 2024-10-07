const express = require('express')

const { upload } = require('../../helpers/cloudinary')
const {
	fetchAllProducts,
	addProduct,
	editProduct,
	deleteProduct,
	handleImageUpload,
} = require('../../controllers/admin/products-controller')

const router = express.Router()

router.get('/get', fetchAllProducts)
router.post('/add', addProduct)
router.put('/edit/:id', editProduct)
router.delete('/delete/:id', deleteProduct)
router.post('/upload-image', upload.single('my_file'), handleImageUpload)

module.exports = router
