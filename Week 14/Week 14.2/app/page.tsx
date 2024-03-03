import axios from 'axios';
import client from '@/db';
import { getUser } from '@/actions/user';

async function getUserDetails() {
  await new Promise((r) => setTimeout(r, 1000)); //fake delay

  // APPROACH 1: SENDING REQUEST TO NEXT.JS ITSELF (NOT RECOMMENDED)
  /*
  const response = await axios.get('http://localhost:3000/api/user');
  return response.data;
  */

  // APPROACH 2: BETTER FETCHING (RECOMMENDED)
  /*
  try {
    const user = await client.user.findFirst({});
    if (!user) return { message: 'No user found' };
    return { name: user?.username, email: user?.username };
  } catch (e) {
    console.log(e);
  }
  */

  // APPROACH 3: USING SERVER ACTIONS (RECOMMENDED)
  const user = await getUser();
  return user;
}

export default async function Home() {
  const userData = await getUserDetails();
  return (
    <div className='flex flex-col justify-center h-screen'>
      <div className='flex justify-center'>
        <div className='border p-8 rounded flex flex-col gap-1'>
          {userData?.message ? (
            userData?.message
          ) : (
            <>
              <span>Name: {userData?.name}</span>
              <span>Email: {userData?.email}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
