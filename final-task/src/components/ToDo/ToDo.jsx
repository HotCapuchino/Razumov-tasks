import React, { useState, useContext, useEffect } from 'react';
import toDoStyle from './ToDo.module.scss';
import { Dropdown } from 'antd';
import 'antd/dist/antd.css';
import { observer } from 'mobx-react';
import { users } from '../../store/Users/Users';
import Modal from '../ModalHOC/Modal';
import { useToggle } from '../../customHooks/useToggle';
import {userContext} from '../../customHooks/useLogin';
import CommentsDropdown from '../CommentSection/CommentSection';
import Contributors from './Contributors';
import Importance from './Importance';
import DropdownButton from './DropdownButton';
import Status from './Status';

const ToDo = observer(({ toDo, chosen }) => {
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [commentModalVisible, setCommentModalVisible] = useState(false);
    const needToggle = useToggle();
    const [userNum,] = useContext(userContext);
    const [isCommentsDropdown, setIsCommentsDropdown] = useState(window.innerWidth < 992);

    useEffect(() => {
        function setCommentSectionType() {
            // Очень много условий "Если да, то да, если нет, то нет"
            setIsCommentsDropdown(window.innerWidth < 992);
            // if (window.innerWidth < 992) {
            //     setIsCommentsDropdown(true);
            // } else {
            //     setIsCommentsDropdown(false);
            // }
        }
        window.addEventListener('resize', setCommentSectionType);
        return () => {
            window.removeEventListener('resize', setCommentModalVisible);
        }
    }, []);

    // ??
    useEffect(() => {
        // this hook is responsible for an opportunity to delete toDo right after adding it
    }, [toDo?.author_id, toDo?.contributors]);

    function handleDropdownToDoActions(actionType) {
        // break должен быть внутри блока
        switch (actionType) {
            case 'edit': {
                setEditModalVisible(true);
                break;
            }
            case 'comment': {
                setCommentModalVisible(true);
                break;
            }
            case 'delete': {
                toDo.delete();
                break;
            }
            default: break;
        }
    }

    function handleDropdownStatusActions(newStatus, newIndex) {
        if (needToggle(toDo.status, newIndex)) {
            toDo.toggle(toDo.author_id, users?.users[userNum]?.name);
        }
        toDo.edit({
            description: toDo.description,
            status: newStatus,
            importance: toDo.importance
        });
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
                    <Status status={toDo.status} handleDropDownAction={handleDropdownStatusActions}/>
                    <Importance importance={toDo.importance}/>
                    <Contributors toDo={toDo}/>
                    <DropdownButton author_id={toDo.author_id} 
                        userNum={userNum}
                        dropdownActionHandler={handleDropdownToDoActions}/>
                </div>
            </div>
        </>
    )
});

export default ToDo;