import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addProductFormElements } from '@/config'
import {
	addNewProduct,
	deleteProduct,
	editProduct,
	fetchAllProducts,
} from '@/store/admin/products-slice'
import { useToast } from '@/hooks/use-toast'
import CommonForm from '@/components/common/form'
import ProductImageUpload from '@/components/admin-view/image-upload'
import AdminProductTile from '@/components/admin-view/product-tile'
import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet'

const initialFormData = {
	image: null,
	title: '',
	description: '',
	category: '',
	brand: '',
	price: '',
	salePrice: '',
	totalStock: '',
	averageReview: 0,
}

export default function AdminProductsPage() {
	const { productList } = useSelector((state) => state.adminProducts)
	const dispatch = useDispatch()
	const { toast } = useToast()

	const [openCreateProductsDialog, setOpenCreateProductsDialog] =
		useState(false)
	const [formData, setFormData] = useState(initialFormData)
	const [imageFile, setImageFile] = useState(null)
	const [uploadedImageUrl, setUploadedImageUrl] = useState('')
	const [imageLoadingState, setImageLoadingState] = useState(false)
	const [currentEditedId, setCurrentEditedId] = useState(null)

	function onSubmit(event) {
		event.preventDefault()
		currentEditedId !== null
			? dispatch(
					editProduct({
						id: currentEditedId,
						formData,
					})
			  ).then((data) => {
					console.log(data, 'edit')

					if (data?.payload?.success) {
						dispatch(fetchAllProducts())
						setFormData(initialFormData)
						setOpenCreateProductsDialog(false)
						setCurrentEditedId(null)
					}
			  })
			: dispatch(
					addNewProduct({
						...formData,
						image: uploadedImageUrl,
					})
			  ).then((data) => {
					if (data?.payload?.success) {
						dispatch(fetchAllProducts())
						setOpenCreateProductsDialog(false)
						setImageFile(null)
						setFormData(initialFormData)
						toast({
							title: 'Product add successfully',
						})
					}
			  })
	}

	function isFormValid() {
		return Object.keys(formData)
			.filter((currentKey) => currentKey !== 'averageReview')
			.map((key) => formData[key] !== '')
			.every((item) => item)
	}

	function handleDelete(getCurrentProductId) {
		dispatch(deleteProduct(getCurrentProductId)).then((data) => {
			if (data?.payload?.success) {
				dispatch(fetchAllProducts())
			}
		})
	}

	useEffect(() => {
		dispatch(fetchAllProducts())
	}, [dispatch])

	console.log(formData, 'productList')

	return (
		<Fragment>
			<div className='mb-5 w-full flex justify-end'>
				<Button onClick={() => setOpenCreateProductsDialog(true)}>
					Add New Product
				</Button>
			</div>
			<div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
				{productList && productList.length > 0
					? productList.map((productItem) => (
							<AdminProductTile
								key={productItem?._id}
								setFormData={setFormData}
								setOpenCreateProductsDialog={setOpenCreateProductsDialog}
								setCurrentEditedId={setCurrentEditedId}
								product={productItem}
								handleDelete={handleDelete}
							/>
					  ))
					: null}
			</div>
			<Sheet
				open={openCreateProductsDialog}
				onOpenChange={() => {
					setOpenCreateProductsDialog(false)
					setCurrentEditedId(null)
					setFormData(initialFormData)
				}}
			>
				<SheetContent side='right' className='overflow-auto'>
					<SheetHeader>
						<SheetTitle>
							{currentEditedId !== null ? 'Edit Product' : 'Add New Product'}
						</SheetTitle>
					</SheetHeader>
					<ProductImageUpload
						imageFile={imageFile}
						setImageFile={setImageFile}
						uploadedImageUrl={uploadedImageUrl}
						setUploadedImageUrl={setUploadedImageUrl}
						setImageLoadingState={setImageLoadingState}
						imageLoadingState={imageLoadingState}
						isEditMode={currentEditedId !== null}
					/>
					<div className='py-6'>
						<CommonForm
							onSubmit={onSubmit}
							formData={formData}
							setFormData={setFormData}
							buttonText={currentEditedId !== null ? 'Edit' : 'Add'}
							formControls={addProductFormElements}
							isBtnDisabled={!isFormValid()}
						/>
					</div>
				</SheetContent>
			</Sheet>
		</Fragment>
	)
}
