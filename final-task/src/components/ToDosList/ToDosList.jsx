import React, { useState } from 'react';
import toDoListStyles from './ToDosList.module.scss';
import ToDosHOC from '../ToDosHOC/ToDosHOC';
import ToDo from '../ToDo/ToDo';
import { observer } from 'mobx-react';
import toDoList from '../../store/ToDoList/ToDoList';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';

const ToDosList = observer((props) => {

    const [active, setActive] = useState(() => props.class_name !== 'completed');

    function renderToDos() {
        if (props.class_name === 'completed') {
            return toDoList.completedToDos.map(toDo => {
                toDo.fetchContributors();
                toDo.fetchComments();
                // console.log('completed:', toDo);
                return (
                    <li className={toDoListStyles.toDoItem} key={toDo.id}>
                        <ToDo toDo={toDo}/>
                    </li>
                );
            });
        } else {
            return toDoList.searchedToDos.map(toDo => {
                toDo.fetchContributors();
                toDo.fetchComments();
                // console.log('unfinished:', toDo);
                return (
                    <li className={toDoListStyles.toDoItem} key={toDo.id}>
                        <ToDo toDo={toDo}/>
                    </li>
                );
            });
        }
    }

    function passOrNot(event) {
        if (!active) {
            event.stopPropagation();
            event.nativeEvent.stopImmediatePropagation();
        }
    }

    function renderComponent() {
        if (toDoList.isLoading) {
            return (
                <div className={toDoListStyles.loadingWrapper + ' ' + toDoListStyles[props.class_name]}>
                    <Spinner animation='border' role='status' variant='primary'>
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            );
        } else {
            return (
                <div className={toDoListStyles.toDoListWrapper + ' ' + toDoListStyles[props.class_name] +
                    `${!active ? ` ${toDoListStyles.inactive}` : ''}`}>
                    <div className={toDoListStyles.titleBlock}>
                        <h1 className={toDoListStyles.titleBlock__title}>
                            {props.class_name === 'hold' ? 'On Hold' : 'Completed'}
                        </h1>
                        {props.class_name === 'completed' ?
                            <button className={toDoListStyles.titleBlock__toggleCompleted} onClick={() => setActive(!active)}>
                                {active ? 'Active' : 'Inactive'}
                            </button> :
                            null}
                    </div>
                    <ul className={toDoListStyles.ToDosList + ' ' + toDoListStyles.test} onClick={(e) => passOrNot(e)}>
                        {renderToDos()}
                    </ul>
                </div>
            );
        }
    }

    return (
        <>
            {renderComponent()}
        </>
    );
});

export default ToDosHOC(ToDosList);
