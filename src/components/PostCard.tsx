import Link from 'next/link'
import { Tag } from "@prisma/client"
import { FC } from 'react'

interface PostCardProp {
	post: {
		id: string;
		title: string;
		content: string;
		tag: Tag; 
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

const PostCard:FC<PostCardProp> = ({ post }) => {
	
	const { id, title, content, tag } = post;
	
	return (
		<div className="card w-full bg-base-100 shadow-xl border">
			<div className="card-body">
				<h2 className="card-title">{title}</h2>
				<p>{content.slice(0, 30)}</p>
				<div className="card-actions justify-end">
					<span className={`badge badge-${colorTag[tag.name as keyof ColorProp]}`}>{tag.name}</span>
					<Link href={`/blog/${id}`} className='hover:underline'>Read more...</Link>
				</div>
			</div>
		</div>
	)
}

export default PostCard