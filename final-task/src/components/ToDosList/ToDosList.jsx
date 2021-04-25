import React, { useState } from 'react';
import toDoListStyles from './ToDosList.module.scss';
import ToDosHOC from '../ToDosHOC/ToDosHOC';
import ToDo from '../ToDo/ToDo';
import {observer} from 'mobx-react';
import toDoList from '../../store/ToDoList/ToDoList';

const ToDosList = observer((props) => {

    const [active, setActive] = useState(() => props.class_name !== 'completed');

    function renderToDos() {
        if (props.class_name === 'completed') {
            return toDoList.completedToDos.map(toDo => {
                toDo.fetchContributors();
                toDo.fetchComments();
                return (
                    <li className={toDoListStyles.toDoItem} key={toDo.id}>
                        <ToDo toDo={toDo}/>
                    </li>
                );
            });
        } else {
            return toDoList.unfinishedToDos.map(toDo => {
                toDo.fetchContributors();
                toDo.fetchComments();
                return (
                    <li className={toDoListStyles.toDoItem}>
                        <ToDo toDo={toDo}/>
                    </li>
                );
            });
        }
    }

    function passOrNot(event) {
        console.log(active);
        if (!active) {
            event.stopPropagation();
            event.nativeEvent.stopImmediatePropagation();
        }
    }
    
    return (
        <div className={toDoListStyles.toDoListWrapper + ' ' + toDoListStyles[props.class_name] + 
            `${!active ? ` ${toDoListStyles.inactive}` : ''}`}>
            <div className={toDoListStyles.titleBlock}>
                <h1 className={toDoListStyles.titleBlock__title}>
                    {props.class_name === 'hold' ? 'On Hold' : 'Completed'}
                </h1>
                {props.class_name === 'completed' ?
                    <button className={toDoListStyles.titleBlock__toggleCompleted} onClick={() => setActive(!active)}>
                        {active ? 'Active': 'Inactive'}
                    </button> :
                    null}
            </div>
            <ul className={toDoListStyles.ToDosList} onClick={(e) => passOrNot(e)}>
                {renderToDos()}
            </ul>
        </div>
    );
});

export default ToDosHOC(ToDosList);
