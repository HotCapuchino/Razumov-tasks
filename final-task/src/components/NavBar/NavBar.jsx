import React, { useContext, useState } from 'react';
import navStyles from './NavBar.module.scss';
import { useSearch } from '../../customHooks/useSearch';
import {observer} from 'mobx-react';
import Notifications from '../Notifications/Notifications';
import {loginContext, userContext} from '../../customHooks/useLogin';
import UserInfo from '../UserInfo/UserInfo';

const NavBar = observer(({user}) => {

    const [searchedText, setSearchedText] = useState('');
    const [iconVisibility, setIconVisibililty] = useState(true);
    const searchFor = useSearch();
    const [, setLoggedIn] = useContext(loginContext);
    const [, setUserId] = useContext(userContext);

    function handleTextChanging(event) {
        setSearchedText(event.target.value);
        searchFor(event.target.value);
    }

    function handleLogOut() {
        // Need use in context
        sessionStorage.setItem('loggedin', false);
        sessionStorage.removeItem('userid');
        setLoggedIn(false);
        setUserId(null);
    }

    function handleClearNotifications() {
        user.clearNotifications();
    }

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
                <Notifications clearNotifications={handleClearNotifications}/>
                <UserInfo user={user} logoutHandler={handleLogOut}/>
            </div>
        </nav>
    );
})

export default NavBar;