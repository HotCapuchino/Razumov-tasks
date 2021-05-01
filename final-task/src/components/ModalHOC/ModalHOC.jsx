import React, {useContext,  useState} from 'react';
import { users } from '../../store/Users/Users';
import toDoList from '../../store/ToDoList/ToDoList';
import { useForm } from '../../customHooks/useForm';
import modalStyles from './Modal.module.scss';
import {useToggle, calcIndex} from '../../customHooks/useToggle';
import {observer} from 'mobx-react';
import {userContext} from '../../customHooks/useLogin';

const ModalHOC = (Component) => 

    observer(function InnerHOC({ setVisibility, visible, type, toDo }) {

        function defineFormFields() {
            switch (type) { 
                case 'create': {
                    return {
                        description: '',
                        importance: 'minor',
                        executor_id: 1
                    }
                }
                case 'edit': {
                    return {
                        description: toDo.description,
                        status: toDo.status,
                        importance: toDo.importance
                    };
                }
                case 'comment': {
                    return {
                        comment: ''
                    }
                }
            }
        }

        const { values, handleInput, errors, validateInputs, clearValues } = useForm(defineFormFields());
        const [errorVisibility, setErrorVisibility] = useState(false);
        const needToggle = useToggle();
        const [userNum,] = useContext(userContext);

        function handleCloseButton() {
            setVisibility(false);
        }

        function handleOkButton(modalType) {
            if (!validateInputs()) {
                setErrorVisibility(true);
                console.log('Some of the fields are empty!', values);
                setTimeout(() => {
                    setErrorVisibility(false);
                }, 2000)
                return;
            }
            switch (modalType) {
                case 'edit': {
                    if (needToggle(toDo.status, calcIndex(values.status))) {
                        toDo.toggle(toDo.author_id, users.users[userNum].name);
                    }
                    toDo.edit({
                        description: values.description,
                        status: values.status,
                        importance: values.importance
                    });
                    handleCloseButton();
                }
                break;
                case 'comment': {
                    toDo.leaveComment(Number(userNum), users.users[userNum].name, values.comment);
                    handleCloseButton();
                }
                break;
                case 'create': {
                    let executor = values.executor_id || Object.keys(users.users)[0];
                    toDoList.createToDo(values.description, 
                            values.importance, 
                            Number(executor), 
                            Number(userNum), 
                            users.users[userNum].name);
                    handleCloseButton();
                }
                break;
            }
            clearValues();
            console.log(values);
        }

        function renderUsers() {
            return Object.keys(users.users).map(key => {
                return (
                    <option value={key}>
                        {users.users[key].name}
                    </option>
                );
            });
        }

        function renderInnerWorld() {
            switch (type) {
                case 'edit':
                case 'create': {
                    return (
                        <form className={modalStyles.form}>
                            <div className={modalStyles.descriptionBlock}>
                                <div className={modalStyles.descriptionBlock__title}>ToDo description</div>
                                {errors.description && errorVisibility ? <div className={modalStyles.errorMessage}>{errors.description}</div> : null}
                                <textarea name='description'
                                    value={values.description}
                                    onChange={(e) => handleInput(e)}
                                    className={modalStyles.textarea}></textarea>
                            </div>
                            <div>
                                <label className={modalStyles.label}>Importance</label>
                                {errors.importance && errorVisibility ? <div className={modalStyles.errorMessage}>{errors.importance}</div> : null}
                                <select name='importance' 
                                    value={values.importance} 
                                    onChange={(e) => handleInput(e)}
                                    className={modalStyles.select}>
                                    <option value="minor">Minor</option>
                                    <option value="normal">Normal</option>
                                    <option value="critical">Critical</option>
                                </select>
                            </div>
                            <div>
                                {type === 'create' ? 
                                    <>
                                        <label className={modalStyles.label}>Executor</label>
                                        <select name='executor_id' 
                                            value={values.executor_id} 
                                            onChange={(e) => handleInput(e)}
                                            className={modalStyles.select}>
                                            {renderUsers()}
                                        </select> 
                                    </>
                                    : 
                                    <>
                                        <label className={modalStyles.label}>Status</label>
                                        <select name='status' 
                                            value={values.status} 
                                            onChange={(e) => handleInput(e)}
                                            className={modalStyles.select}>
                                            <option value="pending">Pending</option>
                                            <option value="inprogress">In Progress</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </>}
                            </div>
                        </form>
                    );
                }
                case 'comment': {
                    return (
                        <form>
                            <div className={modalStyles.toDoInfo}>
                                <img alt='there has to be an image' src={users.users[toDo?.author_id]?.photo}
                                    className={modalStyles.toDoInfo__photo}/>
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
                                    onChange={(e) => handleInput(e)}
                                    className={modalStyles.textarea}></textarea>
                            </div>
                        </form>
                    );
                }
            }
        }

        return (
            <Component
                type={type}
                visible={visible}
                toDo={toDo}
                close={handleCloseButton}
                accept={(type) => handleOkButton(type)}>
                {renderInnerWorld()}
            </Component>
        );
    });

export default ModalHOC;