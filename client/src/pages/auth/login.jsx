import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { loginFormControls } from '@/config'
import { loginUser } from '@/store/auth-slice'
import { useToast } from '@/hooks/use-toast'
import CommonForm from '@/components/common/form'

const initialState = {
	email: '',
	password: '',
}

export default function AuthLogin() {
	const dispatch = useDispatch()
	const { toast } = useToast()

	const [formData, setFormData] = useState(initialState)

	function onSubmit(event) {
		event.preventDefault()
		dispatch(loginUser(formData)).then((data) => {
			if (data?.payload?.success) {
				toast({
					title: data?.payload?.message,
				})
			} else {
				toast({
					title: data?.payload?.message,
					variant: 'destructive',
				})
			}
		})
	}

	return (
		<div className='mx-auto w-full max-w-md space-y-6'>
			<div className='text-center'>
				<h1 className='text-3xl font-bold tracking-tight text-foreground'>
					Login to your account
				</h1>
				<p className='mt-2'>
					Don't have an account
					<Link
						className='font-medium ml-2 text-primary hover:underline'
						to='/auth/register'
					>
						Register
					</Link>
				</p>
			</div>
			<CommonForm
				formControls={loginFormControls}
				buttonText={'Login'}
				formData={formData}
				setFormData={setFormData}
				onSubmit={onSubmit}
			/>
		</div>
	)
}
