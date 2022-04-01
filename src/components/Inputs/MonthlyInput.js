import React, { Component, createRef} from "react";
import './Input.css'

class MonthlyInput extends Component {

    onChange = (event) => {
        this.props.callBack(event.target.value)
        event.preventDefault();
        console.log(event.target.value);
    }

    render(){
        return (
            <div className="input-div">
                <label for="monthly" className="label-text"> Monthly Investment:</label>
                <br></br>
                <input className="input-box" onChange={this.onChange} name="monthly" type="number"/>
                <br/>
                <text>Recommended: <text style={{color: "#367af6", fontWeight: "bold"}}>$1,140</text></text>
            </div>
        )
    }
}

export default MonthlyInput;
