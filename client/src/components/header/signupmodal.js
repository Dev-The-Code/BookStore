import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Modal, Spin } from 'antd';
import Signin from './signinmodal';
import Forgotpassword from '../forgotpassword';
import Facebook from '../Facebook';
import Google from '../Google';
import AsyncStorage from '@callstack/async-storage';
import { HttpUtils } from "../../Services/HttpUtils";
import { connect } from "react-redux";

const FormItem = Form.Item;

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            secModal: false,
            Spin: true,
            email: '',
            user: '',
            msg: '',
            route: 'signIn',
            obj: [],
            email2: '',
            allUser: [],
            showloader: false
        }
    }

    componentDidMount() {
        this.handleLocalStorage();
        this.getSignData()
    }

    componentDidUpdate(prevProps, prevState) {
        const { data } = this.props;
        const { route, obj } = this.state;
        let arr = obj.map((elem) => elem.password)
        if (prevProps.data !== data) {
            if (data && data.route === route) {
                if (arr.includes(data.id)) {
                    obj.map((elem) => {
                        if (elem.password === data.id) {
                            this.funcLogin({ userName: elem.email, password: elem.password })
                        }
                    })
                } else {
                    if (data && data.email === undefined) {
                        this.setState({ secModal: true })
                    } else {
                        if (data) {
                            let obj = {
                                nickname: data.name,
                                email: data.email,
                                password: data.id,
                                notrobot: true
                            }
                            this.funcSignUp(obj)
                        }
                    }
                }
            }
        }
    }

    async getSignData() {
        let res = await HttpUtils.get('facebookdata')
        if (res) {
            this.setState({ obj: res.data })
        }
        this.getAllUsers()
    }

    async getAllUsers() {
        let response = await HttpUtils.get('allusers')
        if (response) {
            this.setState({ allUser: response && response.content, _isMount: true })
        }
    }

    async funcSignUp(values) {
        let response = await HttpUtils.get('userregister?nickname=' + values.nickname + '&email=' + values.email + '&password=' + values.password + '&notrobot=' + values.notrobot)
        if (response) {
            this.getProfileId(response)
        } else {
            this.setState({ msg: 'network error' })
        }
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
                        visible: false,
                        secModal: false,
                        dropdown: true
                    }, () => {
                        this.props.modalContent();
                    })
                })
        }//end if
        else {
            this.setState({
                msg: response.msg ? response.msg : response.err._message,
            })
        }
    }

    handleLocalStorage = () => {
        AsyncStorage.getItem('user')
            .then((obj) => {
                let userObj = JSON.parse(obj)
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

    showModal = () => {
        this.setState({
            visible: true,
            // showloader:false
        });
    }

    handleOk = (e) => {
        this.setState({
            email: this.refs.email,
            visible: false,
        });
    }

    handleCancel = (e) => {
        this.setState({ visible: false, secModal: false });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ showloader: true })
                console.log(values , 'values')
                this.funcLogin(values)
            }
        });
    }

    async funcLogin(values) {
        let response = await HttpUtils.get('usersignin?useremail=' + values.userName + '&password=' + values.password)
        if (response) {
            if (response.code === 200) {
                this.getProfile(response)
                    .then((data) => {
                        AsyncStorage.setItem('user', JSON.stringify(data))
                            .then(() => {
                                this.props.modalContent();
                                this.setState({
                                    loader: false,
                                    visible: false,
                                    showloader: false
                                })
                            })
                    })
            }//end if
            else {
                this.setState({
                    msg: response.msg,
                    loader: false,
                    // visible:false,
                    showloader: false
                })
            }
        }
        else {
            this.setState({
                msg: "Create an acount first",
                loader: false,
                // visible:false,
                showloader: false
            })
        }
    }

    async getProfile(data) {
        let _id = data.profileId ? data.profileId : '';
        let req = await HttpUtils.get('getprofile?profileId=' + _id);
        let allData = { ...data, ...{ userImage: req ? req.content.imageurl : '' } }
        return allData;
    }

    checkEmail(rule, value, callback) {
        if (this.state.allUser.includes(value)) {
            callback('This email is already been used')
            return;
        } else {
            this.setState({ email2: value })
            callback()
        }
    }

    socialSignUp() {
        const { email2 } = this.state;
        const { data } = this.props;
        let obj = {
            nickname: data.name,
            email: email2,
            password: data.id,
            notrobot: true
        }
        this.setState({ email2: '' })
        this.funcSignUp(obj)
    }

    reset = () => {
        this.props.form.resetFields()
    }

    render() {
        const { user, secModal, email2, showloader } = this.state;
        const { getFieldDecorator } = this.props.form;
        const antIcon = <Icon type="loading" style={{ fontSize: 24, color: 'black' }} spin />;

        return (
            <div className="paragraph">
                <span onClick={this.showModal} style={{}}>Sign In</span>
                {/*===================modal code start==========================*/}
                <Modal
                    title="LOG IN"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>Return</Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            Submit
                        </Button>,
                    ]}
                >
                    {!secModal && <div className="row">
                        <div className="col-md-5">
                            <Facebook inRup={'signIn'} />
                        </div>
                        <div className="col-md-1"></div>{/*col-md-4*/}
                        <div className="col-md-5">
                            <Google inRup={'signIn'} />
                        </div>
                    </div>}
                    <br />
                    {!secModal && <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </FormItem>
                        <FormItem>
                            <div className="row">
                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    {getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: true,
                                    })(
                                        <Checkbox>Remember me</Checkbox>
                                    )}
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-12 margin_text_align">
                                    <a className="login-form-forgot" onClick={this.handleCancel}><Forgotpassword /></a>
                                </div>
                            </div>
                        </FormItem>
                        {this.state.msg.length > 0 && <div style={{ marginBottom: '10px' }}>
                            <span style={{ color: 'red', fontWeight: 'bold' }}>{this.state.msg}</span>
                        </div>}
                        <div className="row">
                            <div className="col-md-3"></div>
                            {this.state.showloader && <Spin indicator={antIcon} />}
                            <div className="col-md-6">
                                <Button type="primary" htmlType="submit" disabled={this.state.showloader} className="login-form-button width_class">
                                    Log in
                                </Button>
                            </div>
                            <div className="col-md-3"></div>
                        </div>
                        Or <a><span onClick={this.handleCancel}><Signin /></span></a>
                    </Form>}
                    {secModal && <div>
                        <Form>
                            <p>to finish you sign up kindly share your email</p>
                            <FormItem label="E-mail">
                                {getFieldDecorator('email2', {
                                    rules: [{
                                        type: 'email', message: 'The input is not valid E-mail!',
                                    }, {
                                        required: true, message: 'Please input your E-mail!',
                                    }, {
                                        validator: this.checkEmail.bind(this)
                                    }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <button className="btn color_button" disabled={!email2} onClick={this.socialSignUp.bind(this)}>Sign up</button>
                        </Form>
                    </div>}
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        data: state.data
    })
}

const WrappedNormalLoginForm = Form.create()(Signup);
export default connect(mapStateToProps)(WrappedNormalLoginForm);
