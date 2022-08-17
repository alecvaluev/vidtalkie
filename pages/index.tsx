//import types
import type { NextPage } from 'next'
import axios from 'axios'
import { Video } from '../types'
//import components
import VideoCard from '../components/VideoCard'
import NoResults from '../components/NoResults'
//import utils
import { BASE_URL } from '../utils'
import BtnContainer from '../components/BtnContainer'

interface IProps{
  videos: Video[]
}

const Home: NextPage = ( { videos }: IProps) => {
  console.log(videos);
  return (
    <div className='flex flex-col gap-3 h-full'>
      {
        videos.length ? 
          videos.map((video: Video) => (
          <div className='flex' key={video._id}>
            <VideoCard post={video} key={video._id}/>
            <span className=''>
              <BtnContainer post={video} 
                            handleLike={() => {}} 
                            handleDislike={() => {}}
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
