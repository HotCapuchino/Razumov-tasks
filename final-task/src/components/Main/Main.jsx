import React, {useContext, useEffect} from 'react';
import mainStyles from './Main.module.scss';
import NavBar from '../NavBar/NavBar';
import ToDosList from '../ToDosList/ToDosList';
import ToDoCreator from '../ToDoCreator/ToDoCreator';
import CommentSection from '../CommentSection/CommentSection';
import { observer } from 'mobx-react';
import toDoList from '../../store/ToDoList/ToDoList';
import {users} from '../../store/Users/Users';
import {loginContext, userContext} from '../../customHooks/useLogin';
import {Redirect} from 'react-router-dom';

const Main = observer(() => {

    const [loggedIn,] = useContext(loginContext);
    const [userId,] = useContext(userContext);

    useEffect(() => {
        if (loggedIn) {
            toDoList.fetchToDos();
            users.fetchNotifications(userId);
        } 
    }, [loggedIn]);

    return (
        <>
            {loggedIn ?
                <div className={mainStyles.mainWrapper}>
                    <NavBar user={users?.users[userId]}/>
                    <div className={mainStyles.contentBlock}>
                        <div className={mainStyles.toDoBlock}>
                            <ToDoCreator />
                            <ToDosList listType='hold' />
                            <ToDosList listType='completed' />
                        </div>
                        <CommentSection type='block'/>
                    </div>
                </div>
            : <Redirect to='/login'/>}
        </>
    );
});

export default Main;
