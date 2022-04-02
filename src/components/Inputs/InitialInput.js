import React , { Component } from "react";
import './Input.css';

class InitialInput extends Component {

    onChange = (event) => {
        this.props.callBack(event.target.value)
        event.preventDefault();
        console.log(event.target.value);
    }

    render() {
        return (
            <div className='input-div'>
                <label for="initial" className="label-text"> Initial Investment:</label>
                <br></br>
                <input className='input-box' onChange={this.onChange} name="initial"  placeholder="$0" />
            </div>
        )
    }
}

export default InitialInput; 