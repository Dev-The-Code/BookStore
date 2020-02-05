import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {HttpUtils} from "../../Services/HttpUtils";
import { Redirect } from 'react-router';
import { Input, Form } from 'antd';

const FormItem = Form.Item;

const loading = {
  margin: '1em',
  fontSize: '24px',
};

const title = {
  pageTitle: 'Password Reset Screen',
};

class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            updated: false,
            isLoading: true,
            error: false,
            msg: '',
            goHome: false
        };
    }

    async componentDidMount() {
        let response = await HttpUtils.get('reset?resetPasswordToken=' + this.props.match.params.token);
        if(response.code == 403 || response.code == 404){
            this.setState({
                isLoading: false,
                error: true,
                msg: response.message
            });
        }else if(response.code == 200){
            this.setState({
                isLoading: false,
                error: false,
                msg: response.message,
                email: response.email
            });
        }
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    updatePassword = (e) => {
        e.preventDefault();
        const { email } = this.state;
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if(!err){
                let obj = {
                    email,
                    password: values.confirm
                },
                response = await HttpUtils.post('resetpassword', obj);
                if(response.code == 200){
                    this.setState({ updated: true });
                }
            }
        });
    };

    goToHome = e => {
        this.setState({ goHome: true })
    }

    render() {
        const { password, error, isLoading, updated, msg, email, goHome } = this.state,
        {getFieldDecorator} = this.props.form;

        if(goHome){
            return <Redirect to={`/`}/>
        }

        return (
            <div className="row">
                <div className='col-md-12' style={{textAlign: 'center'}}>
                    <img src='../images/pakjazba_new.png' alt='' />
                </div>
                <div className='col-md-3'></div>
                <div className='col-md-6' style={{border: '1px solid black', padding: '10px'}}>
                    <h4 style={{textAlign: 'center', fontWeight: 'bold'}}>{title.pageTitle}</h4>
                    {(error || isLoading) && <div style={loading}>
                        {error && <h4>{msg} <a onClick={this.goToHome}>Go Home.</a></h4>}
                        {isLoading && <div style={loading}>Loading User Data...</div>}
                    </div>}
                    {!error && !isLoading && <form className="password-form" onSubmit={this.updatePassword}>
                        <div className="form-group">
                            <label htmlFor="newPassword" className="col-form-label">
                                New Password
                            </label>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input your New Password!',
                                    }, {
                                        validator: this.validateToNextPassword,
                                    }],
                                })(
                                    <Input name="newPassword" type="password"
                                        className="form-control" id="newPassword"
                                        placeholder="New Password"
                                    />
                                )}
                            </FormItem>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="col-form-label">
                                Confirm Password
                            </label>
                            <FormItem>
                                {getFieldDecorator('confirm', {
                                    rules: [{
                                        required: true,
                                        message: 'Please input your Confirm Password!',
                                    }, {
                                        validator: this.compareToFirstPassword,
                                    }],
                                })(
                                    <Input name="confirmPassword" type="password"
                                        className="form-control" id="confirmPassword"
                                        placeholder="Confirm Password"
                                    />
                                )}
                            </FormItem>
                        </div>
                        <br/>
                        <button
                            className="btn color_button"
                            style={{float: 'right'}}
                            onClick={this.updatePassword}
                        >
                            Reset Password
                        </button>
                    </form>}

                    {updated && (
                        <div>
                            <p>
                              Your password has been successfully reset, please try <a onClick={this.goToHome}>logging in</a>
                              again.
                            </p>
                        </div>
                    )}
                </div>
                <div className='col-md-3'></div>
            </div>
        );
    }
}

ResetPassword.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }),
  }),
};

const WrappedResetPassword = Form.create()(ResetPassword);
export default WrappedResetPassword;
