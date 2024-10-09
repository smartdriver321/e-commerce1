import { useState } from 'react'
import { useSelector } from 'react-redux'

import img from '../../assets/account.jpg'
import Address from '@/components/shopping-view/address'
import UserCartItemsContent from '@/components/shopping-view/cart-items-content'

export default function ShoppingCheckout() {
	const { cartItems } = useSelector((state) => state.shopCart)

	const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null)

	console.log(currentSelectedAddress, 'cartItems')

	const totalCartAmount =
		cartItems && cartItems.items && cartItems.items.length > 0
			? cartItems.items.reduce(
					(sum, currentItem) =>
						sum +
						(currentItem?.salePrice > 0
							? currentItem?.salePrice
							: currentItem?.price) *
							currentItem?.quantity,
					0
			  )
			: 0

	return (
		<div className='flex flex-col'>
			<div className='relative h-[300px] w-full overflow-hidden'>
				<img src={img} className='h-full w-full object-cover object-center' />
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5'>
				<Address
					selectedId={currentSelectedAddress}
					setCurrentSelectedAddress={setCurrentSelectedAddress}
				/>
				<div className='flex flex-col gap-4'>
					{cartItems && cartItems.items && cartItems.items.length > 0
						? cartItems.items.map((item) => (
								<UserCartItemsContent key={item.id} cartItem={item} />
						  ))
						: null}
					<div className='mt-8 space-y-4'>
						<div className='flex justify-between'>
							<span className='font-bold'>Total</span>
							<span className='font-bold'>${totalCartAmount}</span>
						</div>
					</div>
					<div className='mt-4 w-full'></div>
				</div>
			</div>
		</div>
	)
}
