import React, { useReducer, useEffect } from 'react';
import { petStat } from '../../store/state';
import reducer from '../../store/reducer';
import SingleStat from '../SingleStat/SingleStat';
import statsBlockStyles from './StatsBlock.module.scss';

function StatsBlock() {
    
    const [state, dispatch] = useReducer(reducer, petStat);
    useEffect(() => {
        let intervalID = setInterval(() => {
            // console.log('inside stats block: ', state.health.level);
        }, 5000);
        return () => {
            clearInterval(intervalID);
        }
    }, [])

    function renderStats() {
        let stats = [];
        for (const key in state) {
            if (key === 'coefficient') continue;
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

