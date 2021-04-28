import React from 'react';
import { users } from '../../store/Users/Users';
import toDoList from '../../store/ToDoList/ToDoList';
import { useForm } from '../../customHooks/useForm';
import modalStyles from './Modal.module.scss';


const ModalHOC = (Component) => 

    function InnerHOC({ setVisibility, visible, type, toDo }) {
        const { values, handleInput } = useForm(() => {
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

        function handleCloseButton() {
            setVisibility(false);
        }

        function handleOkButton(modalType) {
            switch (modalType) {
                case 'edit': {
                    console.log(values);
                    toDo.edit({
                        description: values.description,
                        status: values.status,
                        importance: values.importance
                    })
                    handleCloseButton();
                }
                break;
                case 'comment': {
                    toDo.leaveComment(1, values.comment);
                    handleCloseButton();
                }
                break;
                case 'create': {
                    let executor = values.executor_id || Object.keys(users.users)[0];
                    toDoList.createToDo(values.description, values.importance, executor, "executor");
                    handleCloseButton();
                }
                break;
            }
        }

        function renderUsers() {
            return Object.keys(users.users).map(key => {
                return (
                    <option value={key}>
                        {users.users[key]}
                    </option>
                );
            });
        }

        function renderInnerWorld() {
            switch (type) {
                case 'edit':
                case 'create': {
                    return (
                        <form>
                            <div>
                                <div>description</div>
                                <textarea name='description'
                                    value={values.description}
                                    onChange={(e) => handleInput(e)}></textarea>
                            </div>
                            <div>
                                <select name='importance' value={values.importance} onChange={(e) => handleInput(e)}>
                                    <option value="minor">Minor</option>
                                    <option value="normal">Normal</option>
                                    <option value="critical">Critical</option>
                                </select>
                            </div>
                            <div>
                                {type === 'create' ?
                                    <select name='executor_id' value={values.executor_id} onChange={(e) => handleInput(e)}>
                                        {renderUsers()}
                                    </select> 
                                    : 
                                    <select name='status' value={values.status} onChange={(e) => handleInput(e)}>
                                        <option value="pending">Pending</option>
                                        <option value="inprogress">In Progress</option>
                                        <option value="completed">Completed</option>
                                        <option value="critical">Critical</option>
                                    </select>}
                            </div>
                        </form>
                    );
                }
                case 'comment': {
                    return (
                        <form>
                            <div>
                                <img alt='there has to be an image' />
                                <div>here will be toDo text</div>
                            </div>
                            <div>
                                <div>Leave you comment here!</div>
                                <textarea name='comment' value={values.comment || ''} onChange={(e) => handleInput(e)}></textarea>
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
    };

export default ModalHOC;