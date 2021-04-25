import React from 'react';
import commentSectionStyles from './CommentSection.module.scss';
import SingleComment from '../SingleComment/SingleComment';

function CommentSection() {

    function renderComments() {
        return (
            <>
                <li key='1'>
                    <SingleComment />
                </li>
                <li key='2'>
                    <SingleComment />
                </li>
            </>
        );
    }

    return (
        <div className={commentSectionStyles.commentsBlock}>
            <ul>
                {renderComments()}
            </ul>
        </div>
    );
}

export default CommentSection;
