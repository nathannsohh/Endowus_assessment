import React, { Component } from 'react';
import './Button.css';

class Button extends Component {

    render() {
        return (
            <div className='button-div'>
                <button
                    className='button-10'
                    onClick={this.props.onClick}
                    >
                    Plan my projection
                </button>
            </div>
        )
    }
}

export default Button;