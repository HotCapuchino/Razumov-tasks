import React, { useState } from 'react';
import toDoStyle from './ToDo.module.scss';
import { Dropdown, Menu } from 'antd';
import 'antd/dist/antd.css';
import { observer } from 'mobx-react';
import { users } from '../../store/Users/Users';
import Modal from '../ModalHOC/Modal';

const ToDo = observer(({ toDo }) => {

    const testColor = ['red', 'green', 'blue', 'yellow', 'purple'];
    const available_statuses = ['Pending', 'In Progress', 'Completed', 'Cancelled'];
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [commentModalVisible, setCommentModalVisible] = useState(false);

    function renderContributors() {
        let contributors_list = [];
        let contributors_length = toDo.contributors.length;
        let end = contributors_length > 5 ? 4 : contributors_length;
        for (let i = 0; i < end; i++) {
            contributors_list.push(
                <li key={toDo.contributors[i].user_id + i} className={toDoStyle.contributor} style={{ backgroundColor: testColor[i] }}>
                    {users.users[toDo.contributors[i].user_id].charAt(0).toUpperCase()}
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
        let statuses_list = [];
        for (let i = 0; i < available_statuses.length; i++) {
            if (available_statuses[i].toLowerCase().replace(' ', '') !== toDo.status) {
                statuses_list.push(
                    <Menu.Item key={available_statuses[i]}
                        onClick={() => handleDropdownStatusActions(available_statuses[i].toLowerCase().replace(' ', ''), i)}>
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

    function handleDropdownToDoActions(actionType) {
        switch (actionType) {
            case 'edit': {
                setEditModalVisible(true);
            }
            break;
            case 'comment': {
                setCommentModalVisible(true);
            }
            break;
            case 'delete': {
                try {
                    toDo.delete();
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }

    function calculateCurrentStatusIndex() {
        return available_statuses.findIndex(elem => {
            if (elem.toLowerCase().replace(' ', '') === toDo.status) {
                return true;
            }
        });
    }

    function handleDropdownStatusActions(newStatus, newIndex) {
        let currentStatusIndex = calculateCurrentStatusIndex();
        // checking if we have to change toDo completed value
        if (Math.abs(currentStatusIndex - newIndex) > 1 || currentStatusIndex * newIndex === 2) {
            toDo.toggle();
        }
        toDo.edit({
            description: toDo.description,
            status: newStatus,
            importance: toDo.importance
        });
    }

    function displayStatus() {
        let currentStatusIndex = calculateCurrentStatusIndex();
        let extra_class = toDoStyle[`toDoWrapper__status_${(toDo.status).toLowerCase()}`];
        return (
            <Dropdown trigger={['click']} overlay={renderStatusMenu()}>
                <button className={toDoStyle.toDoWrapper__status + ' ' + extra_class}>
                    {available_statuses[currentStatusIndex]}
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

    // зачем там два модальных окна? да, вы правы, это костыль, не знаю, как сделать по другому
    return (
        <>
            <Modal visible={editModalVisible} setVisibility={setEditModalVisible} toDo={toDo} type='edit'/>
            <Modal visible={commentModalVisible} setVisibility={setCommentModalVisible} toDo={toDo} type='comment'/>
            <div className={toDoStyle.toDoWrapper}>
                <div className={toDoStyle.toDoWrapper__description} onClick={() => toDo.displayComments()}>{toDo.description}</div>
                {displayStatus()}
                {displayImportance()}
                <ul className={toDoStyle.contributorsList}>
                    {renderContributors()}
                </ul>
                <Dropdown trigger={['click']} overlay={actionsMenu} >
                    <button className={toDoStyle.dropdownActions}>
                        ...
                    </button>
                </Dropdown>
            </div>
        </>
    )
});

export default ToDo;