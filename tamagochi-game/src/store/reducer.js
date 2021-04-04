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
        default: return state;
    }
}

export default reducer;