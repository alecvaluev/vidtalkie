//import React
import React from 'react';

interface IProps {
  count: number,
  icon: any,
  col: boolean,
  clicked: boolean
}

function SimpleButton({count, icon, col = false, clicked = false}: IProps) {

  return (
    <div className='flex gap-6 m-1'>
      <div className={`mt-4 me-4 flex ${col && 'flex-col'} items-center cursor-pointer`}>
        <div className={`rounded-full p-3 justify-center text-lg md:text-2xl ${clicked? 'text-white bg-[#6B2D5C]': 'bg-primary'}`}>
              {icon}
        </div>
        <p className='text-md font-semibold px-2'>{count | 0}</p>
      </div>
    </div>
  )
}

export default SimpleButton