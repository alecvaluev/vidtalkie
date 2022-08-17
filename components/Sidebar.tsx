//import from React and Next
import React, { useState } from 'react';
import Link from 'next/link';
//import from others
import { GoogleLogin } from '@react-oauth/google';
import useAuthStore from '../store/authStore';
//import components
import Footer from './Footer';
import SuggestedAccounts from './SuggestedAccounts';
import Discover from './Discover';
//import icons
import { AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
//import constants
import { sidebarSections } from '../utils/constants';
import { createOrGetUser } from '../utils';

export default function Sidebar(){
    const { userProfile, addUser} = useAuthStore();
    
    const [showSidebar, setShowSidebar] = useState(true);
    /* const userProfile = false; */
    const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#6B2D5C] rounded';
    return(
    <div className='border-r-2 border-gray-100'>
        <div className='block xl:hidden n-2 nl-4 pt-3 text-xl ml-2'
            onClick={() => setShowSidebar((prev) => !prev)}>
            {showSidebar? <ImCancelCircle/> : <AiOutlineMenu/>}
        </div>
        {showSidebar && (
            <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 xl:border-0 p-3 overflow-auto'>
                <div className='xl:border-b-2 border-gray-200 xl:pb-2'>
                    {
                        sidebarSections.map((section, idx) => (
                            <Link key={idx} href='/'>
                                <div className={normalLink}>
                                    <p className='text-2xl'>{section.icon}</p>
                                    <span className='text-xl hidden xl:block'>{section.name}</span>
                                </div>
                            </Link>
                        ))
                    }
                </div>
                {
                    !userProfile && (
                        <div className='border-gray-200 xl:border-b-2 pb-4 hidden xl:block'>
                            <div className='flex flex-col items-center text-gray-500 font-semibold m-3'>
                                <p className='m-3'>Log in to follow creators, like videos, and view comments.</p>
                                <GoogleLogin 
                                onSuccess={(response) => createOrGetUser(response, addUser)}
                                onError={() => console.log('Error')}/>
                            </div>
                        </div>
                    )
                }
                <SuggestedAccounts/>
                <Discover/>
                <Footer/>
            </div>
        )}
    </div>
    )
}
