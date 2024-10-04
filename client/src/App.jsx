import { Route, Routes } from 'react-router-dom'

import AuthLayout from './components/auth/layout'
import RegisterPage from './pages/auth/register'
import LoginPage from './pages/auth/login'
import AdminLayout from './components/admin-view/layout'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminProducts from './pages/admin-view/products'
import AdminOrders from './pages/admin-view/orders'
import AdminFeatures from './pages/admin-view/features'

export default function App() {
	return (
		<div className='flex flex-col overflow-x-hidden bg-white'>
			<h1>Header</h1>

			<Routes>
				<Route path='/auth' element={<AuthLayout />}>
					<Route path='register' element={<RegisterPage />} />
					<Route path='login' element={<LoginPage />} />
				</Route>

				<Route path='/admin' element={<AdminLayout />}>
					<Route path='dashboard' element={<AdminDashboard />} />
					<Route path='products' element={<AdminProducts />} />
					<Route path='orders' element={<AdminOrders />} />
					<Route path='features' element={<AdminFeatures />} />
				</Route>
			</Routes>
		</div>
	)
}
