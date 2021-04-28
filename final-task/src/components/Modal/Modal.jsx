import React, { useState, useEffect } from 'react';
import modalStyles from './Modal.module.scss';
import {Modal} from 'react-bootstrap';
import {users} from '../../store/Users/Users';
import {observer} from 'mobx-react';
// import toDoList from '../../store/ToDoList/ToDoList';

const ModalWindow = observer(({show, handleClose, toDo, type}) => {

    const [formState, setFormState] = useState({
        description: '',
        importance: 'minor',
        executor_id: ''
    });

    useEffect(() => {
        if (toDo) {
            setFormState({
                description: toDo.description,
                importance: toDo.importance,
                executor_id: toDo.executor
            });
            console.log(toDo.contributors.length);  
            // for (const contributor of toDo.contributors) {
            //     console.log(contributor);
            // }
        }
    }, []);

    function renderUsers() {
        return Object.keys(users.users).map(key => {
            return (
                <option value={key}>
                    {users.users[key]}
                </option>
            );
        });
    }

    function handleFormInput(event) {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value
        });
    }

    function addToDo() {
        console.log(formState);
        // let executor = formState.executor_id || Object.keys(users.users)[0];
        // toDoList.createToDo(formState.description, formState.importance, executor, "executor");
        // handleClose();
    }

    return (
        <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton onClick={handleClose}>
            <Modal.Title id="contained-modal-title-vcenter">
                {type !== 'edit' ? 'Create ToDo' : 'Edit ToDo'}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <div>
                    <p>description</p>
                    <textarea value={formState.description} onChange={(e) => handleFormInput(e)} name='description'></textarea>
                </div>
                <div>
                    <select value={formState.importance} onChange={(e) => handleFormInput(e)} name='importance'>
                        <option value="minor">Minor</option>
                        <option value="normal">Normal</option>
                        <option value="critical">Critical</option>
                    </select>
                </div>
                <div>
                    <select value={formState.executor_id} onChange={(e) => handleFormInput(e)} name='executor_id'>
                        {renderUsers()}
                    </select>
                </div>
            </form>    
        </Modal.Body>
        <Modal.Footer>
            <button onClick={addToDo}>Apply Changes</button>
            <button onClick={handleClose}>Cancel</button>
        </Modal.Footer>
      </Modal>
    );
});

export default ModalWindow;