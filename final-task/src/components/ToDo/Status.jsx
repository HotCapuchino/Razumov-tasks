import React from 'react';
import toDoStyle from './ToDo.module.scss';
import { calcIndex } from '../../customHooks/useToggle';
import { Dropdown, Menu } from 'antd';

function Status({handleDropDownAction, status}) {
    const available_statuses = ['Pending', 'In Progress', 'Completed', 'Cancelled'];

    function renderStatusMenu() {
        let statuses_list = [];
        // Можно заменить на простой фильтр
        for (let i = 0; i < available_statuses.length; i++) {
            const _status = available_statuses[i].toLowerCase().replace(' ', '')
            // if (available_statuses[i].toLowerCase().replace(' ', '') !== status) {
            if (_status !== status) {
                statuses_list.push(
                    <Menu.Item key={available_statuses[i]}
                        // onClick={() => handleDropDownAction(available_statuses[i].toLowerCase().replace(' ', ''), i)}>
                        onClick={() => handleDropDownAction(_status, i)}>
                        {available_statuses[i]}
                    </Menu.Item>
                );
            }
        }
        return (
            <Menu>
                {statuses_list}
            </Menu>
        );
    }

    function displayStatus() {
        let currentStatusIndex = calcIndex(status);
        let extra_class = toDoStyle[`statusWrapper__status_${status.toLowerCase()}`];
        return (
            <Dropdown trigger={['click']} overlay={renderStatusMenu()}>
                <button className={toDoStyle.statusWrapper__status + ' ' + extra_class}>
                    {available_statuses[currentStatusIndex]}
                </button>
            </Dropdown>
        );
    }

    return (
        <div className={toDoStyle.statusWrapper}>
            {displayStatus()}
        </div>
    );
}

export default Status;
