import React, { useState } from 'react';
import navStyles from './NavBar.module.scss';
import { useSearch } from '../../customHooks/useSearch';
import { Dropdown, Menu } from 'antd';
import {observer} from 'mobx-react';

const NavBar = observer(({user}) => {

    const [searchedText, setSearchedText] = useState('');
    const [iconVisibility, setIconVisibililty] = useState(true);
    const searchFor = useSearch();

    function handleTextChanging(event) {
        setSearchedText(event.target.value);
        searchFor(event.target.value);
    }

    const userInfoMenu = (
        <Menu>
            <Menu.Item>{user?.name}</Menu.Item>
            <Menu.Item>Change User</Menu.Item>
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
                <div className={navStyles.notificationsBlock}>
                    <Dropdown trigger={['click']} >
                        <img src='/assets/icons/notifications.svg' className={navStyles.notificationsBlock__bell}/>
                    </Dropdown>
                </div>
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