import { Route, Routes } from 'react-router-dom'

import AuthLayout from './components/auth/layout'
import RegisterPage from './pages/auth/register'
import LoginPage from './pages/auth/login'

export default function App() {
	return (
		<div className='flex flex-col overflow-x-hidden bg-white'>
			<h1>Header</h1>

			<Routes>
				<Route path='/auth' element={<AuthLayout />}>
					<Route path='register' element={<RegisterPage />} />
					<Route path='login' element={<LoginPage />} />
				</Route>
			</Routes>
		</div>
	)
}
