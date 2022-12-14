//import from React and Next
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
//import components
import LikeButton from '../../components/LikeButton';
import Comments from '../../components/Comments';
import CommentsButton from '../../components/CommetsButton';
//import icons
import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
//import others
import axios from 'axios';
import useAuthStore from '../../store/authStore';
//import utils and types
import { BASE_URL } from '../../utils';
import { Video } from '../../types';
import BtnContainer from '../../components/BtnContainer';

interface IProps {
  postDetails: Video
}

function Detail({ postDetails }: IProps) {

  const [post, setPost] = useState(postDetails);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const router = useRouter();
  const { userProfile }: any = useAuthStore();
  const [comment, setComment] = useState('');
  const [isPostingComment, setIsPostingComment] = useState(false);

  if(!post) return null;

  const onVideoClick = () => {
    if(playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  }

  const handleLike = async (like: boolean) => {
    if(userProfile) {
      const {data} = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like
      });

      setPost({...post, likes: data.likes});

    }
  }

  const addComment = async (e) => {
    e.preventDefault();
    if(userProfile && comment){
      setIsPostingComment(true);
      const {data} = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment
      });

      setPost({...post, comments: data.comments});
      setIsPostingComment(false);
      setComment('');
    }
  }

  useEffect(() => {
    if(post && videoRef?.current) {
        videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted])

  return (
    <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap'>
      {/* left part of the screen */}
      <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-reapet bg-cover bg-center'> {/* alternative is to give the bg a solid color */}
        <div className='absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
          <p className='cursor-pointer' 
            onClick={() => router.back()}>
            <MdOutlineCancel className='text-white text-[35px]'/>
          </p>
        </div>
        <div className='relative'>
          <div className='lg:h-[100vh] h-[60vh]'>
            <video src={post.video.asset.url}
            className='h-full cursor-pointer'
            ref={videoRef}
            loop
            onClick={onVideoClick}
            >

            </video>
          </div>
          <div className='absolute top-[45%] left-[45%] cursor-pointer'>
            {
              !playing && (
                <button onClick={onVideoClick}>
                  <BsFillPlayFill className='text-white text-6xl lg:text-8xl'/>
                </button>
              )
            }
          </div>
        </div>
        <div className='absolute bottom-5 ls:bottom-10 right-5 ls:right-10 cursor-pointer'>
          { isVideoMuted ? (
                  <button onClick={() => setIsVideoMuted(false)}>
                      <HiVolumeOff className='text-white text-2xl lg:text-4xl'/>
                  </button>
              ):(
                  <button onClick={() => setIsVideoMuted(true)}>
                      <HiVolumeUp className='text-white text-2xl lg:text-4xl'/>
                  </button>
          )}
        </div>
      </div>

      {/* right part of the screen */}
      <div className='relative w-[1000px] md:w-[900px] lg:w-[700px]'>
          <div className='mt-10'>


            <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
              <div className='md:w-20 md:h-20 w-16 h-16 ml-4'>
                <Link href='/'>
                  <>
                    <Image width={62} height={62} src={post.postedBy.image}
                    className='rounded-full'
                    alt='profile phoot'
                    layout='responsive'/>
                  </>
                </Link>
              </div>
              <div>
                <Link href='/'>
                    <div className='flex flex-col gap-2 mt-3'>
                        <p className='flex gap-2 md:text-md font-bold text-primary items-center'>
                            {post.postedBy.userName} {' '}
                            <GoVerified className='text-blue-400 text-md'/>
                        </p>
                        <p className='font-medium capitalize text-xs text-gray-500 hidden md:block'>
                            {post.postedBy.userName}
                        </p>
                    </div>
                </Link>
              </div>
            </div>

            {/* caption */}
            <p className='px-10 text-md text-gray-600'>{post.caption}</p>
            <BtnContainer post={post}
                          handleLike={userProfile ? () => handleLike(true) : () => {}}
                          handleDislike={userProfile ? () => handleLike(false) : () => {}}
                          col={false}
                          />
            {/* comments */}
            <Comments
              comment={comment}
              setComment={setComment}
              addComment={addComment}
              comments={post.comments}
              isPostingComment={isPostingComment}
              />
          </div>
      </div>
    </div>
  )
}


export const getServerSideProps = async ({
  params: { id }
} : {
  params: { id: string}
}) => {
  const {data} = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: { postDetails: data}
  }
}

export default Detail;
