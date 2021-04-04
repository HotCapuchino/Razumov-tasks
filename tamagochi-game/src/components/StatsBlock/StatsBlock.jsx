import React, { useReducer, useEffect } from 'react';
import { petStat } from '../../store/state';
import reducer from '../../store/reducer';
import SingleStat from '../SingleStat/SingleStat';
import statsBlockStyles from './StatsBlock.module.scss';

function StatsBlock() {
    
    const [state] = useReducer(reducer, petStat);
    useEffect(() => {
        console.log(state);
    }, [state])

    function renderStats() {
        let stats = [];
        for (const key in state) {
            stats.push(<SingleStat key={key} name={key} value={state[key]['level']}/>);
        }
        return stats;
    }
    
    return(
        <div className={statsBlockStyles.generalWrapper}>
            {renderStats()}
        </div>
    ); 
}

export default StatsBlock;

