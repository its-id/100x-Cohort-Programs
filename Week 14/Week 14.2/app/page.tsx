import axios from 'axios';

async function getUserDetails() {
  const response = await axios.get(
    'https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details'
  );
  return response.data;
}

export default async function Home() {
  const userData = await getUserDetails();
  return (
    <div className='h-[100vh] w-full flex flex-col justify-center items-center gap-2'>
      <span>{userData.email}</span>
      <span>{userData.name}</span>
    </div>
  );
}
