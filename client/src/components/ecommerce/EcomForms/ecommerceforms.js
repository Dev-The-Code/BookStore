import React, { Component } from 'react';
import superagent from "superagent";
import sha1 from "sha1";
import { HttpUtils } from "../../../Services/HttpUtils";
import { Redirect } from "react-router-dom";
import {
  Form,
  Select,
  Input,
  InputNumber,
  Cascader,
  notification,
  Button,
  Upload,
  Icon,
  Checkbox,
  Row,
  Col,
  Modal,
  Spin,
  Switch,
  Radio,
  Slider,
  Rate,
} from 'antd';

const { Option } = Select;
const { TextArea } = Input;


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PriceInput extends React.Component {
  handleNumberChange = e => {
    const number = parseInt(e.target.value || 0, 10);
    if (isNaN(number)) {
      return;
    }
    this.triggerChange({ number });
  };

  handleCurrencyChange = currency => {
    this.triggerChange({ currency });
  };

  triggerChange = changedValue => {
    const { onChange, value } = this.props;
    if (onChange) {
      onChange({
        ...value,
        ...changedValue,
      });
    }
  };

  render() {
    const { size, value } = this.props;
    return (
      <span>
        <Input
          type="text"
          size={size}
          value={value.number}
          onChange={this.handleNumberChange}
          style={{ width: '65%', marginRight: '3%' }}
        />
        <Select
          value={value.currency}
          size={size}
          style={{ width: '32%' }}
          onChange={this.handleCurrencyChange}
        >
          <Option value="pkr">PKR</Option>
        </Select>
      </span>
    );
  }
}




class EcommerceForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fileList: [],
      previewVisible: false,
      previewImage: '',
      data: "",
      btnDisabeld: false,
      mgs: '',
      loader: false,
      objectId: '',
      product: '',
      category: [],
      sizes: [],
      quantity: 0,
      price: { number: 0, currency: 'pkr' },
      salePrice: { number: 0, currency: 'pkr' },
      materialType: '',
      description: '',
      auther: '',
      productData: "",
      goProductDetailPage: false,
      producId: ''
    }
  }


  componentDidMount() {
    let data = this.props.data;
    if (data) {
      this.setState({
        data: data
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // this.handleEvent(values)
        this.setState({
          loader: true,
          btnDisabeld: true
        })
        this.funcForUpload(values)
        console.log(values, 'values')
      }
    });
  }

  // handleEvent = async (val) => {
  //   console.log(val, "getproducts")

  //   let responseEcommreceData = await HttpUtils.post('postEcomreceProduct', val)
  //   console.log(responseEcommreceData, 'reqProductsObj')
  // }


  checkPrice = (rule, value, callback) => {
    if (value.number > 0) {
      return callback();
    }
    callback('Price must greater than zero!');
  };


  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });


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

  //-----------------cloudnary function end ------------------//
  async postData(values, response, key) {
    const { data, objectId } = this.state;
    var user = JSON.parse(localStorage.getItem('user'));

    let objOfProduct = {
      product: values.product,
      categories: values.categories,
      sizes: values.sizes,
      quantity: values.quantity,
      price: values.price,
      salePrice: values.salePrice,
      materialType: values.materialType,
      description: values.description,
      auther: values.auther,
      images: response,
      shopId: data.shopId,
      shopName: data.shopTitle,
      user_Id: user._id,
      profileId: user.profileId,
    }
    console.log(response , 'response')
    console.log(objOfProduct , 'objOfProduct')

    let responseEcommreceData = await HttpUtils.post('postYourProduct', objOfProduct)

    if (responseEcommreceData.code == 200) {
      this.setState({
        loader: false,
        btnDisabeld: false,
        mgs: responseEcommreceData.mgs,
        productData: responseEcommreceData.content,
        producId: responseEcommreceData.content._id,
        goProductDetailPage: true
      })
      console.log(responseEcommreceData, 'reqProductsObj')
      let msg = 'Your product is saved successfully.'
      this.openNotification(msg)
    }
    else {
      this.setState({
        loader: false,
        btnDisabeld: false,
        mgs: responseEcommreceData.mgs,
        goProductDetailPage: false,
      })
    }
    let msg = 'Your product is not submit successfully.'
    this.openNotification(msg)
  }


  openNotification(msg) {
    notification.open({
      message: 'Success ',
      description: msg
    });
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    const { previewVisible, previewImage, fileList, btnDisabeld, mgs, loader, product, category, sizes, quantity, salePrice, price, materialType, description, auther, productData, goProductDetailPage , producId} = this.state;

    // if (goProductDetailPage) {
    //   return (
    //     <Redirect to={{ pathname: `/products_DetailStyle/${producId}`, state: productData }} />
    //   )
    // }

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const antIcon = <Icon type="loading" style={{ fontSize: 120 }} spin />;
    return (
      <div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          {/*Product Name*/}
          <Form.Item label="Book Name">
            {getFieldDecorator('product', {
              initialValue: product,
              rules: [{
                required: true,
                message: 'Please enter your product Title!',
                whitespace: true
              }],
            })(<Input />)}
          </Form.Item>

          {/*Category*/}
          {/* <Form.Item label="Select Category">
            {getFieldDecorator('categories', {
              initialValue: category,
              rules: [
                {
                  type: 'array',
                  required: true,
                  message: 'Please select your product category'
                },
              ],
            })(<Cascader options={categories} />)}
          </Form.Item> */}

          {/*Sizes*/}
          {/* <Form.Item label="Select Sizes">
            {getFieldDecorator('sizes', {
              initialValue: sizes,
              rules: [
                { required: true, message: 'Please select your sizes!', type: 'array' },
              ],
            })(
              <Checkbox.Group style={{ width: '100%' }}>
                <Row>
                  <Col span={8}>
                    <Checkbox value="Xtra-Small">Xtra Small</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="Small">Small</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="Medium">Medium</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="Large">Large</Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value="Xrta-Large">Xtra Large</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>,
            )}
          </Form.Item> */}

          {/*Quantity*/}
          <Form.Item label="Select Quantity">
            {getFieldDecorator('quantity', {
              initialValue: quantity,

            })(
              <InputNumber min={1} max={5000} />
            )}

          </Form.Item>

          {/*Pricing*/}
          <Form.Item label="Price">
            {getFieldDecorator('price', {
              initialValue: price,
              rules: [{ validator: this.checkPrice }],
            })(<PriceInput />)}
          </Form.Item>

          {/*Sale Pricing*/}
          <Form.Item label="Sale Price">
            {getFieldDecorator('salePrice', {
              initialValue: salePrice,
              rules: [{ validator: this.checkPrice }],
            })(<PriceInput />)}
          </Form.Item>

          {/*Material type*/}
          {/* <Form.Item label="Material Type">
            {getFieldDecorator('materialType',
              {
                initialValue: materialType,
                rules: [{
                  required: true,
                  message: 'Please enter your material type!',
                  whitespace: true
                }],
              })(<Input />)}
          </Form.Item> */}

          {/*Description*/}
          <Form.Item label="Description">
            {getFieldDecorator('description', {
              initialValue: description,
              rules: [{
                required: true,
                message: 'Please enter your description!',
                whitespace: true
              }],
            })(<TextArea rows={4} />)}
          </Form.Item>


          {/*Color*/}
          <Form.Item label="Book Auther">
            {getFieldDecorator('auther', {
              initialValue: auther,
              rules: [{
                required: true,
                message: 'Please enter your auther name!',
                whitespace: true
              }],
            })(<Input />)}
          </Form.Item>


          {/*Uplaod Images*/}

          <Form.Item label="upload">
            {getFieldDecorator('images', {

            })
              (
                <div className="clearfix">
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                  >
                    {fileList.length >= 8 ? null : uploadButton}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </div>)}
          </Form.Item>


          {/*Button*/}
          {btnDisabeld ?
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button disabled type="primary" htmlType="submit">
                Submit
          </Button>
            </Form.Item>
            :
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          }

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
    );
  }
}

const WrappedEcommerceForm = Form.create({ name: 'register' })(EcommerceForm);

export default WrappedEcommerceForm;