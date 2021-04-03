import React, { Component } from 'react';
import statStyle from './SingleStat.module.scss';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ComponentWithContext from '../HOC/HOC';

class SingleStat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            stat: props.value,
            className: props.className
        };
    }

    render() {
        console.log('single stat has been just rerendered!');
        return (
            <div className={statStyle.statWrapper}>
                <div className={statStyle.statWrapper__name}>{this.state.name}:</div>
                <ProgressBar min='0' max='100' now={this.state.stat} label={`${this.state.stat}%`} 
                    className={`${statStyle.statWrapper__progressBar} ${this.state.className}`}/>
            </div>
        )
    }
}

export default ComponentWithContext(SingleStat);
