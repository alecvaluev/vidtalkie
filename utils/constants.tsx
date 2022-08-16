import { AiOutlineHome } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import { GiPalmTree } from 'react-icons/gi';
import { BsCameraVideo, BsFlower3 } from 'react-icons/bs';
import { MdOutlineTheaterComedy, MdOutlinePets, MdOutlineSportsBasketball } from 'react-icons/md';
import { IoMusicalNotesOutline, IoRestaurantOutline, IoGameControllerOutline } from 'react-icons/io5';
import { TbSwords } from 'react-icons/tb';

export const fileTypes = ['video/mp4', 'video/webm', 'video.ogg'];

export const color = '#F51997';
export const sidebarSections = [
  {
    name: 'For You',
    icon: <AiOutlineHome/>
  },
  {
    name: 'Following',
    icon: <FiUsers/>
  },
  {
    name: 'LIVE',
    icon: <BsCameraVideo/>
  }
];

export const topics = [
  {
    name: 'challenge',
    icon: <TbSwords/>
  },
  {
    name: 'comedy',
    icon: <MdOutlineTheaterComedy />
  },
  {
    name: 'gaming',
    icon: <IoGameControllerOutline />
  },
  {
    name: 'food',
    icon: <IoRestaurantOutline/>
  },
  {
    name: 'dance',
    icon: <IoMusicalNotesOutline />
  },
  {
    name: 'beauty',
    icon: <BsFlower3/>
  },
  {
    name: 'animals',
    icon: <MdOutlinePets />
  },
  {
    name: 'sports',
    icon: <MdOutlineSportsBasketball/>
  },
  {
    name: 'summervibes',
    icon: <GiPalmTree/>
  }
];

export const footerList1 = ['About', 'VidTalkie', 'Browse', 'Newsroom', 'Contact', 'Carreers', 'ByteDance'];
export const footerList2 = [ 'VidTalkie for Good', 'Advertise','Developers','Transparency', 'VidTalkie Rewards'];
export const footerList3 = [ 'Help', 'Safety', 'Terms', 'Privacy', 'Creator Portal', 'Community Guidelines'];

export const copymark = 'c 2022 VidTalkie';
