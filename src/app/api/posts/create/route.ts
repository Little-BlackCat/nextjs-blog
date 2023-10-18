import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST( req:Request ) {
	try {
		const body = await req.json();
		console.log(body)
		const session = await getServerSession(authOptions);
		// ตรวจสอบค่า userId ว่ามีค่าที่ถูกต้องหรือไม่
    const userId = session?.user.id;
		if (userId) {
      const post = await db.post.create({
        data: {
          title: body.title,
          content: body.content,
          tagId: body.tagId,
          userId: userId,
        }
      });

      return NextResponse.json(post, { status: 201 });
    } else {
      return NextResponse.json({ message: 'User ID is missing or invalid' }, { status: 400 });
    }
	} catch (error) {
		return NextResponse.json({ message: 'could not create post' }, { status: 500 })
	}
}