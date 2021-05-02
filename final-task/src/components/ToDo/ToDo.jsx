import React, { useState, useContext, useEffect } from 'react';
import toDoStyle from './ToDo.module.scss';
import { Dropdown, Menu } from 'antd';
import 'antd/dist/antd.css';
import { observer } from 'mobx-react';
import { users } from '../../store/Users/Users';
import Modal from '../ModalHOC/Modal';
import { useToggle, calcIndex } from '../../customHooks/useToggle';
import {userContext} from '../../customHooks/useLogin';
import CommentsDropdown from '../CommentSection/CommentSection';

const ToDo = observer(({ toDo, chosen }) => {

    const available_statuses = ['Pending', 'In Progress', 'Completed', 'Cancelled'];
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [commentModalVisible, setCommentModalVisible] = useState(false);
    const needToggle = useToggle();
    const [userNum,] = useContext(userContext);
    const [isCommentsDropdown, setIsCommentsDropdown] = useState(window.innerWidth < 992);

    useEffect(() => {
        function setCommentSectionType() {
            if (window.innerWidth < 992) {
                setIsCommentsDropdown(true);
            } else {
                setIsCommentsDropdown(false);
            }
        }
        window.addEventListener('resize', setCommentSectionType);
        return () => {
            window.removeEventListener('resize', setCommentModalVisible);
        }
    }, []);

    useEffect(() => {
        console.log(toDo?.description, toDo?.status, toDo?.importance);
    }, [toDo?.description, toDo?.status, toDo?.importance]);

    function renderContributors() {
        let contributors_list = [];
        let contributors_length = toDo.contributors.length;
        let end = contributors_length > 5 ? 4 : contributors_length;
        for (let i = 0; i < end; i++) {
            contributors_list.push(
                <li key={toDo.contributors[i].user_id} className={toDoStyle.contributor}>
                    <img src={users.users[toDo.contributors[i].user_id].photo} alt="img here" className={toDoStyle.contributor__photo}/>
                </li>
            );
        }
        if (contributors_length > 5) {
            contributors_list.push(
                <li key='end' className={toDoStyle.contributor}>
                    <div className={toDoStyle.contributor__overflow}>
                        {`+${contributors_length - 4}`}
                    </div>
                </li>
            );
        }
        return contributors_list;
    }

    const actionsMenu = (
        <Menu>
            {Number(userNum) === Number(toDo.author_id) ? 
            <>
                <Menu.Item key='1' onClick={() => handleDropdownToDoActions('edit')}>Edit</Menu.Item> 
                <Menu.Item key='2' onClick={() => handleDropdownToDoActions('delete')}>Delete</Menu.Item>
            </>
            : null }
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
                console.log(toDo);
                try {
                    toDo.delete();
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }

    function handleDropdownStatusActions(newStatus, newIndex) {
        if (needToggle(toDo.status, newIndex)) {
            toDo.toggle(toDo.author_id, users.users[userNum].name);
        }
        toDo.edit({
            description: toDo.description,
            status: newStatus,
            importance: toDo.importance
        });
    }

    function displayStatus() {
        let currentStatusIndex = calcIndex(toDo.status);
        let extra_class = toDoStyle[`statusWrapper__status_${(toDo.status).toLowerCase()}`];
        return (
            <Dropdown trigger={['click']} overlay={renderStatusMenu()}>
                <button className={toDoStyle.statusWrapper__status + ' ' + extra_class}>
                    {available_statuses[currentStatusIndex]}
                </button>
            </Dropdown>
        );
    }

    function displayImportance() {
        let extra_class = toDoStyle[`importanceWrapper__importance_${(toDo.importance).toLowerCase()}`];
        return (
            <div className={toDoStyle.importanceWrapper__importance + ' ' + extra_class}>
                <span>{toDo.importance.charAt(0).toUpperCase() + toDo.importance.slice(1)}</span>
            </div>
        );
    }

    function renderToDoDescription() {
        if (isCommentsDropdown) {
            return (
                <Dropdown trigger={['click']} overlay={<CommentsDropdown type='dropdown'/>}>
                    <div className={toDoStyle.toDoWrapper__description + `${chosen ? ` ${toDoStyle.chosenToDo}` : ''}`} 
                        onClick={() => toDo.displayComments()}>{toDo.description}</div>
                </Dropdown> 
            );
        } else {
            return (
                <div className={toDoStyle.toDoWrapper__description + `${chosen ? ` ${toDoStyle.chosenToDo}` : ''}`} 
                        onClick={() => toDo.displayComments()}>{toDo.description}</div>
            );
        }
    }

    // зачем там два модальных окна? да, вы правы, это костыль, не знаю, как сделать по другому
    return (
        <>
            <Modal visible={editModalVisible} setVisibility={setEditModalVisible} toDo={toDo} type='edit'/>
            <Modal visible={commentModalVisible} setVisibility={setCommentModalVisible} toDo={toDo} type='comment'/>
            <div className={toDoStyle.toDoWrapper}>
                {renderToDoDescription()}
                <div className={toDoStyle.wrapInfo}>
                    <div className={toDoStyle.statusWrapper}>
                        {displayStatus()}
                    </div>
                    <div className={toDoStyle.importanceWrapper}>
                        {displayImportance()}
                    </div>
                    <ul className={toDoStyle.contributorsList}>
                        {renderContributors()}
                    </ul>
                    <Dropdown trigger={['click']} overlay={actionsMenu} >
                        <button className={toDoStyle.dropdownActions}>
                            ...
                        </button>
                    </Dropdown>
                </div>
            </div>
        </>
    )
});

export default ToDo;