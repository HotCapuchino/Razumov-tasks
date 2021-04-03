import React, { Component } from 'react';
import { PetContext, petStat } from '../../store/state';
import SingleButton from '../SingleButton/SingleButton';
import buttonsBlockStyle from './ButtonsBlock.module.scss';

export class ButtonsBlock extends Component {

    constructor(props) {
        super(props);
        this.renderButtons.bind(this);
    }

    renderButtons() {
        let buttonsNames = [];
        let buttonFunctions = {};
        for (const stat in petStat) {
            if (typeof petStat[stat] === 'function') {
                buttonFunctions[stat] = petStat[stat].bind(petStat);
            } else {
                buttonsNames.push(stat);
            }
        }
        return buttonsNames.map((elem, index) => {
            let button_options = {
                options: petStat[elem]['options'],
                buttonFunctions: buttonFunctions
            }
            return(
                <PetContext.Provider key={index} value={button_options}>
                    <SingleButton name={petStat[elem]['action']}/>
                </PetContext.Provider>
            );
        });
    }

    render() {
        console.log('i has been just rerendered!');
        return (
            <div className={buttonsBlockStyle.generalWrapper}>
                {this.renderButtons()}
            </div>
        )
    }
}

export default ButtonsBlock;