import React, { Component } from 'react';
import {
    Form,
    Input,
    Icon,
    Cascader,
    Spin,
    Checkbox,
    notification,
    Upload,
    Modal,
    Button,
    Radio,
    Anchor
} from 'antd';
import Burgermenu from '../../header/burgermenu';
import HeaderMenu from '../../header/headermenu';
import sha1 from "sha1";
import superagent from "superagent";
import Footer from '../../footer/footer';
import './shopForm.css'
import { HttpUtils } from "../../../Services/HttpUtils";
import { Redirect } from "react-router-dom";


const { Link } = Anchor;

const handleClick = (e, link) => {
    e.preventDefault();
    console.log(link);
};

const { TextArea } = Input;
const Dragger = Upload.Dragger;


const category = [
    {
        value: 'Action and Adventure',
        label: 'Action and Adventure',
    },
    {
        value: 'Anthology',
        label: 'Anthology',
    },
    {
        value: 'Classic',
        label: 'Classic',
    },
    {
        value: 'Comic and Graphic Novel',
        label: 'Comic and Graphic Novel'
    },
    {
        value: 'Crime and Detective',
        label: 'Crime and Detective',
    },
    {
        value: 'Drama',
        label: 'Drama',
    },
    {
        value: 'Fairy Tale',
        label: 'Fairy Tale'
    },
    {
        label: 'Fantasy',
        value: 'Fantasy',
    },
    {
        value: 'Historical Fiction',
        label: 'Historical Fiction',
    },
    {
        value: 'Horror',
        label: 'Horror',
    },
    {
        value: 'Romance',
        label: 'Romance',
    },
    {
        label: 'Biography/Autobiography',
        value: 'Biography/Autobiography',
    },
    {
        label: 'Narrative Nonfiction',
        value: 'Narrative Nonfiction',
    }, {
        label: 'Periodicals',
        value: 'Periodicals',
    }, {
        label: 'Reference Books',
        value: 'Reference Books',
    }, {
        label: 'Self-help Book',
        value: 'Self-help Book',
    }, {
        label: 'Speech',
        value: 'Speech',
    }, {
        label: 'Textbook',
        value: 'Textbook',
    }, {
        label: 'Poetry',
        value: 'Poetry',
    },
];

 
let id = 0;

class ShopForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fileList: [],
            previewVisible: false,
            previewImage: '',
            coverPhotoSrc: '',
            bannerSrc: '',
            keyFor: '',
            shopPurpose: '',
            fileListLogo: [],
            previewVisibleLogo: false,
            previewImageLogo: '',
            btnDisabeld: false,
            mgs: '',
            loader: false,
            shopData: '',
            shopId: '',
            goShop: false,
            shopTitle: '',
            shopAddress: '',
            shopCity: '',
            shopState: '',
            shopCategories: '',
            shopDescription: '',
            shopCategories: [],
            objectId: '',
            showAlert: false,
            gridImages: false,
        }
    }

    componentDidMount() {
        let data = this.props.location.state;
        if (data) {
            this.setState({
                shopTitle: data.shopTitle,
                shopAddress: data.shopAddress,
                shopCity: data.shopCity,
                shopState: data.shopState,
                shopDescription: data.shopDescription,
                shopPurpose: data.shopPurpose,
                shopCategories: data.shopCategories,
                objectId: data._id,
                accountTitle: data.accountTitle,
                bankAddress: data.bankAddress,
                bankName: data.bankName,
                ibank: data.ibank,
                swift: data.swift,
                // fileListLogo: data.shopLogo,

            })
        }
    }

    addForm = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        this.setState({ keyFor: nextKeys.length })
        form.setFieldsValue({
            keys: nextKeys,
        });
    }


    removeForm = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');

        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }
        // can use data-binding to set
        this.setState({ keyFor: keys.length - 1 })
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    validateNumber(rule, value, callback) {
        if (isNaN(value)) {
            callback('Please type Numbers');
        } else {
            callback()
        }
    }

    handleCancel = () => {
        this.setState({ previewVisible: false })
    }

    handleCancelLogo = () => {
        this.setState({ previewVisibleLogo: false })
    }

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl || file,
            previewVisible: true,
        });
    }

    handlePreviewLogo = (file) => {
        this.setState({
            previewImageLogo: file.url || file.thumbUrl || file,
            previewVisibleLogo: true,
        });
    }

    handleChange = ({ fileList }) => {
        this.setState({
            fileList: fileList,
            gridImages: false,
        })
    }

    handleChangeLogo = ({ fileList }) => {
        this.setState({ fileListLogo: fileList })
    }

    onChangeCoverPhoto = info => {
        let self = this,
            file = info.file,
            coverPhoto = [],
            reader = new FileReader();

        //Read the contents of Image File.
        reader.readAsDataURL(info.file.originFileObj);
        reader.onload = function (e) {

            //Initiate the JavaScript Image object.
            var image = new Image();

            //Set the Base64 string return from FileReader as source.
            image.src = e.target.result;

            //Validate the File Height and Width.
            image.onload = function () {
                let height = this.height,
                    width = this.width;
                if (height < width) {
                    file.src = e.target.result;
                    coverPhoto.push(file);
                    self.setState({ coverPhotoSrc: file.src, coverPhoto });
                    return false;
                }
                alert("Image must be in landscape mode.");
                return true;
            };
        }
    }

    onChangeBanner = info => {
        if (info.event !== undefined) {
            let self = this,
                file = info.file,
                banner = [],
                reader = new FileReader();

            //Read the contents of Image File.
            reader.readAsDataURL(info.file.originFileObj);
            reader.onload = function (e) {

                //Initiate the JavaScript Image object.
                var image = new Image();

                //Set the Base64 string return from FileReader as source.
                image.src = e.target.result;

                //Validate the File Height and Width.
                image.onload = function () {
                    let height = this.height,
                        width = this.width;
                    if (height > width) {
                        file.src = e.target.result;
                        banner.push(file);
                        self.setState({ bannerSrc: file.src, banner });
                        return false;
                    }
                    alert("Image must be in portrait mode.");
                    return true;
                };
            }
        }

    }

    0

    handleSubmit = (e) => {
        e.preventDefault();
        let { fileList, coverPhoto, banner, fileListLogo } = this.state;
        let arr = [];
        let coverImg;
        let bannerImg;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (coverPhoto != undefined && banner != undefined && fileList.length >= 4) {
                    this.setState({
                        loader: true,
                        btnDisabeld: true
                    })
                    coverImg = { ...coverPhoto[0], ...{ id: 'banner' } },
                        bannerImg = { ...banner[0], ...{ id: 'gridImage' } };

                    arr.push(coverImg, bannerImg)
                    console.log(values, 'values')
                    this.funcForUpload(values, arr, fileList, fileListLogo)
                }
                else if (coverPhoto == undefined || banner == undefined) {
                    console.log('else if baner & grid')
                    this.setState({
                        showAlert: true,
                    })
                }
                else if (fileList.length < 4) {
                    console.log('else if 4 grid images')

                    this.setState({
                        gridImages: true,
                    })
                }

            }
        })
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

    async funcForUpload(values, arr, fileList, fileListLogo) {
        Promise.all(arr.map((val) => {
            return this.uploadFile(val).then((result) => {
                let id = val.id;
                return { [id]: result.body.url }
            })
        })).then((results) => {
            if (results) {
                Promise.all(fileList.map((val) => {
                    return this.uploadFile(val).then((result) => {
                        return result.body.url
                    })
                })).then((images) => {
                    if (images) {
                        Promise.all(fileListLogo.map((val) => {
                            return this.uploadFile(val).then((result) => {
                                return result.body.url
                            })
                        })).then((logo) => {

                            this.postData(values, results, images, logo);
                        })
                    }
                })
            }
        })
    }

    async postData(values, response, images, logo) {
        const { keyFor, shopPurpose, objectId } = this.state;
        let cetogires = [];
        let cover = '';
        let banner = '';
        response.map((elem) => {
            if (Object.keys(elem)[0] == 'banner') {
                cover = elem['banner']
            }
            else if (Object.keys(elem)[0] == 'gridImage') {
                banner = elem['gridImage']
            }
        })
        if (keyFor == '') {
            cetogires.push(values.shopCategories0[0])
        }
        else {
            for (var i = 0; i < keyFor; i++) {
                cetogires.push(values[`shopCategories${i}`][0])
            }
        }
        const userData = JSON.parse(localStorage.getItem('user'));

        let shopObj = {
            shopTitle: values.shopTitle,
            shopCategories: cetogires,
            shopAddress: values.shopAddress,
            shopCity: values.shopCity,
            shopState: values.shopState,
            shopDescription: values.shopDescription,
            images: images,
            gridImageSrc: banner,
            bannerPhotoSrc: cover,
            shopPurpose: shopPurpose,
            shopLogo: logo,
            objectId: objectId,
            profileId: userData.profileId,
            userId: userData._id,
            bankName: values.bankName,
            accountTitle: values.accountTitle,
            ibank: values.ibank,
            bankAddress: values.bankAddress,
            swift: values.swift,
        }

        let reqShopObj = await HttpUtils.post('postshop', shopObj)
        console.log(reqShopObj, 'reqShopObj')
        if (reqShopObj.code === 200) {
            if (objectId != '') {
                this.setState({
                    loader: false,
                    btnDisabeld: false,
                    mgs: reqShopObj.mgs,
                    shopData: reqShopObj.content[0],
                    shopId: reqShopObj.content[0]._id,
                    goShop: true
                })
            }
            else {
                this.setState({
                    loader: false,
                    btnDisabeld: false,
                    mgs: reqShopObj.mgs,
                    shopData: reqShopObj.content,
                    shopId: reqShopObj.content._id,
                    goShop: true
                })
            }
            this.openNotification()

        }
        else {
            this.setState({
                loader: false,
                btnDisabeld: false,
                mgs: reqShopObj.msg

            })
        }
    }

    onChangeShop = e => {
        this.setState({
            shopPurpose: e.target.value,
        });
    };

    openNotification() {
        notification.open({
            message: 'Shop Created Success ',
            description: "Your shop has been created successfully"
        });
    };

    render() {
        const { fileList, previewImage, previewVisible, fileListLogo, previewImageLogo, previewVisibleLogo, btnDisabeld, mgs, loader, shopData, shopId, goShop, showAlert, gridImages } = this.state;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        if (goShop) {
            return (
                <Redirect to={{ pathname: `/EcommerceProfile/${shopId}`, state: shopData }} />
            )
        }
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const uploadButtonLogo = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const gridImage = (
            <div className="shopcataloge">
                <Icon type="plus-square" />
                <div className="ant-upload-text">Upload Grid Image</div>
            </div>
        )

        const antIcon = <Icon type="loading" style={{ fontSize: 120 }} spin />;


        { getFieldDecorator('keys', { initialValue: [keys] }) };
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            return (
                <Form.Item
                    required={false}
                    key={k}
                >
                    <div className='row' style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                        <div className="col-md-12 col-sm-10 col-xs-10"
                            key={index} style={{ marginTop: '10px' }}>
                            <label htmlFor="Category"> Category </label>
                            <Form.Item style={{ marginTop: '10px' }}>
                                {getFieldDecorator(`shopCategories${index}`, {
                                    // initialValue: this.state.shopCategory,
                                    initialValue: this.state.shopCategories,
                                    defaultValue: Option.initialValue,
                                    rules: [{
                                        type: 'array',
                                        required: true,
                                        message: 'Please select your Shop Category!',
                                    }],
                                })(
                                    <Cascader
                                        options={category}
                                    />
                                )}
                            </Form.Item>
                        </div>
                        {keys.length > 1 ? (
                            <div className='col-md-2 col-sm-2 col-xs-2'>
                                <button
                                    type="button"
                                    onClick={() => this.removeForm(k)}
                                    className="btn btn-fb"
                                    style={{ marginTop: '24px', backgroundColor: 'white', marginLeft: '-20px' }}
                                >
                                    <i className="fa fa-minus" style={{ color: 'gray', width: '100%', border: '1px solid', padding: '8px' }}></i>
                                </button>
                            </div>
                        ) : null}
                    </div>
                </Form.Item>
            )
        })
        return (
            <div>
                {/*================================App component include Start===========================*/}
                {showAlert && alert("Please Upload required grid & banner")}
                {gridImages && alert("Please Upload 4 grid images for shops")}

                <HeaderMenu />

                <div className="hidden-xs" style={{ width: "100%", height: "67px", marginTop: "3px" }}></div>

                {/*================================post business form start============================*/}
                <div className="hidden-sm" style={{ marginTop: '4%' }}></div>
                <div className="visible-sm" style={{ marginTop: '15%' }}></div>
                <div className="col-lg-12 col-md-12 col-md-12 col-sm-12 col-xs-12" style={{ textAlign: "center" }}>
                    <h1 style={{ fontFamily: 'Work Sans, sans-serif', fontWeight: "bold", color: 'black' }}>CREATE YOUR SHOP</h1>
                </div>

                <div className="col-lg-3 col-md-3 hidden-sm hidden-xs">

                </div>
                <div className="col-lg-2 col-md-2 hidden-sm hidden-xs" id="section1" style={{ marginLeft: '4%', marginTop: '60px', position: 'fixed', }}>
                    <Anchor className="" style={{ margin: '2%', backgroundColor: '#f6f6f6' }}>
                        <Link href="#scrollChange1" title="Shop Details" />
                        <Link href="#scrollChange2" title="Upload Images" />
                        <Link href="#scrollChange3" title="Billing Details" />

                    </Anchor>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">


                    <Form onSubmit={this.handleSubmit}>
                        <div className="formRadius card" id="scrollChange1">{/*panel-body */}
                            <div className="">{/*panel panel-default */}
                                <div className="bold_c_text"
                                    style={{
                                        color: 'black', padding: '2%', fontFamily: 'Crimson Text, serif !important',
                                        borderBottom: '1px solid #d9d9d9'
                                    }}>
                                    {/* <Icon type="info-circle" /> */}
                                    <i class="fa fa-info-circle iconStyle"></i>
                                    <span className="margin_font_location">Shop Detail</span>
                                </div>
                                <div className="bottomRadius card" id="scrollChange1" style={{ marginBottom: '3%' }}>{/*container  style={{ width: '80%' }}*/}
                                    <section>
                                        <div className="row" style={{ padding: '0px', marginTop: '10px' }}>
                                            <div className="col-md-12">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="sel1">Shop Title</label>
                                                        <Form.Item style={{ padding: '2% 0%' }}>
                                                            {getFieldDecorator('shopTitle', {
                                                                initialValue: this.state.shopTitle,
                                                                rules: [{
                                                                    required: true,
                                                                    message: 'Please input your Shop Title!',
                                                                    whitespace: true
                                                                }],
                                                            })(
                                                                <input type="text" className="form-control" />
                                                            )}
                                                        </Form.Item>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="sel1">Address</label>
                                                        <Form.Item style={{ padding: '2% 0%' }}>
                                                            {getFieldDecorator('shopAddress', {
                                                                initialValue: this.state.shopAddress,
                                                                rules: [{
                                                                    required: true,
                                                                    message: 'Please input your Address!',
                                                                    whitespace: true
                                                                }],
                                                            })(
                                                                <Input />
                                                            )}
                                                        </Form.Item>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <hr className="hrLineStyle" />

                                        <div className='row'>
                                            <div className="col-md-6">
                                                <div className="row" style={{ padding: '0px' }}>
                                                    <div className="col-md-7" style={{ display: 'grid' }}>
                                                        <label> City </label>
                                                        <Form.Item style={{ padding: '2% 0%' }}>
                                                            {getFieldDecorator('shopCity', {
                                                                initialValue: this.state.shopCity,
                                                                rules: [{
                                                                    whitespace: true,
                                                                    required: true,
                                                                    message: 'Please select your City!'
                                                                }],
                                                            })(
                                                                <Input />
                                                            )}
                                                        </Form.Item>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <label> State </label>
                                                        <Form.Item style={{ padding: '2% 0%' }}>
                                                            {getFieldDecorator('shopState', {
                                                                initialValue: this.state.shopState,
                                                                rules: [{
                                                                    whitespace: true,
                                                                    required: true,
                                                                    message: 'Please select your State!'
                                                                }],
                                                            })(
                                                                <Input />
                                                            )}
                                                        </Form.Item>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">{/* style={{ padding: '0px' }} */}
                                                    <div className="col-md-6" className="form-group">
                                                        <label htmlFor="sel1">Shop Purpose</label>
                                                        <Form.Item style={{ padding: '2% 0%' }}>
                                                            {getFieldDecorator('shopPurpose', {
                                                                initialValue: this.state.shopPurpose,
                                                                rules: [{
                                                                    required: true,
                                                                    message: 'Please select your Shop Purpose!',
                                                                    whitespace: true
                                                                }],
                                                            })(
                                                                <Radio.Group onChange={this.onChangeShop}>
                                                                    <Radio value={"Gift Shop"}>Gift Shop</Radio>
                                                                    <Radio value={"Shop"}>Shop</Radio>
                                                                </Radio.Group>
                                                            )}
                                                        </Form.Item>
                                                    </div>
                                                    {/* <div className="col-md-6">
                                                        <label htmlFor="sel1">Shop Logo</label>

                                                        <Form.Item>
                                                            {getFieldDecorator('shopLogo', {
                                                                rules: [{
                                                                    required: true,
                                                                    message: 'Please upload your shop logo!',
                                                                    whitespace: true
                                                                }],
                                                            })(
                                                                <div>
                                                                    <Upload
                                                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                                        listType="picture-card"
                                                                        fileList={fileListLogo}
                                                                        onPreview={this.handlePreviewLogo}
                                                                        onChange={this.handleChangeLogo}
                                                                    >
                                                                        {fileListLogo.length > 1 ? null : uploadButtonLogo}
                                                                    </Upload>
                                                                    <div>
                                                                        <Modal visible={previewVisibleLogo} footer={null} onCancel={this.handleCancelLogo}>
                                                                            <img alt="example" style={{ width: '100%' }} src={previewImageLogo} />
                                                                        </Modal>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Form.Item>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>

                                        <hr className="hrLineStyle" />

                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="col-md-4">
                                                    <div className="row" style={{ padding: '0px' }}>
                                                        <div className="col-md-12" style={{ padding: '0px' }}>
                                                            <div className="col-md-8 col-sm-10 col-xs-10" style={{ padding: '0px' }}>
                                                                {formItems}
                                                            </div>
                                                            <div className="col-md-4 col-sm-2 col-xs-2" style={{ paddingLeft: '0.6%' }}>
                                                                <Form.Item style={{ padding: '2% 0%' }}>
                                                                    <div className='row' style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                                                                        <button
                                                                            type="button"
                                                                            onClick={this.addForm}
                                                                            className="btn btn-fb"
                                                                            style={{ marginTop: '24px', backgroundColor: 'white' }}
                                                                        >
                                                                            <i className="fa fa-plus"
                                                                                style={{
                                                                                    color: 'gray', width: '100%',
                                                                                    border: '1px solid', padding: '8px'
                                                                                }}
                                                                            >
                                                                            </i>
                                                                        </button>
                                                                    </div>
                                                                </Form.Item>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <hr className="hrLineStyle" />

                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="sel1">Description</label>
                                                        <Form.Item style={{ padding: '2% 0%' }}>
                                                            {getFieldDecorator('shopDescription', {
                                                                initialValue: this.state.shopDescription,
                                                                rules: [
                                                                    {
                                                                        required: true,
                                                                        message: 'Please input your Description/Details!',
                                                                        whitespace: true
                                                                    }],
                                                            })(
                                                                <TextArea
                                                                    rows={6}
                                                                    maxLength="500"
                                                                    style={{ "marginBottom": "10px" }} />
                                                            )}
                                                            <br />
                                                            <span style={{ "float": "right" }}>
                                                            </span>
                                                        </Form.Item>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                        <div className="formRadius card" id="scrollChange2">{/*panel-body */}
                            <div className="">{/*panel panel-default */}
                                <div className="bold_c_text"
                                    style={{
                                        color: 'black', padding: '2%', fontFamily: 'Crimson Text, serif !important',
                                        borderBottom: '1px solid #d9d9d9'
                                    }}>
                                    {/* <Icon type="info-circle" /> */}
                                    <i class="fa fa-upload iconStyle"></i>
                                    <span className="margin_font_location">Upload Images</span>
                                </div>

                                <div className="container" style={{ marginBottom: '3%', width: '95%' }}>{/*  style={{ width: '95%' }}*/}
                                    <section className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="sel1">Shop Logo</label>

                                            <Form.Item style={{ padding: '2% 0%' }}>
                                                {getFieldDecorator('shopLogo', {
                                                    rules: [{
                                                        required: true,
                                                        message: 'Please upload your shop logo!',
                                                        whitespace: true
                                                    }],
                                                })(
                                                    <div>
                                                        <Upload
                                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                            listType="picture-card"
                                                            fileList={fileListLogo}
                                                            onPreview={this.handlePreviewLogo}
                                                            onChange={this.handleChangeLogo}
                                                        >
                                                            {fileListLogo.length > 1 ? null : uploadButtonLogo}
                                                        </Upload>
                                                        <div>
                                                            <Modal visible={previewVisibleLogo} footer={null} onCancel={this.handleCancelLogo}>
                                                                <img alt="example" style={{ width: '100%' }} src={previewImageLogo} />
                                                            </Modal>
                                                        </div>
                                                    </div>
                                                )}
                                            </Form.Item>
                                        </div>
                                        <div className="col-md-6"></div>

                                        <div className="col-md-12" style={{ padding: '0px' }}>
                                            <label htmlFor="sel1">Shop Banner</label>

                                            <Form.Item style={{ padding: '2% 0%' }}>
                                                {getFieldDecorator('banner', {
                                                    rules: [{
                                                        required: true,
                                                        message: 'Please upload your Images!',
                                                        whitespace: true
                                                    }],
                                                })(
                                                    <span>
                                                        {this.state.coverPhotoSrc.length == 0 && <Dragger
                                                            id="coverPhoto"
                                                            name='file'
                                                            action="//jsonplaceholder.typicode.com/posts/"
                                                            onChange={this.onChangeCoverPhoto}>
                                                            <p className="ant-upload-drag-icon">
                                                                <Icon type="inbox" />
                                                            </p>
                                                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                                            <p className="ant-upload-hint">Upload your shop banner. Support for a single or bulk upload.</p>
                                                        </Dragger>}
                                                        {this.state.coverPhotoSrc.length > 0 && <div>
                                                            <img alt="example"
                                                                src={this.state.coverPhotoSrc}
                                                                style={{ height: '190px' }} />
                                                        </div>}
                                                    </span>
                                                )}
                                            </Form.Item>
                                        </div>
                                        <div className="col-md-6">
                                        </div>
                                    </section>
                                </div>

                                <hr className="hrLineStyle" />

                                <div className="" style={{ marginBottom: '3%' }}>{/*container  style={{ width: '80%' }}*/}
                                    <section className="row">
                                        <div className="col-md-12">
                                            <div className="col-md-6 col-sm-6">
                                                <label htmlFor="sel1">Shop Grid(Potrait) Image</label>

                                                <Form.Item style={{ width: '100%', padding: '2% 0%', }}>
                                                    {getFieldDecorator('gridImage', {
                                                        rules: [{
                                                            required: true,
                                                            message: 'Please upload your Images!',
                                                            whitespace: true
                                                        }],
                                                    })(
                                                        <span style={{ width: '100%' }}>
                                                            {this.state.bannerSrc.length == 0 && <Upload
                                                                action="//jsonplaceholder.typicode.com/posts/"
                                                                onPreview={this.handlePreview}
                                                                onChange={this.onChangeBanner}
                                                            >
                                                                {gridImage}
                                                            </Upload>}
                                                            {this.state.bannerSrc.length > 0 && <div>
                                                                <img alt="example"
                                                                    src={this.state.bannerSrc}
                                                                    className="shopcataloge" />
                                                            </div>}
                                                        </span>
                                                    )}
                                                </Form.Item>
                                            </div>
                                            <div className="col-md-6 col-sm-6">
                                                <div className="row" style={{ padding: '0px 0px 0px 10px' }}>
                                                    <div className="col-md-12">
                                                        <div className="col-md-6 col-sm-6 col-xs-12 clearfix" style={{ marginBottom: '20px' }}>
                                                            <label htmlFor="sel1">Shop Grid Images</label>

                                                            <Form.Item style={{ padding: '2% 0%' }}>
                                                                {getFieldDecorator('images', {
                                                                    rules: [{
                                                                        required: true,
                                                                        message: 'Please upload your Images!',
                                                                        whitespace: true
                                                                    }],
                                                                })(
                                                                    <div>
                                                                        <Upload
                                                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                                            listType="picture-card"
                                                                            fileList={fileList}
                                                                            onPreview={this.handlePreview}
                                                                            onChange={this.handleChange}
                                                                        >
                                                                            {fileList.length > 3 ? null : uploadButton}
                                                                        </Upload>

                                                                    </div>
                                                                )}
                                                            </Form.Item>
                                                        </div>
                                                        <div className="col-md-6 col-sm-6 col-xs-6" style={{ marginBottom: '20px' }}>
                                                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                                            </Modal>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                        <div className="formRadius card" id="scrollChange3">{/*panel-body */}
                            <div className="">{/*panel panel-default */}
                                <div className="bold_c_text"
                                    style={{
                                        color: 'black', padding: '2%', fontFamily: 'Crimson Text, serif !important',
                                        borderBottom: '1px solid #d9d9d9'
                                    }}>
                                    {/* <Icon type="info-circle" /> */}
                                    <i class="fa fa-info-circle iconStyle"></i>
                                    <span className="margin_font_location">Billing Detail</span>
                                </div>
                                <div className="bottomRadius card">{/*container  style={{ width: '80%' }}*/}
                                    <section>
                                        <div className="row" style={{ padding: '0px', marginTop: '10px' }}>
                                            <div className="col-md-12">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="sel1">Bank Name</label>
                                                        <Form.Item style={{ padding: '2% 0%' }}>
                                                            {getFieldDecorator('bankName', {
                                                                initialValue: this.state.bankName,
                                                                rules: [{
                                                                    required: true,
                                                                    message: 'Please input your bank name!',
                                                                    whitespace: true
                                                                }],
                                                            })(
                                                                <Input />
                                                            )}
                                                        </Form.Item>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="sel1">Account Title</label>
                                                        <Form.Item style={{ padding: '2% 0%' }}>
                                                            {getFieldDecorator('accountTitle', {
                                                                initialValue: this.state.accountTitle,
                                                                rules: [{
                                                                    required: true,
                                                                    message: 'Please input your Account Title!',
                                                                    whitespace: true
                                                                }],
                                                            })(
                                                                <Input type="text" className="form-control" />
                                                            )}
                                                        </Form.Item>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <hr className="hrLineStyle" />

                                        <div className='row'>
                                            <div className="col-md-6">
                                                <div className="row" style={{ padding: '0px' }}>
                                                    <div className="col-md-7" style={{ display: 'grid' }}>
                                                        <label> I Bank </label>
                                                        <Form.Item style={{ padding: '2% 0%' }}>
                                                            {getFieldDecorator('ibank', {
                                                                initialValue: this.state.ibank,
                                                                rules: [{
                                                                    whitespace: true,
                                                                    required: true,
                                                                    message: 'Please select your i bank!'
                                                                },
                                                                { validator: this.validateNumber.bind(this) }]
                                                            })(
                                                                <Input />
                                                            )}
                                                        </Form.Item>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <label> Swift/Sort </label>
                                                        <Form.Item style={{ padding: '2% 0%' }}>
                                                            {getFieldDecorator('swift', {
                                                                initialValue: this.state.swift,
                                                                rules: [{
                                                                    whitespace: true,
                                                                    required: true,
                                                                    message: 'Please select your Swift/Sort!'
                                                                },
                                                                { validator: this.validateNumber.bind(this) }],
                                                            })(
                                                                <Input />
                                                            )}
                                                        </Form.Item>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="sel1">Bank Address</label>
                                                    <Form.Item style={{ padding: '2% 0%' }}>
                                                        {getFieldDecorator('bankAddress', {
                                                            initialValue: this.state.bankAddress,
                                                            rules: [{
                                                                required: true,
                                                                message: 'Please input your Bank Address!',
                                                                whitespace: true
                                                            }],
                                                        })(
                                                            <Input type="text" className="form-control" />
                                                        )}
                                                    </Form.Item>

                                                </div>
                                            </div>
                                        </div>

                                    </section>
                                </div>
                            </div>
                        </div>
                        <div className="row center_global row">
                            {btnDisabeld ?
                                <button
                                    disabled
                                    style={{ textAlign: 'center', width: "45%" }}
                                    className="btn color_button">
                                    Submit Shop
                                    </button>

                                :
                                <button
                                    style={{ textAlign: 'center', width: "45%" }}
                                    className="btn color_button">
                                    Submit Shop
                                </button>
                            }
                        </div>
                        <div className="col-md-12">
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                                {mgs != "" && <p style={{ marginTop: '20px', fontWeight: 'bold', color: 'red' }}>{mgs}</p>}
                            </div>
                            <div className="col-md-4"></div>
                        </div>
                        {loader && <div style={{ textAlign: 'center', marginLeft: '-100px', marginBottom: '15px' }}>
                            <Spin indicator={antIcon} />
                        </div>}
                    </Form>
                </div>
                {/* <Footer /> */}
            </div >
        )
    }
}

const WrappedBusinessForm = Form.create()(ShopForm);
export default WrappedBusinessForm;
