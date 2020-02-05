import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import {connect} from "react-redux";

class Facebook extends Component {
    state={
        isloggedIn:false,
        userId:'',
        name:'',
        email:'',
        picture:'',
        clicked: false
    }

    responseFacebook = response =>{
        const { clicked } = this.state;
        const { dispatch, inRup } = this.props;
        if(clicked && response && response.id && response.id.length > 0) {
            let data = response
            // let data = {
            // 	accessToken: 'sdjhfalskjfhajhflakjflkahfja',
            //     email: 'zab@brother.com',
            //     expiresIn: '7500',
            //     id: '9182733645908',
            //     name: 'brother2',
            //     picture: 'skdjfkals',
            //     userId: '10293847596'
            // }
            data = {...data, ...{route: inRup}}
            dispatch({type: 'FACEBOOKSIGNUP', data})
        }
    }

    componentClicked = () =>{
        this.setState({clicked: true})
    }

    render(){
        let fbContent;
        let data = 'abc'
        if(this.state.isloggedIn){
            fbContent = null;
        }else{
            fbContent = (<FacebookLogin
                appId="644559659253564"
                autoLoad={false}
                fields="name,email,picture"
                onClick={this.componentClicked}
                // onClickedUser={this.faceBookButtonClicked}
                callback={this.responseFacebook}
                scope="email"
                cssClass="loginBtn loginBtn--facebook"
                textButton="Signup with Facebook"
            />)
        }
        return(
            <div data={data}>
                {fbContent}
            </div>
        )
    }
}

export default connect()(Facebook);