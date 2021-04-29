import React, {useContext} from 'react';
import { users } from '../../store/Users/Users';
import toDoList from '../../store/ToDoList/ToDoList';
import { useForm } from '../../customHooks/useForm';
import modalStyles from './Modal.module.scss';
import { useState } from 'react';
import {useToggle} from '../../customHooks/useToggle';
import {observer} from 'mobx-react';
import {userNumber} from '../../App';

const ModalHOC = (Component) => 

    observer(function InnerHOC({ setVisibility, visible, type, toDo }) {
        const { values, handleInput, errors, validateInputs, clearValues } = useForm(() => {

            console.log(toDo?.status);

            switch (type) { 
                case 'create': {
                    return {
                        description: '',
                        importance: 'minor',
                        executor_id: ''
                    }
                }
                case 'edit': {
                    return {
                        description: toDo.description,
                        status: toDo.status,
                        importance: toDo.importance
                    }
                }
                case 'comment': {
                    return {
                        comment: ''
                    }
                }
            }
        });

        const [errorVisibility, setErrorVisibility] = useState(false);
        const needToggle = useToggle();
        const userNum = useContext(userNumber);

        function handleCloseButton() {
            setVisibility(false);
        }

        function handleOkButton(modalType) {
            if (!validateInputs()) {
                setErrorVisibility(true);
                setTimeout(() => {
                    setErrorVisibility(false);
                }, 2000)
                return;
            }
            switch (modalType) {
                case 'edit': {
                    // if (needToggle())
                    // toDo.edit({
                    //     description: values.description,
                    //     status: values.status,
                    //     importance: values.importance
                    // });
                    handleCloseButton();
                }
                break;
                case 'comment': {
                    toDo.leaveComment(userNum, values.comment);
                    handleCloseButton();
                }
                break;
                case 'create': {
                    let executor = values.executor_id || Object.keys(users.users)[0];
                    toDoList.createToDo(values.description, values.importance, Number(executor), userNum);
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
                                            <option value="critical">Critical</option>
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
                                <img alt='there has to be an image' />
                                <div className={modalStyles.toDoInfo__text}>{toDo.description}</div>
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