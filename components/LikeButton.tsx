//import from React
import React, { useState, useEffect} from 'react';
//import components
import SimpleButton from './SimpleButton';
//import icons
import { MdFavorite } from 'react-icons/md';
//import others
import useAuthStore from '../store/authStore';

interface IProps {
  handleLike: () => void,
  handleDislike: () => void,
  likes: any[],
  col: boolean
}

function LikeButton({handleLike, handleDislike, likes, col = false}: IProps) {
  const [alreadyLiked, setAlreadyLiked] = useState(true);
  const { userProfile }: any = useAuthStore();
  const filterLikes = likes?.filter(item => item._ref === userProfile?._id);
  
  useEffect(()=> {
    if(filterLikes?.length > 0) setAlreadyLiked(true);
    else setAlreadyLiked(false);
  }, [likes])

  return (
    <span onClick={alreadyLiked? handleDislike : handleLike}>
      <SimpleButton count={likes?.length} icon={<MdFavorite/>} clicked={alreadyLiked} col={col} />
    </span>
  )
}

export default LikeButton
