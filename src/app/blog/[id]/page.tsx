import BackButton from '@/components/BackButton'
import ButtonAction from '@/components/ButtonAction'
import { FC } from 'react'
import { db } from '@/lib/db'

interface BlogDetailPageProps {
	params: {
		id: string
	}
}

interface ColorProp {
	Python: string;
	PHP: string;
	JavaScript: string;
	Java: string;
}

const colorTag = {
	Python: 'primary',
	PHP: 'ghost',
	JavaScript: 'accent',
	Java: 'secondary',
}

async function getPost(id: string) {
	const response = await db.post.findFirst({
		where: {
			id: id
		},
		select: {
			id: true,
			title: true,
			content: true,
			tag: true,
		},
	});
	return response;
};

const BlogDetailPage: FC<BlogDetailPageProps> = async ({ params }) => {

	const post = await getPost(params.id);

	return (
		<div>
			<BackButton />
			<div className='mb-8'>
				<h2 className='text-2xl font-bold my-4'>{post?.title}</h2>
				<ButtonAction id={params.id} />
			</div>
			<p className='text-slate-700'>{post?.content}</p>
			<span className={`badge badge-${colorTag[post?.tag.name as keyof ColorProp]}`}>{post?.tag.name}</span>
		</div>
	)
}

export default BlogDetailPage