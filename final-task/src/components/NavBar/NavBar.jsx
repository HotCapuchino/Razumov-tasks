import React, { useContext, useState } from 'react';
import navStyles from './NavBar.module.scss';
import { useSearch } from '../../customHooks/useSearch';
import { Dropdown, Menu } from 'antd';
import {observer} from 'mobx-react';
import Notifications from '../Notifications/Notifications';
import {loginContext, userContext} from '../../customHooks/useLogin';

const NavBar = observer(({user}) => {

    const [searchedText, setSearchedText] = useState('');
    const [iconVisibility, setIconVisibililty] = useState(true);
    const searchFor = useSearch();
    const [loggedIn, setLoggedIn] = useContext(loginContext);
    const [userId, setUserId] = useContext(userContext);

    function handleTextChanging(event) {
        setSearchedText(event.target.value);
        searchFor(event.target.value);
    }

    function handleLogOut() {
        sessionStorage.setItem('loggedin', false);
        sessionStorage.removeItem('userid');
        setLoggedIn(false);
        setUserId(null);
    }

    const userInfoMenu = (
        <Menu>
            <Menu.Item>{user?.name}</Menu.Item>
            <Menu.Item onClick={handleLogOut}>Change User</Menu.Item>
        </Menu>
    );

    return (
        <nav className={navStyles.navBarWrapper}>
            <div className={navStyles.searchBarWrapper}>
                {iconVisibility ? <img src='/assets/icons/search_icon.svg'/> : null}
                <input placeholder='Search ToDo' className={navStyles.searchBarWrapper__input}
                    onChange={(e) => handleTextChanging(e)} value={searchedText} 
                    onFocus={() => setIconVisibililty(false)}
                    onBlur={() => setIconVisibililty(true)}/>
            </div>
            <div className={navStyles.userBlock}>
                <Notifications />
                <div className={navStyles.userInfo}>
                    <Dropdown trigger={['click']} overlay={userInfoMenu}>
                        <img src={user?.photo} alt="pic profile" className={navStyles.userInfo__photo}/>
                    </Dropdown>
                </div>
            </div>
        </nav>
    );
})

export default NavBar;