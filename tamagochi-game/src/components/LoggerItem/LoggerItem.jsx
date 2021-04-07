import React, { useEffect, useState } from 'react';
import loggerItemStyles from './LoggerItem.module.scss';

function LoggerItem(props) {

    const { actionDescription, changedProperty, healthLevel } = props;
    const [listVisibility, setListVisibility] = useState(false);
    const [color, setColor] = useState();

    useEffect(() => {
        switch(props.color) {
            case 'time': setColor(loggerItemStyles.time);
            break;
            case 'work': setColor(loggerItemStyles.work);
            break;
            case 'eat': setColor(loggerItemStyles.eat);
            break;
            case 'drink': setColor(loggerItemStyles.drink);
            break;
            case 'relax': setColor(loggerItemStyles.relax);
            break;
            default: break; 
        }
    }, []);

    function handleShowDetails() {
        setListVisibility(prevState => !prevState);
    }

    return (
        <li className={loggerItemStyles.logItem + ' ' + color}>
            <div>{actionDescription}</div>
            <div className={loggerItemStyles.logItem__dropdownDiv}onClick={handleShowDetails}>See details...</div>
            <ul className={listVisibility ? loggerItemStyles.seeDetailsList : loggerItemStyles.none}>
                <li>{changedProperty}</li>
                <li>Current health level: {healthLevel}</li>
            </ul>
        </li>
    )
}

export default LoggerItem;
