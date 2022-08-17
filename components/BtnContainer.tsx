            
//import components
import LikeButton from './LikeButton';
import CommentsButton from './CommetsButton';            
//import types
import { Video } from '../types';

interface IProps {
    post: Video,
    handleLike: () => void,
    handleDislike: () => void,
    col: boolean
}

const BtnContainer = ({post, handleLike, handleDislike, col}: IProps) => {
    return (
        <div className={`flex ${col? 'flex-col justify-end mb-10 px-4': 'px-10'} mt-5`}>
            <LikeButton handleLike={handleLike}
                        handleDislike={handleDislike}
                        likes={post.likes}
                        col={col}/>
            <CommentsButton comments={post.comments} col={col}/>
        </div>
    )
}   

export default BtnContainer;           
            