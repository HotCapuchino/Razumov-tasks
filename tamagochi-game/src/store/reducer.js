const reducer = (state, action) => {
    switch(action.type) {
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
            for (const stat in newState) {
                if (stat === 'health') {
                    newState[stat]['level'] -= 1;
                } else {
                    newState[stat]['level'] += 2;
                }
            }
            return newState;
        }
        default: return state;
    }
}

export default reducer;