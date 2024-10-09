import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { checkAuth } from './store/auth-slice'
import CheckAuth from './components/common/check-auth'
import AuthLayout from './components/auth/layout'
import AuthRegister from './pages/auth/register'
import AuthLogin from './pages/auth/login'
import AdminLayout from './components/admin-view/layout'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminProducts from './pages/admin-view/products'
import AdminOrders from './pages/admin-view/orders'
import AdminFeatures from './pages/admin-view/features'
import ShoppingLayout from './components/shopping-view/layout'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingListing from './pages/shopping-view/listing'
import ShoppingCheckout from './pages/shopping-view/checkout'
import ShoppingAccount from './pages/shopping-view/account'
import NotFound from './pages/not-found'
import UnauthPage from './pages/unauth-page'
import PaypalReturnPage from './pages/shopping-view/paypal-return'
import PaymentSuccessPage from './pages/shopping-view/payment-success'
import { Skeleton } from './components/ui/skeleton'

export default function App() {
	const dispatch = useDispatch()
	const { user, isAuthenticated, isLoading } = useSelector(
		(state) => state.auth
	)

	useEffect(() => {
		dispatch(checkAuth())
	}, [dispatch])

	if (isLoading) return <Skeleton className='w-[800] bg-black h-[600px]' />

	console.log(isLoading, user)

	return (
		<div className='flex flex-col overflow-hidden bg-white'>
			<Routes>
				<Route
					path='/'
					element={
						<CheckAuth
							isAuthenticated={isAuthenticated}
							user={user}
						></CheckAuth>
					}
				/>
				<Route
					path='/auth'
					element={
						<CheckAuth isAuthenticated={isAuthenticated} user={user}>
							<AuthLayout />
						</CheckAuth>
					}
				>
					<Route path='login' element={<AuthLogin />} />
					<Route path='register' element={<AuthRegister />} />
				</Route>

				<Route
					path='/admin'
					element={
						<CheckAuth isAuthenticated={isAuthenticated} user={user}>
							<AdminLayout />
						</CheckAuth>
					}
				>
					<Route path='dashboard' element={<AdminDashboard />} />
					<Route path='products' element={<AdminProducts />} />
					<Route path='orders' element={<AdminOrders />} />
					<Route path='features' element={<AdminFeatures />} />
				</Route>

				<Route
					path='/shop'
					element={
						<CheckAuth isAuthenticated={isAuthenticated} user={user}>
							<ShoppingLayout />
						</CheckAuth>
					}
				>
					<Route path='home' element={<ShoppingHome />} />
					<Route path='listing' element={<ShoppingListing />} />
					<Route path='checkout' element={<ShoppingCheckout />} />
					<Route path='account' element={<ShoppingAccount />} />
					<Route path='paypal-return' element={<PaypalReturnPage />} />
					<Route path='payment-success' element={<PaymentSuccessPage />} />
				</Route>

				<Route path='/unauth-page' element={<UnauthPage />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</div>
	)
}
