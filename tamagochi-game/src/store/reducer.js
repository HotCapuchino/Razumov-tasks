    import { log } from './log';

    const reducer = (state, action) => {
        switch (action.type) {
            case 'set-property': {
                let objectToBeChange = state[action.payload.property];
                objectToBeChange.level += action.payload.value;
                if (objectToBeChange.level > 100) objectToBeChange.level = 100;
                if (objectToBeChange.level < 0) objectToBeChange.level = 0;
                logger({
                    property: String(action.payload.action).toLowerCase(),
                    healthLevel: state.health.level,
                    option: action.payload.option
                });
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
                logger({
                    property: 'time',
                    healthLevel: newState.health.level
                });
                return { ...newState };
            }
            default: return state;
        }
    }


    function logger(action) {
        console.log(action);
        let action_description = '';
        switch (action.property) {
            case 'relax': action_description = `You have done the following activity: ${action.option}`;
                break;
            case 'drink': action_description = `You have drunk ${action.option}`;
                break;
            case 'eat': action_description = `You have eaten ${action.option}`;
                break;
            case 'work': action_description = `You have performed following work: ${action.option}`;
                break;
            case 'time': action_description = `Time passes..`;
                break;
            default: break;
        }
        log.push({
            actionDescription: action_description,
            healthLevel: action.healthLevel,
            className: action.property
        });
    }

    export default reducer;