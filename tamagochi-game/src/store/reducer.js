const reducer = (state, action) => {
    switch (action.type) {
        case 'set-property': {
            let objectToBeChange = state[action.payload.property];
            objectToBeChange.level += action.payload.value;
            if (objectToBeChange.level > 100) objectToBeChange.level = 100;
            if (objectToBeChange.level < 0) objectToBeChange.level = 0;
            return {
                ...state,
                [action.payload.property]: objectToBeChange
            }
        }
        case 'time-passes': {
            let newState = state;
            let state_coeff = 1;
            for (const key in state) {
                if (key === 'coefficient') continue;
                console.log(key, state[key]['level']);
                if (state[key]['level'] === 100) {
                    state_coeff++;
                }
            }
            newState.coefficient = state_coeff;
            for (const stat in newState) {
                if (stat === 'coefficient') continue;   
                if (stat === 'health') {
                    newState[stat]['level'] -= 1 * state_coeff;
                } else {
                    newState[stat]['level'] = newState[stat]['level'] + 2 > 100 ? 100 : newState[stat]['level'] + 2;
                }
            }
            return newState;
        }
        default: return state;
    }
}

export default reducer;