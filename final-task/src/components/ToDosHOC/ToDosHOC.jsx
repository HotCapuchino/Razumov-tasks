import React from 'react';

const ToDosHOC = (Component) => {
    return (props) => {
        let className = null;
        if (props.listType) {
            className = props.listType;
        }

        function handleOptionsButton() {
            console.log('options');
        }

        function handleInactiveState() {
            console.log('state');
        }
        return (<Component {...props} class_name={className} 
                optionsButton={handleOptionsButton}
                inactiveState={handleInactiveState}/>);   
    }
}

export default ToDosHOC;
