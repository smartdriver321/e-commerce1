const cloudinary = require('cloudinary').v2
const multer = require('multer')

cloudinary.config({
	cloud_name: 'dgcs3sv4n',
	api_key: '276992731757241',
	api_secret: 'aNoShXmiTQL1huc9tABWvTkvH4M',
})

const storage = new multer.memoryStorage()

async function imageUploadUtil(file) {
	const result = await cloudinary.uploader.upload(file, {
		resource_type: 'auto',
		folder: 'e-commerce1',
	})

	return result
}

const upload = multer({ storage })

module.exports = { upload, imageUploadUtil }
