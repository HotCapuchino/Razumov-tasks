import React from 'react';
import toDoStyle from './ToDo.module.scss';

function Importance({importance}) {

    function displayImportance() {
        let extra_class = toDoStyle[`importanceWrapper__importance_${(importance).toLowerCase()}`];
        return (
            <div className={toDoStyle.importanceWrapper__importance + ' ' + extra_class}>
                <span>{importance.charAt(0).toUpperCase() + importance.slice(1)}</span>
            </div>
        );
    }

    return (
        <div className={toDoStyle.importanceWrapper}>
            {displayImportance()}
        </div>
    )
}

export default Importance;
