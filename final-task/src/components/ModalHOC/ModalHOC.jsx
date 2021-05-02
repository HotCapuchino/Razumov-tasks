import React, {useContext,  useState} from 'react';
import { users } from '../../store/Users/Users';
import toDoList from '../../store/ToDoList/ToDoList';
import { useForm } from '../../customHooks/useForm';
import {useToggle, calcIndex} from '../../customHooks/useToggle';
import {observer} from 'mobx-react';
import {userContext} from '../../customHooks/useLogin';
import RenderComment from './RenderComment';
import RenderCreate from './RenderCreate';
import RenderEdit from './RenderEdit';

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
        }

        function renderUsers() {
            return Object.keys(users.users).map(key => {
                return (
                    <option value={key} key={key}>
                        {users.users[key].name}
                    </option>
                );
            });
        }

        function renderInnerWorld() {
            switch (type) {
                case 'edit': {
                    return (
                        <RenderEdit values={values}
                        errors={errors}
                        inputHandler={handleInput}
                        errorVisibility={errorVisibility}/>
                    )
                }
                case 'create': {
                    return (
                        <RenderCreate values={values}
                            errors={errors}
                            renderUsers={renderUsers}
                            inputHandler={handleInput}
                            errorVisibility={errorVisibility}/>
                    );
                }
                case 'comment': {
                    return (
                        <RenderComment values={values} 
                            errors={errors}
                            toDo={toDo}
                            inputHandler={handleInput}
                            errorVisibility={errorVisibility}/>
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