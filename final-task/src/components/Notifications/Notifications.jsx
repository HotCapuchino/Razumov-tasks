import React from 'react';
import notificationStyles from './Notifications.module.scss';

function Notifications() {


    return (
        <div>
            <Dropdown trigger={['click']} >
                <img src='/assets/icons/notifications.svg' className={navStyles.notificationsBlock__bell}/>
            </Dropdown>
        </div>
    )
}

export default Notifications;
