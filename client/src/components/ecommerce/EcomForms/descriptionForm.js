import React, { Component } from 'react';
import { Form, Input, notification } from 'antd';
import './descriptionforms.css'

const { TextArea } = Input;
const FormItem = Form.Item;

class DescriptionForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      herfSec: '',
      productFeature: '',
      description: ''
    }
  }

  componentDidMount() {
    let data = this.props.data;
    if (data) {
      this.setState({
        productFeature: data.productFeature,
        description: data.description
      })
    }
  }

  handleSubmit(e, key) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.state.herfSec === '') {
          this.props.handleProps(values, 'keywords')
          this.props.keywordStates()
          if (key === 'submit') {
            this.setState({
              herfSec: '#Section5'
            },
              () => {
                document.getElementById('descForm').click();
              })
            let msg = 'Your description Form is submited successfully, Kindly fill next form'
            this.openNotification(msg)
          }
          else if (key === 'draft') {
            let msg = 'Your description Form is saved successfully.'
            this.openNotification(msg)
          }
        }
      }
    });
  }

  openNotification(msg) {
    notification.open({
      message: 'Success ',
      description: msg
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { herfSec } = this.state
    return (
      <div className="container" style={{ width: "100%" }}>
        <Form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-3">
                <div className="vitalbox">
                  <h4> Listing Assitant </h4>
                  <p> Supply enough information tomake the buying
                    decision easy. Please ensure that all products
                    and content comply with our Selling and Policies
                  restrictions including the Restructed products policy </p>
                  <p style={{ textAlign: "center" }}> *Fields are required </p>
                </div>
              </div>
              <div className="col-md-9">
                <div className="vitalbox">
                  <div className="row">
                    <div className="col-md-5">
                      <div className="descriptionright">
                        <h4> Key Product Features: </h4>
                        <p> (Max.100 charchters per line. use these to
                          highlight soem of the product's most important
                          qualities. each line be displayed as a seperate
                        bullet point above the product description.) </p>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <FormItem>
                        {getFieldDecorator('productFeature', {
                          initialValue: this.state.productFeature,
                          rules: [{
                            required: false,
                            message: 'Please enter Product Feature',
                            whitespace: true
                          }],
                        })(
                          <Input />
                        )}
                      </FormItem>
                      <p> Example: 95 square inches midplus head </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-5">
                      <div className="descriptionright">
                        <h4> Key Product Features: </h4>
                        <p> (Max.200 charchters. Use this to describe
                          the product in detail. Please enter only item
                        condition, and other seller specific info.  ) </p>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <FormItem>
                        {getFieldDecorator('description', {
                          initialValue: this.state.description,
                          rules: [{
                            required: false,
                            message: 'Please enter description',
                            whitespace: true
                          }],
                        })(
                          <Input
                            style={{ width: '100%', height: '10rem' }}
                            type="textarea"
                            autosize={false}
                            rows={6}
                          />
                        )}
                      </FormItem>
                      <p> Example: Featuring the sweet spot suspension
                      system, Price's Triple Threat Bandit tennis racquet offers......... </p>
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
                <a href={herfSec} aria-controls="profile" role="tab" data-toggle="tab" id='descForm'>
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
}

const WrappedBusinessForm = Form.create()(DescriptionForm);
export default WrappedBusinessForm;

