//import from React 
import React from 'react'
//import constants
import { footerList1, footerList2, footerList3, copymark } from '../utils/constants'

const Footer = () => {
  return (
    <div className='mt-6 hidden xl:block'>
        <List items={footerList1} mt={false}/>
        <List items={footerList2} mt/>
        <List items={footerList3} mt/>
        <p className='text-gray-400 text-sm mt-5'>{copymark}</p>
    </div>
  )
}

const List = ({items, mt}: {items:string[], mt: boolean}) =>(
    <div className={`flex flex-wrap gap-2 mt-5 ${mt && 'mt-5'}`}>
        {items.map(elem => <p key={elem} className='text-gray-400 cursor-pointer text-sm hover:underline'>{elem}</p>)}
    </div>
)

export default Footer