import React, { useState } from 'react';
import { observer } from 'mobx-react';
import creatorStyles from './ToDoCreator.module.scss';
import toDoList from '../../store/ToDoList/ToDoList';
import Modal from '../ModalHOC/Modal';

const ToDoCreator = observer(() => {

    let tasksAmount = toDoList.unfinishedToDos.length;
    const [modalVisible, setModalVisible] = useState(false);
    const [imgSrc, setImgSrc] = useState('/assets/icons/add_item_white.svg');

    return (
        <>
            <Modal setVisibility={setModalVisible} visible={modalVisible} type='create'/>
            <div className={creatorStyles.toDoCreatorWrapper}>
                <h1 className={creatorStyles.toDoCreatorWrapper__title}>You've got
                <span className={creatorStyles.toDoCreatorWrapper__tasksToday}>
                        {` ${tasksAmount} ${tasksAmount > 1 ? 'tasks' : 'task'} `}
                    </span>
                    today
                </h1>
                <button className={creatorStyles.toDoCreatorWrapper__add} 
                    onClick={() => setModalVisible(true)} 
                    onMouseLeave={() => setImgSrc('/assets/icons/add_item_white.svg')}
                    onMouseEnter={() => setImgSrc('/assets/icons/add_item_purple.svg')}>
                        <img src={imgSrc}/>
                        <span>Add new</span>
                </button>
            </div>
        </>
    );
});

export default ToDoCreator;
