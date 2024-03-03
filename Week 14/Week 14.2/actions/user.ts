'use server';

import client from '@/db';

// Benefit: SERVER ACTIONS CAN BE CALLED IN BOTH CLIENT AND SERVER COMPONENTS
export async function signup(username: string, password: string) {
  // should add zod validation here
  const user = await client.user.create({
    data: {
      username: username,
      password: password,
    },
  });

  return { message: 'Signed up!', email: user.username };
}

export async function getUser() {
  try {
    const user = await client.user.findFirst({});
    if (!user) return { message: 'No user found' };
    return { name: user?.username, email: user?.username };
  } catch (e) {
    console.log(e);
  }
}
