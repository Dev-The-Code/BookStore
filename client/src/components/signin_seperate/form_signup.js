import React, { Component } from 'react';
import { Form, Input, Icon, Checkbox } from 'antd';
import AsyncStorage from "@callstack/async-storage";
import { HttpUtils } from "../../Services/HttpUtils";
import { withRouter, Redirect, } from 'react-router-dom';

const FormItem = Form.Item;

class Form_signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            passwordValidator: false,
            username: null,
            confirmDirty: false,
            loader: false,
            dropdown: false,
            allUser: [],
            msg: '',
            redirectToReferrer: false
        }
    }

    componentDidMount() {
        this.handleLocalStorage();
        this.getAllUsers();
    }

    async getAllUsers() {
        let response = await HttpUtils.get('allusers')
        this.setState({ allUser: response.content })
    }

    handleLocalStorage = () => {
        AsyncStorage.getItem('user')
            .then((obj) => {
                let userObj = JSON.parse(obj)
                if (!!userObj) {
                    this.setState({
                        dropdown: true,
                    })
                }
                else {
                    this.setState({
                        dropdown: false
                    })
                }
            })
    }//end handleLocalStorage function

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            loader: true
        })
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.funcSignUp(values)
            }
        });
    }//end handleSubmit

    async funcSignUp(values) {
        let response = await HttpUtils.get('userregister?nickname=' + values.nickname + '&email=' + values.email + '&password=' + values.password + '&notrobot=' + values.notrobot)
        this.getProfileId(response)
    }

    async getProfileId(response) {
        if (response.code === 200) {
            let obj = {
                name: response.name,
                email: response.email,
                userId: response._id,
                profileId: ''
            }
            let req = await HttpUtils.post('profile', obj)
            let userInfo = { ...response, ...{ profileId: req.content } }
            AsyncStorage.setItem('user', JSON.stringify(userInfo))
                .then(() => {
                    this.props.form.resetFields();
                    this.setState({
                        loader: false,
                        redirectToReferrer: true
                    })
                })
        }//end if
        else {
            this.setState({
                msg: response.data.msg,
            })
        }
    }

    checkValue(rule, value, callback) {
        if (this.state.allUser.includes(value)) {
            callback('This email is already been used')
            return;
        } else {
            callback()
        }
    }

    checkName(rule, value, callback) {
        if (value.includes('<') || value.includes('>') || value.includes('/')) {
            callback('Name should be string')
            return;
        } else {
            callback()
        }
    }

    render() {
        const { to } = this.props;
        const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
        const { getFieldDecorator } = this.props.form;
        const { from } = this.props.location.state ? this.props.location.state : to ? to : { from: { pathname: "/" } };
        let { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label="Name">
                        {getFieldDecorator('nickname', {
                            rules: [{
                                required: true, message: 'Please input your Name!', whitespace: true
                            }, {
                                validator: this.checkName.bind(this)
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="E-mail">
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: 'The input is not valid E-mail!',
                            }, {
                                required: true, message: 'Please input your E-mail!',
                            }, {
                                validator: this.checkValue.bind(this)
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="Password">
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: 'Please input your password!',
                            }, {
                                validator: this.validateToNextPassword,
                            }],
                        })(
                            <Input type="password" />
                        )}
                    </FormItem>
                    <FormItem label="Confirm Password" >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: 'Please confirm your password!',
                            }, {
                                validator: this.compareToFirstPassword,
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur} />
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        {getFieldDecorator('notrobot', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox>I'm not a Robot</Checkbox>
                        )}
                    </FormItem>
                    {this.state.msg.length > 0 && <div style={{ marginBottom: '5px' }}>
                        <span style={{ color: 'red', fontWeight: 'bold' }}>{this.state.msg}</span>
                    </div>}
                    <div style={{ marginTop: '5px' }} className="row center_global">
                        {this.state.loader ? antIcon : null} <button className="btn color_button">Sign up</button>
                    </div>{/*row*/}
                    <div className="row term_condition">
                        <p>(By clicking register, you agree to our <a>terms</a>, our <a>data policy</a> and cookies use)</p>
                    </div>
                </Form>
            </div>
        )
    }

}

const WrappedRegistrationForm = Form.create()(Form_signup);
export default withRouter(WrappedRegistrationForm);
