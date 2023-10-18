import Link from 'next/link'
import { BookOpenCheck } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import UserAccountNav from './UserAccountNav'

const Navbar = async () => {
	const session = await getServerSession(authOptions)
	console.log(session)
	if (session) {
		return (
			<div className="navbar bg-neutral-100">
				<div className="container">
					<div className="flex-1">
						<Link href='/'>
							<BookOpenCheck />
						</Link>
					</div>
					<div className="flex-none space-x-4">
						<Link href='/create' className="btn btn-ghost">
							Create Post
						</Link>
						<UserAccountNav />
					</div>
				</div>
			</div>
		)
	}
}

export default Navbar