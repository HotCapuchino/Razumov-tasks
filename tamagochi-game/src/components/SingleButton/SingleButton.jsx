import React, { useReducer, useState } from 'react';
import singleButtonStyles from './SingleButton.module.scss';
import { petStat } from '../../store/state';
import reducer from '../../store/reducer';
import ComponentWithClass from '../HOC/HOC';

function SingleButton(props) {
    const {name, options, className} = props;
    const [dropdownClass, setDropdownClass] = useState(false);
    const [_, dispatch] = useReducer(reducer, petStat);

    function handleOpenDropdown() {
        setDropdownClass(prevState => !prevState);
    }

    function handleAction(array, option) {;
        for (const action of array) {
            dispatch({
                type: 'set-property',
                payload: {
                    property: action[0],
                    value: action[1],
                    action: name,
                    option: option
                }
            });
        }
    }

    function renderDropownList() {
        let buttonsList = [];
        for (const option in options) {
            let values_array = Object.entries(options[option]);
            buttonsList.push(
                <li key={option}>
                    <button className={singleButtonStyles.actionsList__listButton + ' ' + className} onClick={() => handleAction(values_array, option)}>
                        {option}
                    </button>
                </li>
            )
        }
        return buttonsList;
    }

    return(
        <div className={singleButtonStyles.buttonWrapper}>
            <button className={singleButtonStyles.dropdownButton + ' ' + className} onClick={handleOpenDropdown}>{name}</button>
            <ul className={dropdownClass ? singleButtonStyles.actionsList : singleButtonStyles.none}>
                {renderDropownList()}
            </ul>
        </div>
    );
}

export default ComponentWithClass(SingleButton);