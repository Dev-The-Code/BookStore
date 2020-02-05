import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login-component';
import {connect} from "react-redux";

class Google extends Component {
    constructor (props, context) {
        super(props, context);
        this.state= {
            once : true
        }
    }

    responseGoogle = (googleUser) =>{
        var id_token = googleUser.getAuthResponse();
        var googleId = googleUser.getId();

        //anything else you want to do(save to localStorage)...
        const { dispatch, inRup } = this.props;
        let data = {
            id: googleUser.w3.Eea,
            name: googleUser.w3.ig,
            email: googleUser.w3.U3
        }
        data = {...data, ...{route: inRup}}
        dispatch({type: 'FACEBOOKSIGNUP', data})
    }

    render(){
        return(
            <div>
                <GoogleLogin socialId="873832275515-3oclgfb5n1ie7inhfa16a6uu7crbab2a.apps.googleusercontent.com"
                             
                             scope="profile"
                             fetchBasicProfile={true}
                             responseHandler={this.responseGoogle}
                             className = "loginBtn loginBtn--google"
                             buttonText="Signup With Google"/>
            </div>
        )
    }
}

export default connect()(Google);



