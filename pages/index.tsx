//import types
import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import axios from 'axios';
import { Video } from '../types';
//import components
import VideoCard from '../components/VideoCard';
import NoResults from '../components/NoResults';
//import utils
import { BASE_URL } from '../utils';
import BtnContainer from '../components/BtnContainer';
//import others
import useAuthStore from '../store/authStore';

interface IProps{
  videos: Video[]
}

const Home: NextPage = ( { videos }: IProps) => {
  const { userProfile }: any = useAuthStore();
  const [reload, setReload] = useState(false);
  
  const handleLike = async (like: boolean, video : Video) => {
    if(userProfile) {
      const {data} = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: video._id,
        like
      });
      
      const videoIdx = videos.findIndex((post : Video) => post._id === video._id);
      videos[videoIdx].likes = data.likes;
      setReload(true);
    }
  }

  useEffect(() => {
    setReload(false);

  }, [reload]);

  return (
    <div className='flex flex-col gap-3 h-full'>
      {
        videos.length ? 
          videos.map((video: Video) => (
          <div className='flex flex-col' key={video._id}>
            <VideoCard post={video} key={video._id}/>
            <BtnContainer post={video} 
                          handleLike={userProfile ? () => handleLike(true, video) : () => {}}
                          handleDislike={userProfile ? () => handleLike(false, video) : () => {}}
                          col={true}/>
          </div>
        ))
        : <NoResults text={'No Videos'}/>
      }
    </div>
  )
}

export const getServerSideProps = async ({ query: { topic }} :{
  query: { topic: string}
}) => {
  let response = null;
  if(topic){
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else{
    response = await axios.get(`${BASE_URL}/api/post`);
  }

  return {
    props: {
      videos: response.data
    }
  }
}
export default Home
