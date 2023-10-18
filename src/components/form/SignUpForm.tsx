'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod"
import Link from 'next/link';
import GoogleSignInButton from '../GoogleSignInButton';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const FormSchema = z
	.object({
		username: z
			.string()
			.min(1, "Username is required")
			.min(6,
				{ message: "Username must contain at least 6 characters"}
			)
			.max(30),
		email: z
			.string()
			.min(1, "Email is required")
			.email(
				{ message: "Invalid email address" }
			),
		password: z
			.string()
			.min(1, "Password is required")
			.min(8, 
				{ message: "Password must contain at least 8 characters" }
			),
		confirmPassword: z
			.string()
			.min(1, "Password confirmation is required")
			.min(8, 
				{ message: "Password confirmation must contain at least 8 characters" }
			),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Password do not match"
	})

const SignUpForm = () => {
	const router = useRouter();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
		}
	})

	async function onSubmit (values: z.infer<typeof FormSchema>) {
		// const response = await fetch('/api/user', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify({
		// 		username: values.username,
		// 		email: values.email,
		// 		password: values.password,
		// 	})
		// })

		// if (response.ok) {
		// 	router.push('/sign-in')
		// } else {
		// 	console.error("Registration failed.")
		// }

		try {
			await axios.post('/api/user', values)
			router.push('/sign-in')
		} catch (error) {
			console.error("Registration failed.", error)
		}

	};

	return (
		<form
			{...form}
			onSubmit={form.handleSubmit(onSubmit)}
			className='flex flex-col justify-center items-start gap-2 w-full'
		>
			<Controller
				name='username'
				control={form.control}
				rules={{ required: true }}
				render={({ field }) =>
				(
					<>
						<label>
							Username
						</label>
						<input 
							type="text" 
							placeholder="username" 
							className="input input-bordered w-full max-w-xs" {...field} 
						/>
						{form.formState.errors.username && <span className="text-rose-700 text-sm">{form.formState.errors.username.message}</span>}
					</>
				)}
			/>

			<Controller
				name='email'
				control={form.control}
				rules={{ required: true }}
				render={({ field }) =>
				(
					<>
						<label>
							Email
						</label>
						<input 
							type="text" 
							placeholder="example@mail.com" 
							className="input input-bordered w-full max-w-xs" {...field} 
						/>
						{form.formState.errors.email && <span className="text-rose-700 text-sm">{form.formState.errors.email.message}</span>}
					</>
				)}
			/>

			<Controller
				name='password'
				control={form.control}
				rules={{ required: true }}
				render={({ field }) =>
				(
					<>
						<label>
							Password
						</label>
						<input 
							type="password" 
							placeholder="Enter your password" 
							className="input input-bordered w-full max-w-xs" {...field} 
						/>
						{form.formState.errors.password && <span className="text-rose-700 text-sm">{form.formState.errors.password.message}</span>}
					</>
				)}
			/>

			<Controller
				name='confirmPassword'
				control={form.control}
				rules={{ required: true }}
				render={({ field }) =>
				(
					<>
						<label>
							Re-Enter your password
						</label>
						<input 
							type="password" 
							placeholder="Re-Enter your password" 
							className="input input-bordered w-full max-w-xs" {...field} 
						/>
						{form.formState.errors.confirmPassword && <span className="text-rose-700 text-sm">{form.formState.errors.confirmPassword.message}</span>}
					</>
				)}
			/>

			<button type="submit" className="btn btn-neutral mt-4 w-full">Sign up</button>
			<div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
				or
			</div>
			<GoogleSignInButton>Sign up with Google</GoogleSignInButton>
			<p className='text-center text-sm text-gray-600 mt-2'>
				If you already have an account, please&nbsp;
				<Link className="text-blue-500 hover:underline" href="/sign-in">Sign in</Link>
			</p>
		</form>
	)
}

export default SignUpForm