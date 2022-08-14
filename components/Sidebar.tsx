//import from React and Next
import React, { useState } from 'react';
import Link from 'next/link';
//import components
import Footer from './Footer';
import SuggestedAccounts from './SuggestedAccounts';
import Discover from './Discover';
//import icons
import { AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
//import constants
import { sidebarSections } from '../utils/constants';

export default function Sidebar(){
    const [showSidebar, setShowSidebar] = useState(true);
    const userProfile = false;
    const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#6B2D5C] rounded';
    return(
    <div>
        <div className='block xl:hidden n-2 nl-4 mt-3 text-xl'
            onClick={() => setShowSidebar((prev) => !prev)}>
            {showSidebar? <ImCancelCircle/> : <AiOutlineMenu/>}
        </div>
        {showSidebar && (
            <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 borber-r-2 border-gray-100 xl:border-0 p-3 overflow-auto'>
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
                <SuggestedAccounts/>
                <Discover/>
                <Footer/>
            </div>
        )}
    </div>
    )
}