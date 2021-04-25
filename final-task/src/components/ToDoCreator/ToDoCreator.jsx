import React from 'react';
import {observer} from 'mobx-react';
import creatorStyles from './ToDoCreator.module.scss';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { useAPI } from '../../customHooks/useAPI';
import toDoList from '../../store/ToDoList/ToDoList';

const ToDoCreator = observer((props) => {
    let tasksAmount = toDoList.unfinishedToDos.length;
    const api = useAPI();

    function handleAddToDo() {
        // api.createToDo('Wash dishes', 'pending', 'critical')
        // .then(data => console.log(data))
        // .catch(err => console.log(err));
    }

    return (
        <div className={creatorStyles.toDoCreatorWrapper}>
            <h1 className={creatorStyles.toDoCreatorWrapper__title}>You've got 
                <span className={creatorStyles.toDoCreatorWrapper__tasksToday}> 
                    {` ${tasksAmount} ${tasksAmount > 1 ? 'tasks' : 'task'} `}
                </span> 
                today
            </h1>
            <Button className={creatorStyles.toDoCreatorWrapper__add} type='primary' onClick={handleAddToDo}>Add new</Button>
        </div>
    );
});

export default ToDoCreator;
