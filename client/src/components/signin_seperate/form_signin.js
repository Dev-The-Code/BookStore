import React, { Component } from 'react';
import { Form, Input } from 'antd';
import AsyncStorage from "@callstack/async-storage";
import { withRouter, Redirect, } from 'react-router-dom';
import { HttpUtils } from "../../Services/HttpUtils";

const FormItem = Form.Item;
// const ip = require('ip');

class Form_signin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            showloader: false,
            email: '',
            user: '',
            msg: '',
            redirectToReferrer: false
        }
    }

    componentDidMount() {
        this.handleLocalStorage();
    }

    handleLocalStorage() {
        AsyncStorage.getItem('user')
            .then((obj) => {
                var userObj = JSON.parse(obj)
                if (!!userObj) {
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

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.funcLogin(values)
                console.log(values, 'values')
            }
        });
    }

    async funcLogin(values) {
        var response = await HttpUtils.get('usersignin?useremail=' + values.email + '&password=' + values.password)
        console.log(response, 'response')
        if (response.code === 200) {
            AsyncStorage.setItem('user', JSON.stringify(response))
                .then(() => {
                    this.setState({
                        loader: false,
                        visible: false,
                        showloader: false,
                        redirectToReferrer: true
                    })
                })
        }//end if
        else {
            this.setState({
                msg: response.msg,
            })
        }
    }

    reset() {
        this.props.form.resetFields()
    }

    render() {
        const { to } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { from } = this.props.location.state ? this.props.location.state : to ? to : { from: { pathname: "/" } };
        let { redirectToReferrer } = this.state;
        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }

        return (
            <div>
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem label="E-mail">
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Please input your Email!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="Password">
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: 'Please input your password!',
                                }],
                            })(
                                <Input type="password" />
                            )}
                        </FormItem>
                        {this.state.msg.length > 0 && <div style={{ marginBottom: '10px' }}>
                            <span style={{ color: 'red', fontWeight: 'bold' }}>{this.state.msg}</span>
                        </div>}
                        <div style={{ marginTop: '10px' }} className="row center_global signup_button_signin_seperate">
                            <button className="btn color_button">Login</button>
                        </div>{/*row*/}
                    </Form>
                </div>
            </div>
        )
    }
}

const WrappedSigninForm = Form.create()(Form_signin);
export default withRouter(WrappedSigninForm);
