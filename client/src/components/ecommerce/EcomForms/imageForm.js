import React, { Component } from 'react';
import {
  Upload, Icon, Form, Modal, notification
} from 'antd';
import superagent from "superagent";
import sha1 from "sha1";

const FormItem = Form.Item;

class ImageForm extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    imageList: [],
    noChooseFile: false,
    herfSec: ''
  };
  componentDidMount() {
    let data = this.props.data;
    if (data) {
      this.setState({
        imageList: data.images,
      })
    }
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  deleteImage(e) {
    let { imageList } = this.state;
    imageList = imageList.filter((elem) => elem !== e)
    this.setState({ imageList: imageList })
  }

  handleChange = ({ fileList }) => {
    this.setState({
      fileList
      , noChooseFile: true
    })
  }

  handleSubmit(e, key) {
    e.preventDefault();
    if (this.state.herfSec === '') {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.funcForUpload(values, key)
        }
      })
    }
  }

  async funcForUpload(values, key) {
    const { fileList } = this.state;
    Promise.all(fileList.map((val) => {
      return this.uploadFile(val).then((result) => {
        return result.body.url
      })
    })).then((results) => {
      this.postData(values, results, key)
    })
  }

  //--------------function for cloudnary url ---------------
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

  //-----------------cloudnary function end ------------------
  async postData(values, response, key) {
    const { imageList } = this.state;
    let respons;
    if (imageList != undefined) {
      respons = [...imageList, ...response];
    }
    else {
      respons = response
    }
    this.props.handleProps({ images: respons }, 'description');
    this.props.desStates()
    if (key === 'submit') {
      this.setState({
        herfSec: '#Section4'
      },
        () => {
          document.getElementById('imgForm').click();
        })
      let msg = 'Your Images is submited successfully, Kindly fill next form'
      this.openNotification(msg)
    }
    else if (key === 'draft') {
      let msg = 'Your Images is saved successfully.'
      this.openNotification(msg)
    }
  }

  openNotification(msg) {
    notification.open({
      message: 'Success ',
      description: msg
    });
  };


  render() {
    const { previewVisible, fileList, noChooseFile, previewImage, herfSec, imageList } = this.state,
      { getFieldDecorator } = this.props.form;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const uploadedImages = (
      <div style={{ height: '100%' }}>
        {imageList && this.state.imageList.map((elem) => {
          return (
            <div className='insideDiv'>
              <a>
                <img alt='img1' src={elem} style={{ height: '100%' }} />
                <span>
                  <a><Icon title='Preview file' onClick={() =>
                    this.handlePreview(elem)} type="eye" theme="outlined"
                    style={{
                      zIndex: 10, transition: 'all .3s', fontSize: '16px',
                      width: '30px', color: 'rgba(255, 255, 255, 0.85)', margin: '0 4px'
                    }} />
                  </a>
                  <Icon title='Remove file' type='delete'
                    onClick={this.deleteImage.bind(this, elem)}
                    style={{
                      zIndex: 10, transition: 'all .3s', fontSize: '16px',
                      width: '30px', color: 'rgba(255, 255, 255, 0.85)', margin: '0 4px'
                    }} />
                </span>
              </a>
            </div>
          )
        })}
      </div>
    )
    const formItemLayout = {
      labelCol: {
        md: { span: 6 },
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        md: { span: 12 },
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <div className="container" style={{ width: "100%" }}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-3">
                <div className="vitalbox">
                  <h4> Listing Assitant </h4>
                  <p> Supply enough information tomake the
                    buying decision easy. Please ensure that
                    all products and content comply with our
                    Selling and Policies restrictions including
                  the Restructed products policy </p>
                  <p style={{ textAlign: "center" }}> *Fields are required </p>
                </div>
              </div>
              <div className="col-md-9">
                <div className="vitalbox">
                  <div className="row">
                    <div className="col-md-4">
                      <h4> Main </h4>
                      <div className="vitalbox">
                        <div className="row" style={{ padding: "0px", marginTop: "20px" }}>
                          <div className="col-md-6">
                            <FormItem
                              {...formItemLayout}
                              label="Images"
                            >
                              {getFieldDecorator('images', {
                                rules: [{
                                  required: true,
                                  message: 'Please upload your Images!',
                                  whitespace: true
                                }],
                              })(
                                <div className="clearfix">
                                  <Upload
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                  >
                                    {imageList && this.state.imageList.length + fileList.length >= 6 ? null : uploadButton}
                                  </Upload>
                                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                  </Modal>
                                  {uploadedImages}
                                </div>
                              )}
                            </FormItem>
                          </div>
                          {noChooseFile ?
                            null
                            : <div className="col-md-6">
                              <h6 style={{ marginTop: "10px", marginLeft: "4px" }}> No File Chosen</h6>
                            </div>
                          }

                        </div>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <h4> Product images style guidline </h4>
                      <p> Listing that are missing a main image will not appear in search or browser you fix the listing. Choose images that are clear, information-rich and attractive <br />
                        Images must meet the following  </p>
                      <ul>
                        <li> Products must fill at least 85% of image. Images must show only the product that is for sell,
                        with fewer or no props with no logo,
                      watermarks or insert images, images may only contain text that is a part of product.   </li>
                        <li> Main image must have pure white background, nmust be a photo (Not a drawing), and must not contain excluded accessories.</li>
                        <li> Image must be at least 1000 pixel on the longest side and atleast 500 pixels on shortest side to be zoom-able </li>
                        <li> Images must not exceed 10000 pixels on the longest side </li>
                        <li> JPEG is the prefered image format, but you may also use TIFF and GIF files.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
        <div className="row col-md-9 col-md-offset-3" style={{ paddingTop: "10px", paddingLeft: "" }}>
          <div className="col-md-3 col-xs-4">
            <div className="row center_global row">
              <button style={{ textAlign: 'center' }} className="btn ecombutton"
                onClick={() => this.props.form.resetFields()}>Cancel</button>
            </div>
          </div>
          <div className="col-md-3 col-xs-4">
            <div className="row center_global row">
              <button style={{ textAlign: 'center', width: "70%" }}
                className="btn ecombutton" onClick={(e) => this.handleSubmit(e, 'draft')}>
                Save as Draft</button>
            </div>
          </div>
          <div className="col-md-3 col-xs-4">
            <div className="row center_global row">
              <button style={{ textAlign: 'center', width: "70%" }}
                className="btn button_custom" onClick={(e) => this.handleSubmit(e, 'submit')}>
                <a href={herfSec} aria-controls="profile" role="tab" data-toggle="tab" id='imgForm'>
                  Next
                </a>
              </button>
            </div>
          </div>
          <div className="col-md-3">
          </div>
        </div>
      </div>
    )
  }
};

const WrappedBusinessForm = Form.create()(ImageForm);
export default WrappedBusinessForm;
