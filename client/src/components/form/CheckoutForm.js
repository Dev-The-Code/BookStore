import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { HttpUtils } from "../../Services/HttpUtils";

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: 'hello'
        }
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.data !== this.props.data) {
            this.setState({ receivedData: this.props.data });
        }
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    async submit(ev) {
        const { receivedData } = this.state;
        let { token, error } = await this.props.stripe.createToken({ name: receivedData.firstName });

        if (error === undefined || token) {
            let response = await HttpUtils.post("charge", {
                method: "POST",
                headers: { "Content-Type": "text/plain" },
                body: {
                    token: token.id,
                    email: receivedData.email,
                    amount: receivedData.total,
                    name: receivedData.firstName
                }
            });
            this.props.onChange(response);
        } else {
            this.props.onError(error.message);
        }
    }

    render() {
        return (
            <div className="checkout">
                <CardElement />
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);
