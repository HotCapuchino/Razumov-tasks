import React from 'react';
import { PetContext } from '../../store/state';
import generalStyles  from '../../styles/common/general.scss';

const ComponentWithContext = (Component) => {
    return (props) => {
        let class_name = null;
        if (props.name) {
            switch(props.name) {
                case 'health': class_name = generalStyles.red;
                break;
                case 'thirst': class_name = generalStyles.blue;
                break;
                case 'hunger': class_name = generalStyles.gold;
                break;
                case 'exhaustion': class_name = generalStyles.grey;
                break;
                default: break;
            }
        }
        return (
            <PetContext.Consumer>
                {value => <Component {...props} value={value} className={class_name} />}
            </PetContext.Consumer>
        );
    };
}

export default ComponentWithContext;