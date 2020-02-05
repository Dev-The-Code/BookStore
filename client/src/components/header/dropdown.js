import React, { Component } from 'react';
import { Menu, Dropdown, Icon, message } from 'antd';
import AsyncStorage from '@callstack/async-storage';
import { Redirect } from 'react-router';

class Dropdowns extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toDashboard: false,
            logout: false,
            profileId: ''
        }
    }

    componentWillMount() {
        let userObj = JSON.parse(localStorage.getItem('user'))
        if (userObj) {
            this.setState({
                profileId: userObj.profileId
            })
        }
    }
    handleChangeLogout = () => {
        AsyncStorage.removeItem('user')
            .then(() => {
                this.props.modalContent();
                this.setState({
                    logout: true
                })
            })
    }

    profilePage = () => {
        this.setState({ toDashboard: true })
    }

    render() {
        const { profileId } = this.state;
        if (this.state.toDashboard === true) {
            return <Redirect
                to={{ pathname: `/profile_user/${profileId}` }} />
        }

        if (this.state.logout === true) {
            return <Redirect to='/' />
        }

        const onClick = function ({ key }) {
            let msg = '';
            if (key == 1) {
                msg = 'Profile'
            } else if (key == 2) {
                msg = 'Settings'
            } else {
                msg = "User Logout"
            }
            message.info(msg);
        };

        const menu = (
            <Menu onClick={onClick} style={{ color: 'black' }}>
                <Menu.Item key="1" onClick={this.profilePage}>My Profile</Menu.Item>
                <Menu.Item key="2">Settings</Menu.Item>
                <Menu.Item key="3" onClick={this.handleChangeLogout}>Logout</Menu.Item>
            </Menu>
        );

        return (
            <Dropdown overlay={menu} style={{ color: 'black', marginTop: '-23px' }}>
                <a className="ant-dropdown-link">
                    {localStorage.getItem('name')}<Icon type="down" />
                </a>
            </Dropdown>
        )
    }
}

export default Dropdowns;
