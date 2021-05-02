import React, { useEffect, useState } from 'react';
import notificationStyles from './Notifications.module.scss';
import { Dropdown, Menu } from 'antd';
import { users } from '../../store/Users/Users';
import { observer } from 'mobx-react';

const Notifications = observer(({ clearNotifications }) => {

    const [dropDownVisible, setDropDownVisible] = useState(null);
    //this hook is responsible for deleting user notifications only when dropdown is closed!
    useEffect(() => {
        if (dropDownVisible === false) {
            clearNotifications();
        }

    }, [dropDownVisible])

    function renderNotifications() {
        let notifications = users?.userNotifications.map((notification, index) => {
            return (
                <Menu.Item key={index}>
                    {notification.text}
                </Menu.Item>
            );
        });
        if (notifications.length) {
            return (
                <Menu>
                    {notifications}
                </Menu>
            );
        } else {
            return (
                <Menu>
                    <Menu.Item>There is nothing here by now!</Menu.Item>
                </Menu>
            );
        }
    }

    function handleVisibility() {
        setDropDownVisible(!dropDownVisible);
    }

    return (
        <div className={notificationStyles.notificationsBlock}>
            <Dropdown trigger={['click']} overlay={renderNotifications()}
                onVisibleChange={handleVisibility} placement='bottomCenter'>
                <div className={notificationStyles.notificationsBell}>
                    <img className={notificationStyles.notificationsBell__image}
                        src='/assets/icons/notifications.svg' />
                    {users?.userNotifications.length ?
                        <div className={notificationStyles.notificationsBell__notifications}>
                            {users.userNotifications.length}
                        </div> : null}
                </div>
            </Dropdown>
        </div>
    )
});

export default Notifications;
