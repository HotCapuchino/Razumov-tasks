import React from 'react';
import commentStyle from './SingleComment.module.scss';

function SingleComment({ text, time, photo, commentatorName, toDoName, toDoOwner, currentUserName }) {

    function calculateCommentTime() {
        let difference = Math.abs(Date.now() - time);
        const timeCoeffs = [1000, 60, 60, 24, 7, 30, 365];
        const timeNames = ['seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'years'];
        let interval = 'Just now';
        let multiplier = 1;
        for (let i = 0; i < timeCoeffs.length; i++) {
            multiplier *= timeCoeffs[i];
            if (difference / multiplier < 1) {
                break;
            } else {
                interval = `about ${Math.round(difference / multiplier)} ${timeNames[i]} ago`
            }
        }
        return interval;
    }

    return (
        <div className={commentStyle.commentWrapper}>
            <div className={commentStyle.photoContainer}>
                <img className={commentStyle.photoContainer__image} src={photo}/>
            </div>
            <div className={commentStyle.commentBlock}>
                <div className={commentStyle.commentInfo}>
                    <div className={commentStyle.commentInfo__name}>{commentatorName === currentUserName ? 'You' : commentatorName}</div>
                    <div className={commentStyle.commentInfo__time}>{calculateCommentTime()}</div>
                </div>
                <div className={commentStyle.commentBlock__toDoName}>Commented on {toDoOwner === currentUserName ? 'your' : toDoOwner } task: <b>{toDoName}</b></div>
                <div className={commentStyle.commentBlock__text}>{text}</div>
            </div>
        </div>
    );
}

export default SingleComment;
