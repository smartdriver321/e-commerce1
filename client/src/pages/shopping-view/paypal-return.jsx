import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { capturePayment } from '@/store/shop/order-slice'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

export default function PaypalReturnPage() {
	const location = useLocation()
	const params = new URLSearchParams(location.search)
	const paymentId = params.get('paymentId')
	const payerId = params.get('PayerID')
	const dispatch = useDispatch()

	useEffect(() => {
		if (paymentId && payerId) {
			const orderId = JSON.parse(sessionStorage.getItem('currentOrderId'))

			dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
				if (data?.payload?.success) {
					sessionStorage.removeItem('currentOrderId')
					window.location.href = '/shop/payment-success'
				}
			})
		}
	}, [paymentId, payerId, dispatch])

	return (
		<Card>
			<CardHeader>
				<CardTitle>Processing Payment...Please wait!</CardTitle>
			</CardHeader>
		</Card>
	)
}
