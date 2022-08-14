//import from React
import React, { useState, useEffect} from 'react';
//import icons
import { MdFavorite } from 'react-icons/md';
//import others
import useAuthStore from '../store/authStore';

interface IProps {
  handleLike: () => void,
  handleDislike: () => void,
  likes: any[]
}

function LikeButton({handleLike, handleDislike, likes}: IProps) {
  const [alreadyLiked, setAlreadyLiked] = useState(true);
  const { userProfile }: any = useAuthStore();
  const filterLikes = likes?.filter(item => item._ref === userProfile?._id);
  
  useEffect(()=> {
    if(filterLikes?.length > 0) setAlreadyLiked(true);
    else setAlreadyLiked(false);
  }, [likes])

  return (
    <div className='flex gap-6 m-1'>
      <div className='mt-4 flex items-center cursor-pointer'>
        <div className={`bg-primary rounded-full p-3 justify-center ${alreadyLiked && `text-[#6B2D5C]`}`}
              onClick={alreadyLiked? handleDislike : handleLike}>
              <MdFavorite className='text-lg md:text-2xl'/>
        </div>
        <p className='text-md font-semibold px-2'>{likes?.length | 0}</p>
      </div>
    </div>
  )
}

export default LikeButton