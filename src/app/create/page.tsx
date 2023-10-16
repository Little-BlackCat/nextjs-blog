'use client'

import BackButton from '@/components/BackButton';
import FormPost from '@/components/FormPost';
import { FormInputPost } from '@/types';
import { SubmitHandler } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios'
import { useRouter } from 'next/navigation';

const CreatePage = () => {
	const router = useRouter();
	const { mutate: createPost, isLoading: isLoadingSubmit } = useMutation({
		mutationFn: (newPost: FormInputPost) => {
			return axios.post('/api/posts/create', newPost);
		},
		onError: (error) => {
			console.error(error);
		},
		onSuccess: () => {
			router.push('/');
			router.refresh();
		},
	});

	const handleCreatePost: SubmitHandler<FormInputPost> = (data) => {
		createPost(data);
	};


	return (
		<div>
			<BackButton />
			<h1 className='text-2xl my-4 font-bold text-center'>Add new post</h1>
			<FormPost 
				submit={handleCreatePost} 
				isEditing={false} 
				isLoadingSubmit={isLoadingSubmit}
			/>
		</div>
	)
}

export default CreatePage