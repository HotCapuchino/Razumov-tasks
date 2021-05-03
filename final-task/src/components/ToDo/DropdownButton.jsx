import React from 'react';
import toDoStyle from './ToDo.module.scss';
import { Dropdown, Menu } from 'antd';

function DropdownButton({ author_id, userNum, dropdownActionHandler }) {

    const actionsMenu = (
        <Menu>
            {Number(userNum) === Number(author_id) ?
                <>
                    <Menu.Item key='1' onClick={() => dropdownActionHandler('edit')}>Edit</Menu.Item>
                    <Menu.Item key='2' onClick={() => dropdownActionHandler('delete')}>Delete</Menu.Item>
                </>
                : null}
            <Menu.Item key='3' onClick={() => dropdownActionHandler('comment')}>Comment</Menu.Item>
        </Menu>
    );

    return (
        <Dropdown trigger={['click']} overlay={actionsMenu} >
            <button className={toDoStyle.dropdownActions}>...</button>
        </Dropdown>
    )
}

export default DropdownButton;
