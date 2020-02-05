import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Form, Input, Icon, Checkbox, Modal, Spin } from 'antd';
import Dropdowns from './dropdown';
import Facebook from '../Facebook';
import Google from '../Google';
import AsyncStorage from "@callstack/async-storage";
import { HttpUtils } from "../../Services/HttpUtils";
import { connect } from "react-redux";

const FormItem = Form.Item;

class Signin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            visible: false,
            secModal: false,
            passwordValidator: false,
            username: null,
            confirmDirty: false,
            loader: false,
            dropdown: false,
            allUser: [],
            msg: '',
            email2: '',
            route: 'signUp',
            obj: [],
            termCondition: false
        }
    }

    componentDidMount() {
        this.handleLocalStorage();
        this.getSignData();
    }

    componentDidUpdate(prevProps, prevState) {
        const { data } = this.props;
        const { route, obj } = this.state;
        let arr = obj && obj.map((elem) => elem.password)
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
                    }
                    else {
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

    componentWillUnmount() {
        this.setState({ _isMount: false })
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

    async funcLogin(values) {
        let response = await HttpUtils.get('usersignin?useremail=' + values.userName + '&password=' + values.password)
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

    async getProfile(data) {
        let _id = data.profileId ? data.profileId : '';
        let req = await HttpUtils.get('getprofile?profileId=' + _id);
        let allData = { ...data, ...{ userImage: req ? req.content.imageurl : '' } }
        return allData;
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    }

    handleBlur = () => {
        this.setState({ validating: true });
    }

    handleCancel = () => {
        this.setState({ visible: false, secModal: false });
    }
    renderPasswordConfirmError = (e) => {
        this.setState({
            passwordValidator: true
        })
    }

    /*===============form signup coding====================================*/
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
    onChange = (e) => {
        this.setState({
            termCondition: e.target.checked
        })

    }
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({
                    loader: true
                })
                this.funcSignUp(values)
                console.log(values, 'values')
            }
        });
    }//end handleSubmit

    async funcSignUp(values) {
        let response = await HttpUtils.get('userregister?nickname=' + values.nickname + '&email=' + values.email + '&password=' + values.password + '&notrobot=' + values.notrobot)
        if (response) {
            this.getProfileId(response, values)
        } else {
            this.setState({ msg: 'network error' })
        }
    }

    async getProfileId(response, values) {
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
                    this.props.modalContent();
                    this.props.form.resetFields();
                    this.setState({
                        loader: false,
                        visible: false,
                        secModal: false,
                        dropdown: true
                    })
                })
        }//end if
        else {
            if (response.err._message == 'User validation failed') {
                this.funcLogin({ userName: values.email, password: values.password })
            }
            // this.setState({
            let msg = response.msg ? response.msg : response.err._message
            // })
        }
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
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

    checkEmail(rule, value, callback) {
        if (this.state.allUser.includes(value)) {
            callback('This email is already been used')
            return;
        } else {
            this.setState({ email2: value })
            callback()
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

    checkName = (rule, value, callback) => {
        if (value !== undefined && (value.includes('<') || value.includes('>') || value.includes('/'))) {
            callback('Name should be string')
            return;
        } else if (value !== undefined && value.length == 0) {
            callback('Please input your Name!')
        }
        else {
            callback();
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

    render() {
        const { getFieldDecorator } = this.props.form;
        const { data } = this.props;
        const { visible, secModal, email2, dropdown, termCondition } = this.state;
        const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

        return (
            <div className="">
                <span>
                    {dropdown ? <span style={{}}><Dropdowns style={{ paddingLeft: '10px' }} modalContent={this.props.modalContent} /></span> : <span onClick={this.showModal} className="signuphover">Sign Up</span>}
                    <Modal
                        visible={visible}
                        title="Sign Up"
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        {!!this.state.msg && <div style={{ marginBottom: '10px' }}>
                            <span style={{ color: 'red', fontWeight: 'bold' }}>{this.state.msg}</span>
                        </div>}
                        {!secModal && Object.keys(data).length == 0 && <div className="row">
                            <div className="col-md-5">
                                <Facebook inRup={'signUp'} />
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-5">
                                <Google inRup={'signUp'} />
                            </div>
                        </div>}
                        <br />
                        {!secModal && <div className="">
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem label="Name">
                                    {getFieldDecorator('nickname', {
                                        rules: [{
                                            required: true, message: 'Please input your Name!', whitespace: true
                                        }, {
                                            validator: this.checkName
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
                                <Checkbox onChange={this.onChange}>
                                    (By clicking register, you agree to our
                                  <Link to={`/privacypolicy`} target="blank">privacy policy</Link>,
                                  our <Link to="/termofservice" target="blank">term of service</Link>
                                    and cookies use)
                                </Checkbox>
                                <div className="row center_global">
                                    {this.state.loader ? antIcon : null} <button className="btn color_button" disabled={!termCondition}>Sign up</button>
                                </div>{/*row*/}
                                <div className="row term_condition">
                                    {/*<p>(By clicking register, you agree to our <Link to={`/privacypolicy`} target="blank">terms & condition</Link>, our <Link to="/termofservice" target="blank">term of service</Link> and cookies use)</p>*/}
                                </div>

                            </Form>
                        </div>}
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
                                <button className="btn color_button" disabled={!email2} onClick={this.socialSignUp.bind(this)}><Spin indicator={antIcon} />Sign up</button>
                            </Form>
                        </div>}
                    </Modal>
                </span>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        data: state.data
    })
}

const WrappedRegistrationForm = Form.create()(Signin);
export default connect(mapStateToProps)(WrappedRegistrationForm);
