import React, {useContext} from 'react';
import commentStyle from './SingleComment.module.scss';
import {userNumber} from '../../App';

function SingleComment({ text, time, photo, userName, toDoName, toDoOwner }) {
    function calculateCommentTime() {
        // if (Date.now() / 1000 - time / 1000 < 10) {
        //     return 'Just Now';
        // } else if (Date.now() / 1000 - time / 1000 < 60) {
        //     return `${Date.now() / 1000 - time / 1000} seconds ago`;
        // } else if (Date.now() / 1000 - time / 1000 < 3600) {
        //     return `${Date.now() / 36000 - time / 36000} minutes ago`; 
        // } else if (Date.now() / 1000 - time / 1000 < 86400) {
        //     return `${Date.now() / 1000 - time / 1000} hours ago`;
        // } else if (Date.now() / 1000 - time / 1000 < 2592000) {
        //     return `${Date.now() / 1000 - time / 1000} months ago`;
        // }
    }
    
    const userNum = useContext(userNumber);

    return (
        <div className={commentStyle.commentWrapper}>
            <div className={commentStyle.photoContainer}>
                <img alt="user img" className={commentStyle.photoContainer__image} src={photo}/>
            </div>
            <div className={commentStyle.commentBlock}>
                <div className={commentStyle.commentInfo}>
                    <div className={commentStyle.commentInfo__name}>{toDoOwner === userNum ? 'You' : userName}</div>
                    <div className={commentStyle.commentInfo__time}>{calculateCommentTime()}</div>
                </div>
                <div className={commentStyle.commentBlock__toDoName}>Commented on {toDoOwner === userNum ? 'your' : userName } task: <b>{toDoName}</b></div>
                <div className={commentStyle.commentBlock__text}>{text}</div>
            </div>
        </div>
    );
}

export default SingleComment;
