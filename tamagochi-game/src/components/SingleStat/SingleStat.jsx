import React, { useEffect, useReducer, useState } from 'react';
import statStyle from './SingleStat.module.scss';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { petStat } from '../../store/state';
import reducer from '../../store/reducer';

function SingleStat(props) {
    const {name, value} = props;
    
    return(
        <div className={statStyle.statWrapper}>
            <div className={statStyle.statWrapper__name}>{name}:</div>
            <ProgressBar min='0' max='100' now={value} label={`${value}%`} className={`${statStyle.statWrapper__progressBar} ${'damn'}`}/>
        </div>
    );
}

export default SingleStat;
