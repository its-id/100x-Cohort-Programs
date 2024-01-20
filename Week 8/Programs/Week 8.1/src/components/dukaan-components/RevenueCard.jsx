import { useEffect, useState } from 'react';
import { FaChevronRight, FaRegCircleQuestion } from 'react-icons/fa6';

// variant = 'primary' | 'secondary'

const RevenueCard = ({ variant = 'primary' }) => {
  const [color, setColor] = useState('#0E4F82');

  useEffect(() => {
    setColor(variant === 'primary' ? '#0E4F82' : '#3704cf');
  }, [variant]);

  return (
    <div
      className={`rounded-[8px] flex-grow hover:bg-[${color}] bg-[${color}] text-${variant === 'primary' ? 'white' : 'gray-100'} min-w-[300px]`}
    >
      <div className='p-5 flex flex-col gap-4'>
        <h5 className='flex gap-3 items-center'>
          Next Payout <FaRegCircleQuestion />
        </h5>
        <div className='flex justify-between items-center'>
          <p className='text-3xl font-medium'>₹2,312.23</p>
          <p className='flex items-center font-medium text-base underline'>
            23 Orders <FaChevronRight className='text-lg' />
          </p>
        </div>
      </div>
      <div className='px-6 py-2 bg-[#0E4F82] flex justify-between text-[#F2F2F2] rounded-[8px]'>
        <p>Next Payment Date:</p>
        <p>Today, 4:00PM</p>
      </div>
    </div>
  );
};

export default RevenueCard;
