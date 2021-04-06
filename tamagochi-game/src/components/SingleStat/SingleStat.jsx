import React from 'react';
import statStyle from './SingleStat.module.scss';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ComponentWithClass from '../HOC/HOC';

function SingleStat(props) {
    const {name, value, className} = props;
    
    return(
        <div className={statStyle.statWrapper}>
            <div className={statStyle.statWrapper__name}>{name}:</div>
            <ProgressBar min='0' max='100' now={value} label={`${value}%`} className={statStyle.statWrapper__progressBar + ' ' + className}/>
        </div>
    );
}

export default ComponentWithClass(SingleStat);
