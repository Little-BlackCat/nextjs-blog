'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod"
import Link from 'next/link';
import GoogleSignInButton from '../GoogleSignInButton';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ErrorAlert } from '../Alert';

const FormSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required")
		.email({ 
			message: "Invalid email address" 
		}),
	password: z
		.string()
		.min(1, "Password is required")
		.min(8, 
			{ message: "Password must contain at least 8 characters" }
		)
})

const SignInForm = () => {
	const router = useRouter();
	const [error, setError] = useState<boolean>(false);
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	async function onSubmit (values: z.infer<typeof FormSchema>) {
		const signInData = await signIn('credentials', {
			email: values.email,
			password: values.password,
			redirect: false,
		});
		
		if (signInData?.error) {
			console.error(signInData.error)
			setError(true);
		} else {
			setError(false);
			router.refresh();
			router.push("/");
		}
	}

	return (
		<form
			{...form}
			onSubmit={form.handleSubmit(onSubmit)}
			className='flex flex-col justify-center items-start gap-2 w-full'
		>
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
			{error && <ErrorAlert />}
			<button type="submit" className="btn btn-neutral mt-4 w-full">Sign in</button>
			<div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
				or
			</div>
			<GoogleSignInButton>Sign in with Google</GoogleSignInButton>
			<p className='text-center text-sm text-gray-600 mt-2'>
				If you don&apos;t have an account, please&nbsp;
				<Link className="text-blue-500 hover:underline" href="/sign-up">Sign up</Link>
			</p>
		</form>
	)
}

export default SignInForm