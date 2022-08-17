//import types
import { useState } from 'react';
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
  const [posts, setPost] = useState(videos);
  const { userProfile }: any = useAuthStore();

  
  const handleLike = async (like: boolean, video : Video) => {
    if(userProfile) {
      const {data} = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: video._id,
        like
      });
      const videoIdx = posts.findIndex((post : Video) => post._id === video._id);
      const post = posts[videoIdx];
      setPost([...posts, post]);
    }
  }

  return (
    <div className='flex flex-col gap-3 h-full'>
      {
        posts.length ? 
          posts.map((video: Video) => (
          <div className='flex' key={video._id}>
            <VideoCard post={video} key={video._id}/>
            <span className=''>
              <BtnContainer post={video} 
                            handleLike={userProfile ? () => handleLike(true, video) : () => {}}
                            handleDislike={userProfile ? () => handleLike(false, video) : () => {}}
                            col={true}/>
            </span>
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
export default Home;
