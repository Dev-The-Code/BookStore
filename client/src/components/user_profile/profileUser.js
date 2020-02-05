import React, { Component } from 'react';
import { Icon, Input, Form, Upload, Pagination, Tabs, Button, notification } from 'antd';
import Footer from '../footer/footer.js';
import sha1 from "sha1";
import superagent from "superagent";
import AsyncStorage from "@callstack/async-storage";
import { HttpUtils } from "../../Services/HttpUtils";
import Burgermenu from '../header/burgermenu';
import Headermenu from '../header/headermenu';
import { isMobile, isTablet, isBrowser } from 'react-device-detect';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import { Rate } from 'antd';
import PublicProfile from '../profile/profileMainpage';
import './profileUser.css';
const FormItem = Form.Item;
const { TextArea } = Input;
const TabPane = Tabs.TabPane;


class ProfileUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            profileId: '',
            loading: false,
            imageUrl: '',
            profileSec: true,
            changePass: false,
            name: '',
            email: '',
            phone: '',
            description: '',
            location: '',
            twitter: '',
            facebook: '',
            listing: false,
            listData1: [],
            listData2: [],
            listData3: [],
            listData4: [],
            listData5: [],
            allData: [],
            buySell: false,
            business: false,
            rooms: false,
            jobPortal: false,
            ecommerce: false,
            data: [],
            publicSection: true,
            reviewProfile: true
        };
    }

    componentWillMount() {
        window.scrollTo(0, 0);
        this.handleLocalStorage();
    }

    handleLocalStorage = async () => {
        let userObj = JSON.parse(localStorage.getItem('user'))
        let profileIdFromPath = this.props.location.pathname.slice(14)

        if (userObj != null) {
            if (userObj.profileId == profileIdFromPath) {
                // console.log(profileIdFromPath , 'profileIdFromPath')
                // console.log(userObj , 'userObj')
                this.getprofileData(userObj.profileId, userObj._id)
                this.setState({
                    userId: userObj._id,
                    profileId: userObj.profileId
                })
            }
            else {
                let req = await HttpUtils.get('getprofile?profileId=' + profileIdFromPath)
                await this.getprofileData(profileIdFromPath, req.content.user_id)
                // console.log(req , 'req')
                console.log(req.content.user_id, 'req.content.user_id')

                this.setState({
                    reviewProfile: false,
                    userId: req.content.user_id,
                    profileId: profileIdFromPath
                })
            }
        }
        else {
            let req = await HttpUtils.get('getprofile?profileId=' + profileIdFromPath)
            await this.getprofileData(profileIdFromPath, req.content.user_id)
            console.log(req.content.user_id, 'req.content.user_id')

            this.setState({
                reviewProfile: false,
                userId: req.content.user_id,
                profileId: profileIdFromPath
            })
        }
    }

    async getprofileData(id, userId) {
        // 1st pera is profileid
        // 2nd pera is user id
        console.log(id, 'id')
        console.log(userId, 'userId')

        let req = await HttpUtils.get('getprofile?profileId=' + id)
        let user = req.content;
        this.setState({
            name: user.name,
            email: user.email,
            location: user.location,
            description: user.description,
            desLen: user.description ? 500 - user.description.length : 500,
            phone: user.phone,
            twitter: user.twitterlink,
            facebook: user.facebooklink,
            imageUrl: user.imageurl,
            url: user.imageurl
        })
        this.getAllBusiness(userId)
    }

    async getAllBusiness(id) {
        const { userId } = this.state;
        console.log(id, 'id')
        let arr1 = [];
        let arr2 = [];
        let arr3 = [];
        let arr4 = [];
        let arr5;

        let req = await HttpUtils.get('marketplace')
        console.log(req, 'req')
        req.roomrentsdata && req.roomrentsdata.map((elem) => {
            if (elem.user_id === id) {
                let data = { ...elem, ...{ route: 'rooms' } }
                arr1.push(data)
            }
        })
        req.business && req.business.map((elem) => {
            if (elem.user_id === id) {
                let data = { ...elem, ...{ route: 'business' } }
                arr2.push(data)
            }
        })
        req.busell && req.busell.map((elem) => {
            if (elem.userid === id) {
                let data = { ...elem, ...{ route: 'buySell' } }
                arr3.push(data)
            }
        })
        req.jobPortalData && req.jobPortalData.map((elem) => {
            if (elem.user_id === id) {
                let data = { ...elem, ...{ route: 'jobPortal' } }
                arr4.push(data)
            }
        })
        console.log(arr1, 'arr1')
        // req.ecommerce && req.ecommerce.map((elem) => {
        //     if (elem.user_Id === id) {
        //         let data = { ...elem, ...{ route: 'ecommerce' } }
        //         arr5.push(data)
        //     }
        // })
        const userData = JSON.parse(localStorage.getItem('user'));
        let obj = {
            userId: id
        }
        console.log(userId, 'userId')

        console.log(obj, 'obj')
        let reqShopData = await HttpUtils.post('getShopById', obj)
        console.log()
        if (reqShopData.code == 200) {
            arr5 = reqShopData.content
        }
        this.setState({
            listData1: arr1,
            listData2: arr2,
            listData3: arr3,
            listData4: arr4,
            listData5: arr5
        })
    }

    funcIndexes(page) {
        let to = 6 * page;
        let from = to - 6;
        return { from: page === 1 ? 0 : from, to: page === 1 ? 6 : to }
    }

    onChange = (page) => {
        const { allData } = this.state;
        let indexes = this.funcIndexes(page)
        this.setState({
            current: page,
            listData: allData.slice(indexes.from, indexes.to)
        });
    }

    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    uploadFile = (files) => {
        const image = files.originFileObj
        const cloudName = 'dxk0bmtei'
        const url = 'https://api.cloudinary.com/v1_1/' + cloudName + '/image/upload'
        const timestamp = Date.now() / 1000
        const uploadPreset = 'toh6r3p2'
        const paramsStr = 'timestamp=' + timestamp + '&upload_preset=' + uploadPreset + 'U8W4mHcSxhKNRJ2_nT5Oz36T6BI'
        const signature = sha1(paramsStr)
        const params = {
            'api_key': '878178936665133',
            'timestamp': timestamp,
            'upload_preset': uploadPreset,
            'signature': signature
        }

        return new Promise((res, rej) => {
            let uploadRequest = superagent.post(url)
            uploadRequest.attach('file', image)
            Object.keys(params).forEach((key) => {
                uploadRequest.field(key, params[key])
            })

            uploadRequest.end((err, resp) => {
                err ? rej(err) : res(resp);
            })
        })
    }

    handleChange = (info) => {
        this.uploadFile(info.file).then((result) => {
            this.setState({
                url: result.body.url,
                imageUrl: result.body.url,
                loading: false,
            })
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { url, name, location, description, email, phone, twitter, facebook, changePass, userId, profileId } = this.state;
        if (changePass) {
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    let obj = {
                        userId,
                        currentPassword: values.currentPass,
                        newPassword: values.password,
                        confirmPassword: values.confirm,
                    }
                    this.passwordData(obj)
                }
            })
        } else {
            let obj = {
                profileId,
                userId,
                description,
                email,
                facebook,
                location,
                name,
                phone,
                twitter,
                url
            }
            this.profileData(obj)
        }
    }

    async profileData(obj) {
        let req = await HttpUtils.post('profile', obj)
        this.openNotification()
    }

    async passwordData(obj) {
        let req = await HttpUtils.post('changepassword', obj)
    }

    openNotification() {
        notification.open({
            message: 'Success ',
            description: 'Changes saved.',
        });
    };

    handleProfile() {
        this.setState({
            profileSec: true,
            changePass: false,
            listing: false,
            publicSection: false
        })
    }

    handleListing() {
        this.setState({
            profileSec: false,
            changePass: false,
            listing: true,
            publicSection: false
        })
    }

    handlePassSec() {
        this.setState({
            profileSec: false,
            changePass: true,
            listing: false,
            publicSection: false
        })
    }

    handleProfSec() {
        this.setState({
            profileSec: false,
            changePass: false,
            listing: false,
            publicSection: true
        })
    }

    onChangeValue(e) {
        if (e.target.id === 'name') {
            this.setState({ name: e.target.value })
        } else if (e.target.id === 'location') {
            this.setState({ location: e.target.value })
        } else if (e.target.id === 'description') {
            this.setState({ description: e.target.value, desLen: 500 - e.target.value.length })
        } else if (e.target.id === 'phone') {
            this.setState({ phone: e.target.value })
        } else if (e.target.id === 'email') {
            this.setState({ email: e.target.value })
        } else if (e.target.id === 'twitter') {
            this.setState({ twitter: e.target.value })
        } else if (e.target.id === 'facebook') {
            this.setState({ facebook: e.target.value })
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

    editBusiness = (e) => {
        if (e.route === "buySell") {
            this.setState({
                buySell: true,
                data: e,
            })
        } else if (e.route === "business") {
            this.setState({
                business: true,
                data: e,
            })
        } else if (e.route === "rooms") {
            this.setState({
                rooms: true,
                data: e,
            })
        } else if (e.route === "jobPortal") {
            this.setState({
                jobPortal: true,
                data: e,
            })
        }
        else if (e.route === "ecommerce") {
            this.setState({
                ecommerce: true,
                data: e,
            })
        }
    }

    callPublicSection() {
        this.setState({
            publicSection: false,
            profileSec: true,
        })
    }

    validateNumber(rule, value, callback) {
        if (isNaN(value)) {
            callback('Please type Numbers');
        } else {
            callback()
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { imageUrl, profileSec, changePass, name, email, description, phone, twitter, facebook, location,
            listing, listData1, listData2, listData3, listData4, listData5, buySell, business, rooms, jobPortal,
            ecommerce, data, allData, publicSection, reviewProfile } = this.state;
        console.log(listData4, 'render in profile')
        if (buySell) {
            return (
                <Redirect to={{ pathname: '/postad_buysell', state: data }} />
            )
        } else if (business) {
            return (
                <Redirect to={{ pathname: '/postad_business', state: data }} />
            )
        } else if (rooms) {
            return (
                <Redirect to={{ pathname: '/postad_Roommates', state: data }} />
            )
        } else if (jobPortal) {
            return (
                <Redirect to={{ pathname: '/postad_jobPortal', state: data }} />
            )
        }
        else if (ecommerce) {
            return (
                <Redirect to={{ pathname: `/Forms_Ecommerce`, state: data }} />
            )
        }

        const props = {
            action: '//jsonplaceholder.typicode.com/posts/',
            onChange: this.handleChange,
        };

        let detail = this.props.location.state ? this.props.location.state : '';

        let passObj = {
            arr1: listData1,
            arr2: listData2,
            arr3: listData3,
            arr4: listData4,
            arr5: listData5,
            arr6: { imageUrl, name, description, twitter, facebook, email, phone, reviewProfile },

        }
        const noData = (
            <div style={{ marginTop: '125px' }}>
                <h1>
                    You dont have data to show...
                </h1>
            </div>
        )

        return (
            <div>
                <div className="hidden-xs" style={{ marginTop: '13%' }}></div>
                <div className="content">
                    {publicSection && <div>
                        <PublicProfile callPublicSection={this.callPublicSection.bind(this)} allArr={passObj} />
                    </div>}
                    {!publicSection && <div className="container" style={{ width: "87%" }}>
                        <div className="vissible-xs" style={{ "background": "#d8e7e4", marginTop: "102px", backgroundSize: 'cover' }}>
                            <div className="visible-xs" style={{ marginTop: '-119px' }}></div>
                            <div className="background-image">
                                <Headermenu />
                            </div>
                        </div>
                        <div className="hero" style={isMobile && !isTablet ? { marginTop: "0%" } : { marginTop: "-12%" }}>
                            <div className="row">
                                {/*=======================col-md-3============================*/}
                                <div className="col-md-3">
                                    <nav className="nav flex-column side-nav">
                                        <a className="nav-link active icon border_sidenav"
                                            onClick={this.handleProfile.bind(this)}>
                                            <Icon type="user" /><span className="linktext_margin">My Profile</span>
                                        </a><br /><br />
                                        <a className="nav-link active icon border_sidenav"
                                            onClick={this.handleListing.bind(this)}>
                                            <Icon type="heart" /><span className="linktext_margin">My Ads Listing</span>
                                        </a><br /><br />
                                        <a className="nav-link active icon border_sidenav"
                                            onClick={this.handlePassSec.bind(this)}>
                                            <Icon type="key" /><span className="linktext_margin">Change Password</span>
                                        </a><br /><br />
                                        <a className="nav-link active icon border_sidenav"
                                            onClick={this.handleProfSec.bind(this)}>
                                            <Icon type="profile" /><span className="linktext_margin">View As public profile</span>
                                        </a>
                                    </nav>
                                </div>
                                {/*col-md-3*/}
                                {/*======================col-md-3================================*/}
                                {/*======================col-md-9================================*/}
                                <div className="col-md-9">
                                    <Form onSubmit={this.handleSubmit} className="form">
                                        <div className="row">
                                            {profileSec && <div className="visible-xs">
                                                <div className="profile-image">
                                                    <div className="img-circle profileCard profileFormRadius">
                                                        <img className="img-circle profileCard profileFormRadius"
                                                            src={imageUrl ? imageUrl : '../images/images.jpg'} alt="" style={{ "width": "100%", borderRadius: '25px!important' }} />
                                                    </div>
                                                    <div className="single-file-input"
                                                        style={{ "padding": "16px", "marginTop": "-6px" }}>
                                                        <Upload {...props} >
                                                            <div className="btn btn-framed btn-primary small" style={{ backgroundColor: "#37a99b", backgroundImage: "none", borderColor: "#37a99b" }}>Upload a
                                                                picture
                                                            </div>
                                                        </Upload>
                                                    </div>
                                                </div>
                                            </div>}
                                            {profileSec && <div className="col-md-8">

                                                <section className=" profileCard profileFormRadius" style={{ padding: '2%', }}>
                                                    <div style={{ borderBottom: '1px solid black', padding: '2% 0%' }}>
                                                        <i class="fa fa-address-card iconStyle"></i>
                                                        <span className="profileFormHeading">Personal Information</span>
                                                    </div>
                                                    <div className="row" style={{ padding: "2% 0" }}>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label htmlFor="sel1">Title:</label>
                                                                <select className="form-control" id="sel1">
                                                                    <option>Mr.</option>
                                                                    <option>Ms.</option>
                                                                    <option>Mrs.</option>
                                                                    <option></option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <div className="form-group">
                                                                <label htmlFor="usr">Name:</label>
                                                                <FormItem>
                                                                    {getFieldDecorator('name', {
                                                                        initialValue: name,
                                                                        rules: [{
                                                                            required: true,
                                                                            message: 'Please input your Name!',
                                                                            whitespace: true
                                                                        }],
                                                                    })(
                                                                        <input type="text" className="form-control"
                                                                            onChange={this.onChangeValue.bind(this)}
                                                                        />
                                                                    )}
                                                                </FormItem>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <hr className="profileHrLine" />

                                                    <div className="row" style={{ padding: "2% 0" }}>
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="usr">Your Location:</label>
                                                                <FormItem>
                                                                    {getFieldDecorator('location', {
                                                                        initialValue: location,
                                                                        rules: [{
                                                                            required: true,
                                                                            message: 'Please input your Location!',
                                                                            whitespace: true
                                                                        }],
                                                                    })(
                                                                        <input type="text" className="form-control"
                                                                            onChange={this.onChangeValue.bind(this)} />
                                                                    )}
                                                                </FormItem>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <hr className="profileHrLine" />

                                                    <div className="row" style={{ padding: "2% 0" }}>
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="usr">More About You:</label>
                                                                <FormItem style={{ marginBottom: '0px' }}>
                                                                    {getFieldDecorator('description', {
                                                                        initialValue: description,
                                                                        rules: [
                                                                            {
                                                                                required: true,
                                                                                message: 'Please input your Info!',
                                                                                whitespace: true
                                                                            }],
                                                                    })(
                                                                        <TextArea className="form-control"
                                                                            onChange={this.onChangeValue.bind(this)}
                                                                            placeholder="tell more" rows={3}
                                                                            maxlength="500" />
                                                                    )}
                                                                </FormItem>
                                                                <span>{this.state.desLen}Words</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </section>
                                                <section className=" profileCard profileFormRadius" style={{ padding: '2%' }}>
                                                    <div style={{ borderBottom: '1px solid black', padding: '2% 0%' }}>
                                                        <i class="fa fa-address-card iconStyle"></i>
                                                        <span className="profileFormHeading">Contact</span>
                                                    </div>
                                                    <div className="form-group" style={{ padding: "2% 0" }}>
                                                        <label htmlFor="phone" className="col-form-label">Phone</label>
                                                        <FormItem>
                                                            {getFieldDecorator('phone', {
                                                                initialValue: phone,
                                                                rules: [{
                                                                    required: true,
                                                                    message: 'Please input your Phone!',
                                                                    whitespace: true
                                                                },
                                                                { validator: this.validateNumber.bind(this) }],
                                                            })(
                                                                <Input name="phone" type="text" className="form-control"
                                                                    onChange={this.onChangeValue.bind(this)}
                                                                    placeholder="Your Phone" />
                                                            )}
                                                        </FormItem>
                                                    </div>

                                                    <hr className="profileHrLine" />

                                                    <div className="form-group" style={{ padding: "2% 0" }}>
                                                        <label htmlFor="email" className="col-form-label">Email</label>
                                                        <FormItem>
                                                            {getFieldDecorator('email', {
                                                                initialValue: email,
                                                                rules: [{
                                                                    type: 'email',
                                                                    message: 'The input is not valid E-mail!',
                                                                }, {
                                                                    required: true,
                                                                    message: 'Please input your E-mail!',
                                                                }],
                                                            })(
                                                                <Input name="email" type="email"
                                                                    className="form-control"
                                                                    onChange={this.onChangeValue.bind(this)}
                                                                    placeholder="Your Email" readOnly />
                                                            )}
                                                        </FormItem>
                                                    </div>
                                                </section>
                                                <section className=" profileCard profileFormRadius" style={{ padding: '2%' }}>
                                                    <div style={{ borderBottom: '1px solid black', padding: '2% 0%' }}>
                                                        <i class="fa fa-link iconStyle"></i>
                                                        <span className="profileFormHeading">Social</span>
                                                    </div>
                                                    <div className="form-group" style={{ padding: "2% 0" }}>
                                                        <label htmlFor="phone"
                                                            className="col-form-label">Twitter</label>
                                                        <FormItem>
                                                            {getFieldDecorator('twitter', {
                                                                initialValue: twitter,
                                                                rules: [{
                                                                    required: true,
                                                                    message: 'Please input your Twitter!',
                                                                    whitespace: true
                                                                }],
                                                            })(
                                                                <input name="phone" type="text" className="form-control"
                                                                    onChange={this.onChangeValue.bind(this)}
                                                                    placeholder="Your Twitter Link" />
                                                            )}
                                                        </FormItem>
                                                    </div>

                                                    <hr className="profileHrLine" />

                                                    <div className="form-group" style={{ padding: "2% 0" }}>
                                                        <label htmlFor="email"
                                                            className="col-form-label">Facebook</label>
                                                        <FormItem>
                                                            {getFieldDecorator('facebook', {
                                                                initialValue: facebook,
                                                                rules: [{
                                                                    required: true,
                                                                    message: 'Please input your Facebook!',
                                                                    whitespace: true
                                                                }],
                                                            })(
                                                                <input name="email" type="text" className="form-control"
                                                                    onChange={this.onChangeValue.bind(this)}
                                                                    placeholder="Your Facebook Link" />
                                                            )}
                                                        </FormItem>
                                                    </div>
                                                </section>
                                                <section>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <button className="btn btn-primary btnStyle"
                                                                style={{ "float": "right", backgroundImage: "none", }}>Save Changes
                                                            </button>
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>}
                                            {changePass && <div className="col-md-8">
                                                <section className=" profileCard profileFormRadius" style={{ padding: '2%' }}>
                                                    <div style={{ borderBottom: '1px solid black', padding: '2% 0%' }}>
                                                        <i class="fa fa-key iconStyle"></i>
                                                        <span className="profileFormHeading">Change Password</span>
                                                    </div>
                                                    <div className="form-group" style={{ padding: '2%' }}>
                                                        <label htmlFor="currentpassword" className="col-form-label">Current
                                                            Password</label>
                                                        <FormItem>
                                                            {getFieldDecorator('currentPass', {
                                                                rules: [{
                                                                    required: true,
                                                                    message: 'Please input your Current Password!',
                                                                }],
                                                            })(
                                                                <Input name="currentpassword" type="password"
                                                                    className="form-control" id="password"
                                                                    placeholder="Current Password" />
                                                            )}
                                                        </FormItem>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="newpassword" className="col-from-label">New
                                                            Password</label>
                                                        <FormItem>
                                                            {getFieldDecorator('password', {
                                                                rules: [{
                                                                    required: true,
                                                                    message: 'Please input your New Password!',
                                                                }, {
                                                                    validator: this.validateToNextPassword,
                                                                }],
                                                            })(
                                                                <Input name="newpassword" type="password"
                                                                    className="form-control" id="New password"
                                                                    placeholder="new password" />
                                                            )}
                                                        </FormItem>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="confrimpassword" className="col-form-label">Confrim
                                                            Password</label>
                                                        <FormItem>
                                                            {getFieldDecorator('confirm', {
                                                                rules: [{
                                                                    required: true,
                                                                    message: 'Please input your Confirm Password!',
                                                                }, {
                                                                    validator: this.compareToFirstPassword,
                                                                }],
                                                            })(
                                                                <Input name="confrimpassword" type="password"
                                                                    className="form-control" id="confrimpassword"
                                                                    placeholder="Confrim Password" />
                                                            )}
                                                        </FormItem>
                                                    </div>
                                                </section>
                                                <section>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <button className="btn btn-primary btnStyle"
                                                                style={{ "float": "right", }}>Change Password
                                                            </button>
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>}
                                            {profileSec && <div className="col-md-4 hidden-xs">
                                                <div className="profile-image">
                                                    <div className="img-circle card profileFormRadius">
                                                        <img className="img-circle card profileFormRadius"
                                                            src={imageUrl ? imageUrl : '../images/images.jpg'} alt="" style={{ "width": "100%" }} />
                                                    </div>
                                                    <div className="single-file-input"
                                                        style={{ "padding": "16px", "marginTop": "-6px" }}>
                                                        <Upload {...props} >
                                                            <div className="btn btn-framed btn-primary small btnStyle" style={{ background: "#236A4B", backgroundImage: "none", borderColor: "#37a99b" }}>Upload a
                                                                picture
                                                            </div>
                                                        </Upload>
                                                    </div>
                                                </div>
                                            </div>}
                                            {/*===============Ad Listing start=================*/}
                                            {listing && <Tabs defaultActiveKey="1">

                                                
                                                <TabPane tab='E Commerce' key="1">
                                                    <div className="secondfold" style={{ backgroundColor: '#FBFAFA' }}>
                                                        <div className="index-content" style={{ marginTop: '20px' }}>
                                                            <div className="row">
                                                                {listData5.length ? listData5.map((elem) => {
                                                                    let img = elem.images && elem.images[0] || '../images/images.jpg';

                                                                    let title = elem.product || ''
                                                                    let str = elem.brandName || '';
                                                                    if (str.length > 45) {
                                                                        str = str.substring(0, 45);
                                                                        str = str + '...'
                                                                    }
                                                                    return (
                                                                        <div className="col-md-4 col-sm-4" style={{
                                                                            marginBottom: '20px',
                                                                            marginTop: '20px'
                                                                        }}>
                                                                            <div className="sellercardopacity" style={{ cursor: 'pointer' }}>
                                                                                <div className="overlay1">
                                                                                    <Link to={{
                                                                                        pathname: `/EcommerceProfile/${elem._id}`,
                                                                                        state: elem
                                                                                    }}>
                                                                                        <div className="sellerstorecard" >
                                                                                            <img alt='img' src={img} />
                                                                                        </div>
                                                                                        <h4 style={{ marginTop: "20px", textAlign: "left" }}>{elem.shopTitle}</h4>
                                                                                        <div class="middle">
                                                                                            <div class="text">View Shop</div>
                                                                                        </div>
                                                                                    </Link>
                                                                                </div>

                                                                            </div>
                                                                        </div>

                                                                    )
                                                                }) :
                                                                    noData
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TabPane>
                                            </Tabs>}
                                            {/*===============Ad listing end=============*/}
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
                <Footer />
            </div>
        )
    }
}

const WrappedBusinessForm = Form.create()(ProfileUser);
export default WrappedBusinessForm;
