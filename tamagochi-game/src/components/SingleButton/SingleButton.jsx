import React, { useReducer, useState } from 'react';
import singleButtonStyles from './SingleButton.module.scss';
import { petStat } from '../../store/state';
import reducer from '../../store/reducer';

function SingleButton(props) {

    let {name, options} = props;
    const [dropdownClass, setDropdownClass] = useState(false);
    const [state, dispatch] = useReducer(reducer, petStat);

    function handleOpenDropdown() {
        setDropdownClass(prevState => !prevState);
    }

    function handleAction(array) {
        for (const action of array) {
            dispatch({
                type: 'set-property',
                payload: {
                    property: action[0],
                    value: action[1]
                }
            });
        }
        // console.log(state);
    }

    function renderDropownList() {
        let buttonsList = [];
        for (const option in options) {
            let values_array = Object.entries(options[option]);
            buttonsList.push(
                <li key={option}>
                    <button onClick={() => handleAction(values_array)}>
                        {option}
                    </button>
                </li>
            )
        }
        return buttonsList;
    }

    return(
        <div className={singleButtonStyles.buttonWrapper}>
            <button onClick={handleOpenDropdown}>{name}</button>
            <ul className={dropdownClass ? singleButtonStyles.actionsList : singleButtonStyles.none}>
                {renderDropownList()}
            </ul>
        </div>
    );
}

export default SingleButton;