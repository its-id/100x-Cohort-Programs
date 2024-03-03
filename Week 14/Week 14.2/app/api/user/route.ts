import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return Response.json({
    name: 'John Doe',
    email: 'john@doe.com',
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  return NextResponse.json(
    {
      username: body.username,
      password: body.password,
    },
    { status: 200 }
  );
}
