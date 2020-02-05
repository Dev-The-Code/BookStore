import React, { Component } from 'react';
import {
  Checkbox, Form, Input, Row,
  Col, Icon, notification
} from 'antd';
import './keywordforms.css'
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group;

class KeywordsForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      intendedUsekeyWords: [],
      targetAudience: [],
      subjectMatter: [],
      intendedUse: '',
      searchTerms: '',
      platinumKeywords: ''
    }
  }


  componentDidMount() {
    let data = this.props.data;
    const { intendedUsekeyWords, targetAudience, subjectMatter } = this.state;
    if (data.IntendedUsekeyWords != undefined) {
      for (var i = 0; i < data.IntendedUsekeyWords.length; i++) {
        intendedUsekeyWords.push(data.IntendedUsekeyWords[i])
      }
      for (var i = 0; i < data.targetAudience.length; i++) {
        targetAudience.push(data.targetAudience[i])
      }
      for (var i = 0; i < data.subjectMatter.length; i++) {
        subjectMatter.push(data.subjectMatter[i])
      }
      this.setState({
        intendedUse: data.intendedUse,
        searchTerms: data.searchTerms,
        platinumKeywords: data.platinumKeywords,
        targetAudience: [...targetAudience],
        subjectMatter: [...subjectMatter],
        intendedUsekeyWords: [...intendedUsekeyWords]
      })
    }
  }

  handleSubmit(e, key) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handleProps(values);
        if (key === 'submit') {
          let msg = 'Your keyword & product detail is submited successfully, Kindly visit your profile!'
          this.openNotification(msg)
        }
        else if (key === 'draft') {
          let msg = 'Your keyword & product detail is saved successfully.'
          this.openNotification(msg)
        }
        this.props.redirectPage();
      }
    });
  }
  openNotification(mgs) {
    notification.open({
      message: 'Success ',
      description: mgs,
    });
  };

  onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  }

  onChangekeyWords(checkedValues) {
    this.setState({ intendedUsekeyWords: checkedValues });
  }

  checkCheckBox = (rule, value, callback) => {
    if (!value) {
      callback('Please check at least one!');
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form,
      antIcon = <Icon type="loading" style={{ fontSize: 24, marginRight: '10px' }} spin />;

    return (
      <div className="container" style={{ width: "100%" }}>
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
              <Form onSubmit={this.handleSubmit}>
                <div className="vitalbox">
                  <div className="row">
                    <div className="col-md-5">
                      <div className="descriptionright">
                        <h4> Intended Use: </h4>
                        <p> (For what activities, events, loaction,
                        or condition is this product intended to use?) </p>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <h4> Choose up to 5 terms to Contribute</h4>
                      <div className="row" style={{ padding: "0px" }}>
                        <div className="col-md-6">
                          <FormItem
                          >
                            {getFieldDecorator('IntendedUsekeyWords', {
                              initialValue: this.state.intendedUsekeyWords,
                              defaultValue: Option.initialValue,
                              rules: [{ validator: this.checkCheckBox }],
                            })(
                              <CheckboxGroup style={{ width: '100%' }}
                                setFieldsValue={this.state.intendedUsekeyWords}
                                onChange={this.onChangekeyWords.bind(this)}
                              >
                                <Row>
                                  <Checkbox value="Gym/Fitness Center">Gym/Fitness Center</Checkbox>
                                  <Col >
                                  </Col>
                                  <Col >
                                    <Checkbox value="Swimming Pool">Swimming Pool</Checkbox>
                                  </Col>
                                  <Col >
                                    <Checkbox value="Car Park">Car Park</Checkbox>
                                  </Col>
                                  <Col >
                                    <Checkbox value="Visitors Parking">Visitors Parking</Checkbox>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col >
                                    <Checkbox value="Power Backup">Power Backup</Checkbox>
                                  </Col>
                                  <Col
                                  ><Checkbox value="Garbage Disposal">Garbage Disposal</Checkbox>
                                  </Col>
                                  <Col >
                                    <Checkbox value="Private Lawn">Private Lawn</Checkbox>
                                  </Col>
                                  <Col >
                                    <Checkbox value="Water Heater Plant">Water Heater Plant</Checkbox>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col >
                                    <Checkbox value="Security System">Security System</Checkbox>
                                  </Col>
                                  <Col >
                                    <Checkbox value="Laundry Service">Laundry Service </Checkbox>
                                  </Col>
                                  <Col >
                                    <Checkbox value="Elevator">Elevator</Checkbox>
                                  </Col>
                                  <Col >
                                    <Checkbox value="Club House">Club House</Checkbox>
                                  </Col>
                                </Row>
                              </CheckboxGroup>
                            )}
                          </FormItem>
                        </div>
                      </div>
                      <p style={{ marginTop: "15px", marginBottom: "0px" }}>Provide your own term</p>
                      <FormItem
                      >
                        {getFieldDecorator('intendedUse', {
                          initialValue: this.state.intendedUse,
                          rules: [{
                            required: false,
                            message: 'Please enter your intended Use',
                            whitespace: true
                          }],
                        })(
                          <Input />
                        )}
                      </FormItem>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-5">
                      <div className="descriptionright">
                        <h4> Target Audience: </h4>
                        <p> (For whom is the product intended?) </p>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <h4> Choose up to 5 terms to Contribute</h4>
                      <div className="row" style={{ padding: "0px" }}>
                        <div className="col-md-6">
                          <FormItem
                          >
                            {getFieldDecorator('targetAudience', {
                              initialValue: this.state.targetAudience,
                              defaultValue: Option.initialValue,
                              rules: [{ validator: this.checkCheckBox }],
                            })(
                              <CheckboxGroup style={{ width: '100%' }}
                                setFieldsValue={this.state.targetAudience}
                                onChange={this.onChangekeyWords.bind(this)}
                              >
                                <Row>
                                  <Col >
                                    <Checkbox value="Gym/Fitness Center">Gym/Fitness Center</Checkbox>
                                  </Col>
                                  <Col >
                                    <Checkbox value="Swimming Pool">Swimming Pool</Checkbox>
                                  </Col>
                                  <Col >
                                    <Checkbox value="Car Park">Car Park</Checkbox>
                                  </Col>
                                  <Col >
                                    <Checkbox value="Visitors Parking">Visitors Parking</Checkbox>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col >
                                    <Checkbox value="Power Backup">Power Backup</Checkbox>
                                  </Col>
                                  <Col
                                  ><Checkbox value="Garbage Disposal">Garbage Disposal</Checkbox>
                                  </Col>
                                  <Col >
                                    <Checkbox value="Private Lawn">Private Lawn</Checkbox>
                                  </Col>
                                  <Col >
                                    <Checkbox value="Water Heater Plant">Water Heater Plant</Checkbox>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col >
                                    <Checkbox value="Security System">Security System</Checkbox>
                                  </Col>
                                  <Col >
                                    <Checkbox value="Laundry Service">Laundry Service </Checkbox>
                                  </Col>
                                  <Col >
                                    <Checkbox value="Elevator">Elevator</Checkbox>
                                  </Col>
                                  <Col >
                                    <Checkbox value="Club House">Club House</Checkbox>
                                  </Col>
                                </Row>
                              </CheckboxGroup>
                            )}
                          </FormItem>
                        </div>
                      </div>
                      <p style={{ marginTop: "15px", marginBottom: "0px" }}>Provide your own term</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-5">
                      <div className="descriptionright">
                        <h4> Subject Matter: </h4>
                        <p> (What is the product subject? What is the Product about?)</p>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <h4> Choose up to 5 terms to Contribute</h4>
                      <div className="row" style={{ padding: "0px" }}>
                        <div className="col-md-6">
                          <FormItem
                          >
                            {getFieldDecorator('subjectMatter', {
                              initialValue: this.state.subjectMatter,
                              defaultValue: Option.initialValue,
                              rules: [{ validator: this.checkCheckBox }],
                            })(
                              <CheckboxGroup style={{ width: '100%' }}
                                setFieldsValue={this.state.subjectMatter}
                                onChange={this.onChangekeyWords.bind(this)}
                              >
                                <Row>
                                  <Col >
                                    <Checkbox value="Gym/Fitness Center">Gym/Fitness Center</Checkbox>
                                  </Col>
                                  <Col >
                                    <Checkbox value="Swimming Pool">Swimming Pool</Checkbox>
                                  </Col>
                                  <Col >
                                    <Checkbox value="Car Park">Car Park</Checkbox>
                                  </Col>
                                  <Col >
                                    <Checkbox value="Visitors Parking">Visitors Parking</Checkbox>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col >
                                    <Checkbox value="Power Backup">Power Backup</Checkbox>
                                  </Col>
                                  <Col
                                  ><Checkbox value="Garbage Disposal">Garbage Disposal</Checkbox>
                                  </Col>
                                  <Col >
                                    <Checkbox value="Private Lawn">Private Lawn</Checkbox>
                                  </Col>
                                  <Col >
                                    <Checkbox value="Water Heater Plant">Water Heater Plant</Checkbox>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col >
                                    <Checkbox value="Security System">Security System</Checkbox>
                                  </Col>
                                  <Col >
                                    <Checkbox value="Laundry Service">Laundry Service </Checkbox>
                                  </Col>
                                  <Col >
                                    <Checkbox value="Elevator">Elevator</Checkbox>
                                  </Col>
                                  <Col >
                                    <Checkbox value="Club House">Club House</Checkbox>
                                  </Col>
                                </Row>
                              </CheckboxGroup>
                            )}
                          </FormItem>
                        </div>
                      </div>
                      <p style={{ marginTop: "15px", marginBottom: "0px" }}>Provide your own term</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-5">
                      <div className="descriptionright">
                        <h4> Search Terms: </h4>
                        <p> (Provide specific search term to help customers find your product.) </p>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <FormItem
                      >
                        {getFieldDecorator('searchTerms', {
                          initialValue: this.state.searchTerms,
                          rules: [{
                            required: false,
                            message: 'Please enter your Search Terms',
                            whitespace: true
                          }],
                        })(
                          <Input />
                        )}
                      </FormItem>
                      <p> Example: dark Chocolate, Apple, Cookies </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-5">
                      <div className="descriptionright">
                        <h4> Platinum Keywords: </h4>
                        <p> (For Platinum Merchants only) </p>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <FormItem
                      >
                        {getFieldDecorator('platinumKeywords', {
                          initialValue: this.state.platinumKeywords,
                          rules: [{
                            required: false,
                            message: 'Please enter your Platinum Keywords',
                            whitespace: true
                          }],
                        })(
                          <Input />
                        )}
                      </FormItem>
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
                      Submit
              </button>
                  </div>
                </div>
                <div className="col-md-3">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const WrappedBusinessForm = Form.create()(KeywordsForm);
export default WrappedBusinessForm;