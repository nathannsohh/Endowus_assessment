import React, {Component} from 'react';
import ReactLoading from "react-loading";

class Loading extends Component {
    render(){
        return(
            <ReactLoading type="spinningBubbles" color="#0000FF" height={200} width={100} />        
        )
    }
}

export default Loading;