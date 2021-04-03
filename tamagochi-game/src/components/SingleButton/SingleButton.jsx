import React, { Component } from 'react';
import ComponentWithContext from '../HOC/HOC';
import singleButtonStyles from './SingleButton.module.scss';

class SingleButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            dropdownOptions: props.value.options,
            buttonFunctions: props.value.buttonFunctions,
            className: props.className,
            dropdownMenuClass: false
        }
        this.renderDropownList.bind(this);
        this.handleAction.bind(this)
    }

    handleAction(array) {
        for (let i = 0; i < array.length; i++) {
            this.state.buttonFunctions.setProperty(array[i][0], array[i][1]);
        }
    }

    renderDropownList() {
        let buttonsList = [];
        for (const action in this.state.dropdownOptions) {
            let values_array = Object.entries(this.state.dropdownOptions[action]);
            buttonsList.push(
                <li key={action}>
                    <button onClick={() => this.handleAction(values_array)}>
                        {action}
                    </button>
                </li>
            );
        }
        return buttonsList;
    }

    handleOpenDropdown() {
        this.setState(prevState => {
            return {
                ...prevState, 
                dropdownMenuClass: !this.state.dropdownMenuClass,
            }
        })
    }

    render() {
        return (
            <div className={singleButtonStyles.buttonWrapper}>
                <button className={this.state.className} onClick={this.handleOpenDropdown.bind(this)}>{this.state.name}</button>
                <ul className={this.state.dropdownMenuClass ? singleButtonStyles.actionsList : singleButtonStyles.none}>
                    {this.renderDropownList()}
                </ul>
            </div>
        )
    }
}

export default ComponentWithContext(SingleButton);