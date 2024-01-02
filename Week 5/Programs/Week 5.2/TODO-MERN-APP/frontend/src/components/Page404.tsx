import { Link } from 'react-router-dom';
import githubIcon from '../assets/github.svg';
import twitterIcon from '../assets/twitter.svg'; 


const Page404 = () => {
  return (
    <div className='min-h-full pt-16 pb-12 flex flex-col '>
      <main className='flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='py-16'>
          <div className='text-center flex flex-col gap-10'>
            <p className='text-sm font-semibold text-emerald-400 uppercase tracking-wide'>
              404 error
            </p>
            <div>
              <h1 className='mt-2 text-4xl font-extrabold text-slate-200 tracking-tight sm:text-5xl'>
                Page not found.
              </h1>
              <p className='mt-4 text-base text-slate-400'>
                Sorry, couldn’t find the page you’re looking for.
              </p>
            </div>
            <div className='mt-6'>
              <Link
                to='/'
                className='text-base font-medium text-emerald-400 hover:text-emerald-500'
              >
                Go back home<span aria-hidden='true'> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <footer className='flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8'>
        <nav className='flex justify-center space-x-4'>
          <Link
            to='https://twitter.com/its_ikD'
            className='text-sm font-medium text-gray-400 hover:text-gray-600'
          >
            <img src={twitterIcon} alt='twitter' className='w-6 h-6' />
          </Link>
          <Link
            to='#'
            className='text-sm font-medium text-gray-400 hover:text-gray-600'
          >
            <img src={githubIcon} alt='github' className='w-6 h-6' />
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default Page404;
