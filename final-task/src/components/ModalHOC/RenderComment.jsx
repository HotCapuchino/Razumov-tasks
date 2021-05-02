import React from 'react';
import modalStyles from './Modal.module.scss';
import { observer } from 'mobx-react';
import { users } from '../../store/Users/Users';

const RenderComment = observer(({ values, errors, inputHandler, toDo, errorVisibility }) => {
    return (
        <form>
            <div className={modalStyles.toDoInfo}>
                <img alt='there has to be an image' src={users.users[toDo?.author_id]?.photo}
                    className={modalStyles.toDoInfo__photo} />
                <div className={modalStyles.userInfo}>
                    <div className={modalStyles.userInfo__name}>{users.users[toDo?.author_id]?.name}</div>
                    <div className={modalStyles.userInfo__text}>{toDo.description}</div>
                </div>
            </div>
            <div>
                <label className={modalStyles.label}>Leave you comment here</label>
                {errors.comment && errorVisibility ? <div className={modalStyles.errorMessage}>{errors.comment}</div> : null}
                <textarea name='comment'
                    value={values.comment}
                    onChange={(e) => inputHandler(e)}
                    className={modalStyles.textarea}></textarea>
            </div>
        </form>
    )
});

export default RenderComment;
