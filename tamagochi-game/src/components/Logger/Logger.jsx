import React, {useEffect} from 'react';
import loggerStyles from './Logger.module.scss';
import {log} from '../../store/log';

function Logger() {

    useEffect(() => {
        console.log('log length has changed!');
    }, [log.length]);

    function renderLogs() {
        return log.map((elem, index ) => {
            let className = null;
            switch(elem.className) {
                case 'time': className = loggerStyles.time;
                break;
                case 'work': className = loggerStyles.work;
                break;
                case 'eat': className = loggerStyles.eat;
                break;
                case 'drink': className = loggerStyles.drink;
                break;
                case 'relax': className = loggerStyles.relax;
                break;
                default: break; 
            }
            return (
                <li className={loggerStyles.logList__logItem + ' ' + className} key={index * elem.healthLevel}>
                    <div>{elem.actionDescription}</div>
                    <div>Current health level: {elem.healthLevel}</div>
                </li>
            );
        });
    }

    return (
        <div className={loggerStyles.generalWrapper}>
            <ul className={loggerStyles.logList}>
                {renderLogs()}
            </ul>
        </div>
    )
}

export default Logger
