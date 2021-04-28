import React from 'react';
import commentSectionStyles from './CommentSection.module.scss';
import SingleComment from '../SingleComment/SingleComment';
import {observer} from 'mobx-react';
import toDoList from '../../store/ToDoList/ToDoList';
import {users} from '../../store/Users/Users';

const CommentSection = observer(() => {

    function renderComments() {
        if (toDoList?.chosenToDo?.comments) {
            let comms = [];
            for (let i = toDoList.chosenToDo.comments.length - 1; i >= 0; i--) {
                let comment = toDoList.chosenToDo.comments[i];
                comms.push(
                    <li key={i}>
                        <SingleComment text={comment.text} 
                            userName={users.users[comment.user_id]} 
                            toDoName={toDoList.chosenToDo.description}/>
                    </li>
                );
            }
            return comms;
        } else {
            return null;
        }
    }

    return (
        <div className={commentSectionStyles.commentsBlock}>
            <ul className={commentSectionStyles.commentsList}>
                {renderComments()}
            </ul>
        </div>
    );
})

export default CommentSection;
