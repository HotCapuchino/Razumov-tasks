import React, { useReducer } from 'react';
import { petStat } from '../../store/state';
import reducer from '../../store/reducer';
import SingleButton from '../SingleButton/SingleButton';
import buttonsBlockStyle from './ButtonsBlock.module.scss';

function ButtonsBlock() {

    const [state, dispatch] = useReducer(reducer, petStat);

    function renderButtons() {
        let buttonsNames = [];
        for (const key in state) {
            buttonsNames.push(key);
        }
        return buttonsNames.map(elem => {
            return <SingleButton key={elem} name={state[elem]['action']} options={state[elem]['options']} />
        });
    }

    return (
        <div className={buttonsBlockStyle.generalWrapper}>
            {renderButtons()}
        </div>
    );
}


export default ButtonsBlock;