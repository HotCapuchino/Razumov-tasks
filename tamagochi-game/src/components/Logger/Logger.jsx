import React from 'react';
import loggerStyles from './Logger.module.scss';
import {log} from '../../store/log';
import LoggerItem from '../LoggerItem/LoggerItem';

function Logger() {

    function renderLogs() {
        return log.map((elem, index) => {
            return <LoggerItem color={elem.className} key={index} 
                        actionDescription={elem.actionDescription} healthLevel={elem.healthLevel} changedProperty={elem.changedProperty}/>;
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
