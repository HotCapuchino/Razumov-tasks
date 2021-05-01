import React, {useContext} from 'react';
import commentSectionStyles from './CommentSection.module.scss';
import SingleComment from '../SingleComment/SingleComment';
import {observer} from 'mobx-react';
import toDoList from '../../store/ToDoList/ToDoList';
import {users} from '../../store/Users/Users';
import {userContext} from '../../customHooks/useLogin';

const CommentSection = observer(() => {

    const [userNum,] = useContext(userContext);

    function renderComments() {
        if (toDoList?.chosenToDo?.comments.length) {
            let comms = [];
            for (let i = toDoList.chosenToDo.comments.length - 1; i >= 0; i--) {
                let comment = toDoList.chosenToDo.comments[i];
                let user = users.users[comment.user_id];
                comms.push(
                    <li key={i}>
                        <SingleComment text={comment.text} 
                            commentatorName={user.name}
                            photo={user.photo}
                            toDoOwner={users.users[toDoList.chosenToDo.author_id].name} 
                            time={comment.time}
                            toDoName={toDoList.chosenToDo.description}
                            currentUserName={users.users[userNum].name}/>
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
                {toDoList?.chosenToDo?.comments.length ? null :
                <li key='nocomms' className={commentSectionStyles.commentsList__noComments}>Seems like there's no comments by now...</li>}
                {renderComments()}
            </ul>
        </div>
    );
})

export default CommentSection;
