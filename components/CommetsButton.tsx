//import React
import React from 'react';
//import icons
import { AiFillMessage } from 'react-icons/ai';

interface IProps {
  comments: any[]
}

function CommentsButton({comments}: IProps) {
  
  return (
    <div className='flex gap-6 m-1'>
      <div className='mt-4 me-4 flex items-center cursor-pointer'>
        <div className='bg-primary rounded-full p-3 justify-center'>
              <AiFillMessage className='text-lg md:text-2xl'/>
        </div>
        <p className='text-md font-semibold px-2'>{comments?.length | 0}</p>
      </div>
    </div>
  )
}

export default CommentsButton