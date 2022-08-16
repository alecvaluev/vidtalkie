import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { topics } from '../utils/constants';

const Discover = () => {
    const router = useRouter();
    const { topic } = router.query;
    
    const generalStyle = 'xl:border-2 hover:bg-primary px-3 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer';
    const activeTopicStyle = `${generalStyle} xl:border-[#6B2D5C]  text-[#6B2D5C]`;
    const topicStyle=`${generalStyle} xl:border-gray-400 text-gray-400`;

  return (
    <div className='xl:border-b-2 xl:border-gray-200 pb-6'>
        <p className='mt-4 text-gray-500 font-semibold m-3 hidden xl:block'>
            Discover
        </p>
        
        <div className='flex flex-wrap gap-3'>
            {topics.map(elem => 
                <Link href={`/?topic=${elem.name}`} key={elem.name}>
                    <div className={topic === elem.name? activeTopicStyle: topicStyle}>
                        <span className='xl:hidden block font-bold text-md'>
                            {elem.icon}
                        </span>
                        <span className='text-md hidden xl:block'>
                            #{elem.name}
                        </span>
                    </div>
                </Link>)}
        </div>
    </div>
  )
}

export default Discover
