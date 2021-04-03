import React, { Component } from 'react';
import { PetContext, petStat } from '../../store/state';
import SingleStat from '../SingleStat/SingleStat';
import statsBlockStyles from './StatsBlock.module.scss';


export class StatsBlock extends Component {

    constructor(props) {
        super(props);
        this.renderStats.bind(this);
        console.log(petStat.hunger);
    }

    renderStats() {
        let statsBlocks = [];
        for (const stat in petStat) {
            if (typeof petStat[stat] === 'function') continue;
            statsBlocks.push(
                <PetContext.Provider key={stat} value={petStat[stat]['level']}>
                    <SingleStat name={stat}/>
                </PetContext.Provider>
            );
        }
        return statsBlocks;
    }

    render() {
        return (
            <div className={statsBlockStyles.generalWrapper}>
                {this.renderStats()}
            </div>
        )
    }
}

export default StatsBlock;

