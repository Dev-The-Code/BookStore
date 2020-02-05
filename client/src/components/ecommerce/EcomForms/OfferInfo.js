import React, { Component } from 'react';
import {
  Form, Input, Select, DatePicker, notification
} from 'antd';
import moment from 'moment';
import './Vitalinfo.css';

const FormItem = Form.Item;
const Option = Select.Option;

class OfferInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      startDate: '',
      date: '',
      salePriceDatesStart: '',
      salePriceDatesEnd: '',
      salePriceDate1: '',
      salePriceDate2: '',
      sellingDate: '',
      restockDate: '',
      offering: '',
      offerInfo: [],
      herfSec: '',
      seller: '',
      condition: '',
      conditionNote: '',
      price: '',
      salePrice: '',
      quantity: '',
      legalDesclaimer: '',
      taxCode: '',
      handlingTime: '',
      importDesignation: '',
      country: '',
      warrantyDescription: '',
      countryLabeled: '',
      datePicker: true
    };
  }

  componentDidMount() {
    let data = this.props.data;
    if (data.product != undefined) {
      this.setState({
        seller: data.seller,
        condition: data.condition,
        conditionNote: data.conditionNote,
        quantity: data.quantity,
        legalDesclaimer: data.legalDesclaimer,
        taxCode: data.taxCode,
        handlingTime: data.handlingTime,
        importDesignation: data.importDesignation,
        country: data.country,
        warrantyDescription: data.warrantyDescription,
        countryLabeled: data.countryLabeled,
        price: data.price,
        salePrice: data.salePrice,

        // salePriceDatesStart: data.salePriceDate1,
        // salePriceDatesEnd: data.salePriceDate2,
        // sellingDate: data.sellingDate,
        // restockDate: data.restockDate,
        // offering: data.offering,
        // datePicker: false
      })
    }
  }
  checkPrice = (rule, value, callback) => {
    if (value.number > 0) {
      callback();
      return;
    }
    callback('Value must greater than zero!');
  }

  // date picker //
  onChange(date, dateString, key) {


    this.setState({
      [key]: dateString,
    })
  }
  //  date picker end //

  validateNumber(rule, value, callback) {
    if (isNaN(value)) {
      callback('Please type Numbers');
    } else {
      callback()
    }
  }

  handleSelectChange = (value) => {
    this.props.form.setFieldsValue({
      note: `Hi, ${value === 'bundle' ? 'part' : 'preorder'}!`,
    });
  }

  handleSubmit(e, key) {
    e.preventDefault();
    if (this.state.herfSec === '') {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.offerInfoData(values, key);
        }
      });
    }
  }

  offerInfoData = (values, key) => {
    let { salePriceDate1, salePriceDate2, sellingDate, restockDate, offering, datePicker } = this.state;
    if (datePicker) {
      values.salePriceDate1 = salePriceDate1;
      values.salePriceDate2 = salePriceDate2;
      values.sellingDate = sellingDate;
      values.restockDate = restockDate;
      values.offering = offering;
    }
    this.props.handleProps(values, 'images');
    this.props.imgStates();
    if (key === 'submit') {
      this.setState({
        herfSec: '#Section3'
      },
        () => {
          document.getElementById('offerInfo').click();
        })
      let msg = 'Your Offer info Form is submited successfully, Kindly fill next form'
      this.openNotification(msg)
    }
    else if (key === 'draft') {
      let msg = 'Your Offer info Form is saved successfully.'
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
    const { getFieldDecorator } = this.props.form;
    const { herfSec, salePriceDatesStart, salePriceDatesEnd, sellingDate, restockDate, offering, datePicker } = this.state;
    return (
      <div className="container" style={{ width: "100%" }}>
        <Form>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-3">
                <div className="vitalbox">
                  <h4> Listing Assitant </h4>
                  <p> Supply enough information tomake the buying decision easy.
                    Please ensure that all products and content comply with our
                    Selling and Policies restrictions including the Restructed
                    products policy </p>
                  <p style={{ textAlign: "center" }}> *Fields are required </p>
                </div>
              </div>
              <div className="col-md-9">
                <div className="vitalbox">
                  <div className="row">
                    {/* seller sku */}
                    <div className="col-md-12">
                      <div className="col-md-4 col-xs-4">
                        <div className="floatright">
                          <label>Seller SKU:</label>
                          <p> (max 250 charcters) </p>
                        </div>
                      </div>
                      <div className="col-md-8 col-xs-4">
                        <FormItem>
                          {getFieldDecorator('seller', {
                            initialValue: this.state.seller,
                            rules: [{
                              required: false, message: 'Please enter seller',
                              whitespace: true
                            }],
                          })(
                            <Input />
                          )}
                        </FormItem>
                        <p className="margin-top">
                          Example: Olympus Camedia C-50 Digital Camera  </p>
                      </div>
                    </div>
                    {/* condition */}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label style={{ marginLeft: "17px" }}> *Condition:</label>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem
                          wrapperCol={{ span: 8 }}
                        >
                          {getFieldDecorator('condition', {
                            initialValue: this.state.condition,
                            defaultValue: Option.initialValue,
                            rules: [{ required: true, message: 'Please select Condition' }],
                          })(
                            <Select
                              placeholder="Select Condition"
                              onChange={this.handleSelectChange}
                            >
                              <Option value="new">New</Option>
                              <Option value="used">Used</Option>
                              <Option value="refurbish">Refurb</Option>
                            </Select>
                          )}
                        </FormItem>
                      </div>
                    </div>
                    {/* condition note */}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label style={{ marginLeft: "96px" }}>Condition Note:</label>
                          <p> (Add your comments about the condition) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('conditionNote', {
                            initialValue: this.state.conditionNote,
                            rules: [{
                              required: false,
                              message: 'Please type Condition Note',
                              whitespace: true
                            }],
                          })(
                            <Input style={{ height: "200px" }} />
                          )}
                        </FormItem>
                        <p className="margin-top">
                          Example: Dust Cover missing,
                        Some scratches on the front. </p>
                      </div>
                    </div>
                    {/* your price */}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Your Price:</label>
                          <p> (Quantity of the item for sale in one package) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('price', {
                            initialValue: this.state.price,
                            rules: [{
                              required: true,
                              message: 'Please enter price',
                              whitespace: true
                            },
                            { validator: this.validateNumber.bind(this) }]
                          })(
                            <Input
                            />
                          )}
                        </FormItem>
                        <p className="margin-top"> Example: 50.00  </p>
                      </div>
                    </div>
                    {/* sale price */}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Sale Price:</label>
                          <p> (A sale price must have a start & end date) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="row">
                          <div className="col-md-4">
                            <FormItem>
                              {getFieldDecorator('salePrice', {
                                initialValue: this.state.salePrice,
                                rules: [{
                                  required: true,
                                  message: 'Please enter Sale Price',
                                  whitespace: true
                                },
                                { validator: this.validateNumber.bind(this) }]
                              })(
                                <Input
                                />
                              )}
                            </FormItem>
                          </div>
                          <div className="col-md-4">
                            {datePicker ? <DatePicker
                              // defaultValue={moment(salePriceDatesStart, dateFormat)} format={dateFormat}
                              // initialValue= {moment(salePriceDatesStart, 'YYYY/MM/DD')}
                              onChange={(date, dateString) =>
                                this.onChange(date, dateString, 'salePriceDate1')}
                            /> :
                              <FormItem>
                                {getFieldDecorator('salePriceDate1', {
                                  initialValue: moment(salePriceDatesStart, 'YYYY/MM/DD'),
                                })(
                                  <DatePicker
                                    onChange={(date, dateString) =>
                                      this.onChange(date, dateString, 'salePriceDate1')}
                                  />
                                )}
                              </FormItem>
                            }
                          </div>
                          <div className="col-md-4">
                            {datePicker ?
                              <DatePicker onChange={(date, dateString) =>
                                this.onChange(date, dateString, 'salePriceDate2')} />
                              :

                              <FormItem>
                                {getFieldDecorator('salePriceDate2', {
                                  initialValue: moment(salePriceDatesEnd, 'YYYY/MM/DD'),
                                })(
                                  <DatePicker onChange={(date, dateString) =>
                                    this.onChange(date, dateString)} />
                                )}
                              </FormItem>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* quantity */}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>*Quantity:</label>
                          <p> (Quantity of the item for sale in one package) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="row" style={{ padding: "0" }}>
                          <div className="col-md-12">
                            <div className="col-md-4">
                              <FormItem>
                                {getFieldDecorator('quantity', {
                                  initialValue: this.state.quantity,
                                  rules: [{
                                    required: true,
                                    message: 'Please enter a quantity',
                                    whitespace: true
                                  },
                                  { validator: this.validateNumber.bind(this) }]
                                })(
                                  <Input
                                  />
                                )}
                              </FormItem>
                            </div>
                            <div className="col-md-8">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* legal Desclaimer */}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Legal Desclaimer:</label>
                          <p> (In order to comply with guidlines,) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('legalDesclaimer', {
                            initialValue: this.state.legalDesclaimer,
                            rules: [{
                              required: true,
                              message: 'Please type Legal Desclaimer',
                              whitespace: true
                            }],
                          })(
                            <Input style={{ height: "200px" }} />
                          )}
                        </FormItem>
                        <p className="margin-top">
                          Example: Must be at least 18
                        & over to purchase  </p>
                      </div>
                    </div>
                    {/* tax code */}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>Tax Code:</label>
                          <p> (Opptional: applies if you enable
                            Pak Jazba tax collection service,) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="row" style={{ padding: "0" }}>
                          <div className="col-md-12">
                            <div className="col-md-4">
                              <FormItem>
                                {getFieldDecorator('taxCode', {
                                  initialValue: this.state.taxCode,
                                  rules: [{
                                    required: false,
                                    message: 'Please enter Tax Code',
                                    whitespace: true
                                  }],
                                })(
                                  <Input style={{ marginLeft: "-14px" }} />
                                )}
                              </FormItem>
                            </div>
                            <div className="col-md-8">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* handling in time */}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Handling time (in Days):</label>
                          <p> (Default is 1-2 days) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="row" style={{ padding: "0" }}>
                          <div className="col-md-12">
                            <div className="col-md-4">
                              <FormItem>
                                {getFieldDecorator('handlingTime', {
                                  initialValue: this.state.handlingTime,
                                  rules: [{
                                    required: true,
                                    message: 'Please enter Handling time',
                                    whitespace: true
                                  },
                                  { validator: this.validateNumber.bind(this) }]
                                })(
                                  <Input
                                  />
                                )}
                              </FormItem>
                            </div>
                            <div className="col-md-8">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* start selling date */}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>Start selling date:</label>
                          <p> (color of the lense in the item) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        {datePicker ?
                          <FormItem>
                            <div>
                              <DatePicker onChange={(date, dateString) =>
                                this.onChange(date, dateString, 'sellingDate')} />
                            </div>
                          </FormItem>
                          :
                          <FormItem>
                            {getFieldDecorator('sellingDate', {
                              initialValue: moment(sellingDate, 'YYYY/MM/DD'),
                            })(
                              <DatePicker onChange={(date, dateString) =>
                                this.onChange(date, dateString)} />
                            )}
                          </FormItem>
                        }
                        <p className="margin-top"> Example: Blue, orange  </p>
                      </div>
                    </div>
                    {/* restock date */}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label> Restock date:</label>
                          <p> (mm/dd/yyyy) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        {datePicker ?
                          <FormItem>
                            <div>
                              <DatePicker onChange={(date, dateString) =>
                                this.onChange(date, dateString, 'restockDate')}
                              />
                            </div>
                          </FormItem>
                          :
                          <FormItem>
                            {getFieldDecorator('restockDate', {
                              initialValue: moment(restockDate, 'YYYY/MM/DD'),
                            })(
                              <DatePicker onChange={(date, dateString) =>
                                this.onChange(date, dateString)} />
                            )}
                          </FormItem>
                        }

                        <p className="margin-top"> Example: Blue, orange  </p>
                      </div>
                    </div>
                    {/* import designation */}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label> Import Designation:</label>
                          <p> (If made is USA from imported materials select
                            "Made in USA" If made out side of USA select "IMPORTED")</p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem
                          wrapperCol={{ span: 8 }}
                        >
                          {getFieldDecorator('importDesignation', {
                            initialValue: this.state.importDesignation,
                            defaultValue: Option.initialValue,
                            rules: [{ required: false, message: 'Please select Import Designation' }],
                          })(
                            <Select
                              placeholder="Select Import Designation"
                              onChange={this.handleSelectChange}
                            >
                              <Option value="USA">USA</Option>
                              <Option value="imported">IMPORTED</Option>
                            </Select>
                          )}
                        </FormItem>
                      </div>
                    </div>
                    {/* country of publication */}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>* Country of Publication:</label>
                          <p> (the country in which  the product was published) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="row" style={{ padding: "0" }}>
                          <div className="col-md-12">
                            <div className="col-md-5">
                              <FormItem>
                                {getFieldDecorator('country', {
                                  initialValue: this.state.country,
                                  rules: [{
                                    required: true,
                                    message: 'Please enter country',
                                    whitespace: true
                                  }],
                                })(
                                  <Input style={{ marginLeft: "-14px" }} />
                                )}
                              </FormItem>
                              <p className="margin-top">  Example: England, Germany  </p>
                            </div>
                            <div className="col-md-7">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* seller warranty description */}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label>Seller Warranty Description:</label>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <FormItem>
                          {getFieldDecorator('warrantyDescription', {
                            initialValue: this.state.warrantyDescription,
                            rules: [{
                              required: false, message:
                                'Please enter Seller Warranty',
                              whitespace: true
                            }],
                          })(
                            <Input style={{ height: "200px" }} />
                          )}
                        </FormItem>
                      </div>
                    </div>
                    {/* ofeering release date */}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label> Offering Release Date:</label>
                        </div>
                      </div>
                      <div className="col-md-8">
                        {datePicker ?
                          <FormItem>
                            <div >
                              <DatePicker
                                onChange={(date, dateString) =>
                                  this.onChange(date, dateString, 'offering')}
                              />
                            </div>
                          </FormItem>
                          :
                          <FormItem>
                            {getFieldDecorator('offering', {
                              initialValue: moment(offering, 'YYYY/MM/DD'),
                            })(
                              <DatePicker onChange={(date, dateString) =>
                                this.onChange(date, dateString)} />
                            )}
                          </FormItem>
                        }
                        <p className="margin-top"> Example: Blue, orange  </p>
                      </div>
                    </div>
                    {/* country as labelled */}
                    <div className="col-md-12">
                      <div className="col-md-4">
                        <div className="floatright">
                          <label> Country as labeled:</label>
                          <p> (Complete only if import Designation is
                            "imported" select country shown on product label) </p>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="row" style={{ padding: "0" }}>
                          <div className="col-md-12">
                            <div className="col-md-5">
                              <FormItem>
                                {getFieldDecorator('countryLabeled', {
                                  initialValue: this.state.countryLabeled,
                                  rules: [{
                                    required: false,
                                    message: 'Please enter Country label',
                                    whitespace: true
                                  }],
                                })(
                                  <Input style={{ marginLeft: "-14px" }} />
                                )}
                              </FormItem>
                            </div>
                            <div className="col-md-7">
                            </div>
                          </div>
                        </div>
                      </div>
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
                <a href={herfSec} aria-controls="profile" role="tab" data-toggle="tab" id='offerInfo'>
                  Next
                </a>
              </button>
            </div>
          </div>
          <div className="col-md-3">
          </div>
        </div>
      </div>
    );
  }
}

const WrappedBusinessForm = Form.create()(OfferInfo);
export default WrappedBusinessForm;
