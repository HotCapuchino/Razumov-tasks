import React, {useContext} from 'react';
import { Menu } from 'antd';
import commentSectionStyles from './CommentSection.module.scss';
import SingleComment from '../SingleComment/SingleComment';
import {observer} from 'mobx-react';
import toDoList from '../../store/ToDoList/ToDoList';
import {users} from '../../store/Users/Users';
import {userContext} from '../../customHooks/useLogin';

const CommentSection = observer(({type}) => {

    const [userNum,] = useContext(userContext);

    function renderComments() {
        if (toDoList?.chosenToDo?.comments.length) {
            let comms = [];
            for (let i = toDoList.chosenToDo.comments.length - 1; i >= 0; i--) {
                let comment = toDoList.chosenToDo.comments[i];
                let user = users.users[comment.user_id];
                let singleComment = <SingleComment text={comment.text} 
                                        commentatorName={user.name}
                                        photo={user.photo}
                                        toDoOwner={users.users[toDoList.chosenToDo.author_id].name} 
                                        time={comment.time}
                                        toDoName={toDoList.chosenToDo.description}
                                        currentUserName={users.users[userNum].name}/>;
                if (type === 'block') {
                    comms.push(
                        <li key={i}>
                            {singleComment}
                        </li>
                    );
                } else {
                    comms.push(
                        <Menu.Item key={i} className={commentSectionStyles.commentsListDropdown__listItem}>
                            {singleComment}
                        </Menu.Item>
                    );
                }
            }
            return comms;
        } else {
            if (type === 'block') {
                return null;
            } else {
                return (
                    <Menu.Item className={commentSectionStyles.commentsListDropdown__noComments} key='nocomms'>
                        Seems like there's no comments by now...
                    </Menu.Item>
                );
            }
        }
    }

    return (
        <>
        {type === 'block' ? 
            <div className={commentSectionStyles.commentsBlock}>
                <ul className={commentSectionStyles.commentsList}>
                    {toDoList?.chosenToDo?.comments.length ? null :
                    <li key='nocomms' className={commentSectionStyles.commentsList__noComments}>Seems like there's no comments by now...</li>}
                    {renderComments()}
                </ul>
            </div>
        :
        <Menu className={commentSectionStyles.commentsListDropdown}>
            {renderComments()}
        </Menu>}
        </>
    );
})

export default CommentSection;
