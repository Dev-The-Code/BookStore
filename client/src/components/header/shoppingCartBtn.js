import React, { Component } from 'react';
import './shoppingCartStyle.css';

class CartButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cartCounting: 0
        }
    }
    componentWillMount() {
        const addToCartData = JSON.parse(localStorage.getItem('addToCart'));
        var count = 0;
        if (addToCartData) {
            for (var i = 0; i < addToCartData.length; i++) {
                count = count + addToCartData[i].cartCount
                this.setState({
                    cartCounting: count
                })
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        const { cartCounting } = this.state;
        let count = nextProps.cartCount + cartCounting;
        this.setState({
            cartCounting: count
        })
    }
    render() {
        const { cartCounting } = this.state;
        return (
            <div>
                <div className="shoppingCart fa fa-shopping-cart">
                    <div className="badge shoppingBadges">{cartCounting}</div>
                </div>
            </div>
        )
    }
}
export default CartButton;
