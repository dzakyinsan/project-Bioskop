import React, { Component } from 'react';
import {connect} from 'react-redux';

class Belitiket extends Component {
    state = {  }
    render() { 
        if(this.props.location.state&&this.props.AuthLog){
         return(
             <div>
                 belli tiket
             </div>
         )   
        }
        return (
            <div>
                404 not found
            </div>
          );
    }
}

const MapStateToProps = state => {
    return {
      AuthLog: state.Auth.login
    };
  };
 
export default connect(MapStateToProps) (Belitiket);