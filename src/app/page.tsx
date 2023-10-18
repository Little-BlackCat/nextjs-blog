import PostCard from '@/components/PostCard'
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

async function getPosts() {
  const response = await db.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      tag: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return response;
}

export default async function Home() {
  const posts = await getPosts();
  console.log(posts);

  const session = await getServerSession(authOptions)
  console.log('session: ', session)

  if (!session) {
    return (
      <h2 className='text-lg text-center'>Please 
        <span className='text-blue-500'>
          <Link href="/sign-in"> login </Link>  
        </span>
        to see this admin page</h2>
    )
  } else {
    return (
      <main className='grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10'>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </main>
    )
  }
}
