import React, {useEffect} from 'react';
import toDoStyle from './ToDo.module.scss';
import { Dropdown, Menu } from 'antd';
import {observer} from 'mobx-react';
import {users} from '../../store/Users/Users';

const ToDo = observer(({toDo}) => {

    // console.log(toDo);
    // const cotributors2 = null;
    // useEffect(() => {
    //     console.log(toDo.contributors, toDo.comments);
    // }, [toDo.contributors]);

    const importance = 'minor';
    const status = 'pending';
    const testColor = ['red', 'green', 'blue', 'yellow', 'purple'];

    function renderContributors() {
        let contributors_list = [];
        let contributors_length = toDo.contributors.length;
        let end = contributors_length > 5 ? 4 : contributors_length;
        for (let i = 0; i < end; i++) {
            contributors_list.push(
                <li key={toDo.contributors[i] + i} className={toDoStyle.contributor} style={{ backgroundColor: testColor[i] }}>
                    {toDo.contributors[i].user_id}
                </li>
            );
        }
        if (contributors_length > 5) {
            contributors_list.push(
                <li key='end' className={toDoStyle.contributor}>
                    {`+${contributors_length - 4}`}
                </li>
            );
        }
        return contributors_list;
    }

    const actionsMenu = (
        <Menu>
            <Menu.Item key='1' onClick={() => handleDropdownToDoActions('edit')}>Edit</Menu.Item>
            <Menu.Item key='2' onClick={() => handleDropdownToDoActions('delete')}>Delete</Menu.Item>
            <Menu.Item key='3' onClick={() => handleDropdownToDoActions('comment')}>Comment</Menu.Item>
        </Menu>
    );

    function renderStatusMenu() {
        const available_statuses = ['pending, inProgress', 'completed', 'cancelled'];
        let statuses_list = [];
        for (const av_status of available_statuses) {
            if (av_status !== status) {
                statuses_list.push(
                    <Menu.Item key={av_status}>{av_status.charAt(0).toUpperCase() + av_status.slice(1)}</Menu.Item>
                );
            };
        }
        return (
            <Menu>
                {statuses_list}
            </Menu>
        );
    }

    function handleDropdownToDoActions(actionType) {
        console.log(actionType);
        switch (actionType) {
            case 'edit': // do smth
                break;
            case 'delete': // do smth
                break;
            case 'comment': // do smth
                break;
        }
    }

    function handleDropdownStatusActions(newStatus) {

    }

    function displayStatus() {
        let extra_class = toDoStyle[`toDoWrapper__status_${(toDo.status).toLowerCase()}`];
        return (
            <Dropdown trigger={['click']} overlay={renderStatusMenu()}>
                <button className={toDoStyle.toDoWrapper__status + ' ' + extra_class}>
                    {toDo.status.charAt(0).toUpperCase() + toDo.status.slice(1)}
                </button>
            </Dropdown>
        );
    }

    function displayImportance() {
        let extra_class = toDoStyle[`toDoWrapper__importance_${(toDo.importance).toLowerCase()}`];
        return (
            <div className={toDoStyle.toDoWrapper__importance + ' ' + extra_class}>
                <span>{toDo.importance.charAt(0).toUpperCase() + toDo.importance.slice(1)}</span>
            </div>
        );
    }

    return (
        <div className={toDoStyle.toDoWrapper}>
            <div className={toDoStyle.toDoWrapper__description}>Some desc</div>
            {displayStatus()}
            {displayImportance()}
            <ul className={toDoStyle.contributorsList}>
                {renderContributors()}
            </ul>
            <Dropdown trigger={['click']} overlay={actionsMenu}>
                <button className={toDoStyle.dropdownActions}>
                    <span>...</span>
                </button>
            </Dropdown>
        </div>
    )
});

export default ToDo;