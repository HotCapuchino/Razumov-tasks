import React from 'react'
import { Dropdown, Menu } from 'antd';
import userInfoStyles from './UserInfo.module.scss';

function UserInfo({user, logoutHandler}) {

    const userInfoMenu = (
        <Menu>
            <Menu.Item>{user?.name}</Menu.Item>
            <Menu.Item onClick={logoutHandler}>Change User</Menu.Item>
        </Menu>
    );

    return (
        <div className={userInfoStyles.userInfo}>
            <Dropdown trigger={['click']} overlay={userInfoMenu}>
                <img src={user?.photo} alt="pic profile" className={userInfoStyles.userInfo__photo} />
            </Dropdown>
        </div>
    );
}

export default UserInfo;
