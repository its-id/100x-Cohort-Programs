import client from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const user = await client.user.findFirst({});

  if (!user) return NextResponse.json({ message: 'No user found' });
  return Response.json({ name: user?.username, email: user?.username });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  // should add zod validation here
  const user = await client.user.create({
    data: {
      username: body.username,
      password: body.password,
    },
  });

  return NextResponse.json({ user, message: 'Signed up' }, { status: 200 });
}
