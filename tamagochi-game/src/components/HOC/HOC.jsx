import React from 'react';
import generalStyles  from '../../styles/common/general.scss';

const ComponentWithClass = (Component) => {
    return (props) => {
        let class_name = null;
        if (props.name) {
            switch(props.name) {
                case 'health':
                case 'relax': class_name = 'red';
                break;
                case 'thirst':
                case 'drink': class_name = 'blue';
                break;
                case 'hunger': 
                case 'eat': class_name = 'gold';
                break;
                case 'exhaustion':
                case 'work': class_name = 'grey';
                break;
                default: break;
            }
        }
        // console.log(class_name);
        return (<Component {...props} className={class_name} />);
    };
}

export default ComponentWithClass;