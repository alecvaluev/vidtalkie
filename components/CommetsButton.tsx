//import React
import React from 'react';
//import icons
import { AiFillMessage } from 'react-icons/ai';
import SimpleButton from './SimpleButton';

interface IProps {
  comments: any[],
  col: boolean
}

function CommentsButton({comments, col = false}: IProps) {
  return (
    <SimpleButton count={comments?.length} icon={<AiFillMessage />} col={col} clicked={false}/>
  )
}

export default CommentsButton;
