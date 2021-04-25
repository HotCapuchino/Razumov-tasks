import React from 'react';
import mainStyles from './Main.module.scss';
import NavBar from '../NavBar/NavBar';
import ToDosList from '../ToDosList/ToDosList';
import ToDoCreator from '../ToDoCreator/ToDoCreator';
import CommentSection from '../CommentSection/CommentSection';
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import toDoList from '../../store/ToDoList/ToDoList';

const Main = observer((props) => {

    useEffect(() => {
        toDoList.fetchToDos();
    }, []);

    return (
        <div className={mainStyles.mainWrapper}>
            <NavBar />
            <div className={mainStyles.contentBlock}>
                <div className={mainStyles.toDoBlock}>
                    <ToDoCreator />
                    <ToDosList listType='hold' />
                    <ToDosList listType='completed' />
                </div>
                <CommentSection />
            </div>
        </div>
    )
});

export default Main;
