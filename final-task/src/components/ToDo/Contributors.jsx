import React from 'react';
import {observer} from 'mobx-react';
import toDoStyle from './ToDo.module.scss';
import { users } from '../../store/Users/Users';

const Contributors = observer(({toDo}) => {

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

    return (
        <ul className={toDoStyle.contributorsList}>
            {renderContributors()}
        </ul>
    );
});

export default Contributors;
