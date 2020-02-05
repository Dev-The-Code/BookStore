import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { HttpUtils } from "../../Services/HttpUtils";
// import succesImg from './images/succes';
import { Modal } from 'antd';
import './checkOutpage.css';

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            succes: false,
            failed: false,
            btnDisabeld: false,
            mgs: ''
        }
        this.submit = this.submit.bind(this);
    }

    async submit() {
        const { chechkOutObj } = this.props;
        let { token, error } = await this.props.stripe.createToken({ name: chechkOutObj.firstName });
        this.setState({
            btnDisabeld: true
        })
        this.props.loaderFunc()
        if (token) {
            chechkOutObj.token = token.id;
        }
        if (error === undefined || token) {

            let res = await HttpUtils.post('postecommercepayment', chechkOutObj);
            this.props.modalsHideAndShow(res)
            if (res.error) {
                this.setState({
                    mgs: res.error,
                    btnDisabeld: false
                })
            }
        }
    }

    render() {
        const { btnDisabeld, mgs } = this.state;
        return (
            <div className="checkout">
                <div className="panel-body">
                    <div className="panel panel-default">
                        <div className="bold_c_text" style={{ backgroundColor: '#37a99b', color: 'white', padding: '8px', fontFamily: 'Crimson Text, serif !important' }}>
                            <icon type="info-circle" />
                            <span className="margin_font_location">Credit Card Details</span>
                        </div>
                        <div className="container" style={{ width: '90%' }}>
                            <section>
                                <div className="row" style={{ paddingBottom: '0px' }}>
                                    <div className="col-md-12">
                                        <div className="col-md-7"></div>
                                        <div className="col-md-5">
                                            <span>Pay Using Credit Card.</span>
                                            <span style={{ marginLeft: "10px" }}>
                                                <img src='../images/master visa.png' style={{ height: "35px" }} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row" style={{ paddingTop: '0px' }}>
                                    <div className="col-md-12">
                                        <div className="col-md-8">
                                            <label style={{ fontSize: "initial" }}> Credit Card Number* </label>
                                            <div style={{ border: '1px solid gray', height: '35px', borderRadius: '5px', padding: '8px' }}>
                                                <CardElement />
                                            </div>
                                        </div>
                                        <div className="col-md-4" ></div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        {btnDisabeld ? <button
                            className='checkoutbtn ant-btn post_need'
                            disabled
                            onClick={this.submit}>Purchase</button> :
                            <button
                                className='checkoutbtn ant-btn post_need'
                                onClick={this.submit}>Purchase</button>}
                    </div>
                    <div className="col-md-12">
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            {mgs.length > 0 && <p style={{ marginTop: '20px', fontWeight: 'bold', color: 'red' }}>{mgs}</p>}
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);