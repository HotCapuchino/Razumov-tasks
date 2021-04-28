import React from 'react';
import commentStyle from './SingleComment.module.scss';

function SingleComment({ text, userName, toDoName }) {
    return (
        <div className={commentStyle.commentWrapper}>
            <img alt="user img" className={commentStyle.commentWrapper__image}/>
            <div className={commentStyle.commentBlock}>
                <div className={commentStyle.commentInfo}>
                    <div className={commentStyle.commentInfo__name}>{userName}</div>
                    <div className={commentStyle.commentInfo__date}>date here</div>
                </div>
                <div className={commentStyle.commentBlock__toDoName}>Commented on your task: <b>{toDoName}</b></div>
                <div className={commentStyle.commentBlock__text}>{text}</div>
            </div>
        </div>
    );
}

export default SingleComment;
