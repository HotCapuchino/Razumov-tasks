import React, {useContext, useState} from 'react';
import {Dropdown, Menu} from 'antd';
import loginStyles from './LoginPage.module.scss';
import {users} from '../../store/Users/Users';
import {loginContext, userContext} from '../../customHooks/useLogin';
import {Redirect} from 'react-router-dom';
import { observer } from 'mobx-react';

const LoginPage = observer(() => {

    const [isLogged, setIsLogged] = useContext(loginContext);
    const [userId, setUserId] = useContext(userContext);
    const [chosenId, setChosenId] = useState(1);

    function renderUsers() {
        const usersList = Object.keys(users?.users).map(key => {
            return (
                <Menu.Item className={loginStyles.dropdownItem} onClick={() => setChosenId(key)} key={key}>
                    <img src={users.users[key].photo} className={loginStyles.dropdownItem__photo}/>
                    <div className={loginStyles.dropdownItem__name}>{users.users[key].name}</div>
                </Menu.Item>
            );
        });
        return (
            <Menu className={loginStyles.usersDropdownList}>
                {usersList}
            </Menu>
        );
    }

    function handleLogin() {
        sessionStorage.setItem('loggedin', true);
        sessionStorage.setItem('userid', chosenId);
        setIsLogged(true);
        setUserId(Number(chosenId));
    }

    return (
        <>
        {isLogged ? <Redirect to='/toDo'/> 
        : 
        <div className={loginStyles.loginBlock}>
            <div className={loginStyles.loginBlock__title}>Login Page</div>
            <section className={loginStyles.loginSection}>
                <div className={loginStyles.loginSection__subtitle}>Login as</div>
                <Dropdown trigger={['click']} overlay={renderUsers()}>
                    <div className={loginStyles.userInfo}>
                        <img alt='here will be usr img' 
                            src={users?.users[chosenId]?.photo} 
                            className={loginStyles.userInfo__photo}/>
                        <div className={loginStyles.userInfo__name}>{users?.users[chosenId]?.name}</div>
                    </div>
                </Dropdown>
            </section>
            <button onClick={handleLogin} className={loginStyles.loginBlock__button}>Log In</button>
        </div>
        }
        </>
    )
});

export default LoginPage;
