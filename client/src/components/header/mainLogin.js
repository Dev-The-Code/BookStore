import React, { Component } from 'react';
import Signin from './signinmodal';
import Signup from './signupmodal';
import AsyncStorage from '@callstack/async-storage';
import { isMobile } from 'react-device-detect';

export default class MainLogin extends Component{
    constructor(props){
        super(props)
        this.state = {
            user: ''
        }
    }

    componentDidMount(){
        this.handleLocalStorage();
    }

    handleLocalStorage = () => {
        AsyncStorage.getItem('user')
            .then((obj) => {
                var userObj = JSON.parse(obj)
                if(!!userObj){
                    this.setState({
                        user: userObj.name
                    })
                }
                else {
                    this.setState({
                        user: ''
                    })
                }
            }).catch({

        })
    }

    updateMethod(){
        this.handleLocalStorage();
    }

    render(){
        const { user } = this.state;
        return (
            <div>
                {user === '' ?
                    <span className="mainLoginDiv button_globalclass" style={{color: '#ffffffa1'}}><Signup modalContent={this.updateMethod.bind(this)}/>  {  '|'  } <Signin modalContent={this.updateMethod.bind(this)}/></span> :
                    <span className="mainLoginDiv button_globalclass" style={isMobile? {fontSize:'25px', color: '#ffffffa1'} : {fontSize:'19px', color: '#ffffffa1'}}>{user} <Signin modalContent={this.updateMethod.bind(this)}/></span>}
            </div>
        )
    }
}