import React, { Component } from 'react';
import './addsearch.css';


class ProductScroll extends Component{
  constructor(props){
    super(props);
    this.state = {
      sub: 'Abaya'
    }
  }


  render(){
    return(
      <div className="productsscroll">
        <span onClick={(e) => this.props.whenClicked(e.target.innerText)}>  Apparel </span>
        <span onClick={(e) => this.props.whenClicked(e.target.innerText)}> Appliances</span>
        <span onClick={(e) => this.props.whenClicked('Arts')}> Arts, Craft & Swing </span>
        <span onClick={(e) => this.props.whenClicked('Musical')}> Musical Instruments Equipment & Accessories</span>
        <span onClick={(e) => this.props.whenClicked('Office')}> Office Products</span>
        <span onClick={(e) => this.props.whenClicked(e.target.innerText)}> Shoes</span>
        <span onClick={(e) => this.props.whenClicked(e.target.innerText)}> Software</span>
        <span onClick={(e) => this.props.whenClicked('Sports')}> Sporting Goods</span>
        <span onClick={(e) => this.props.whenClicked('Tools')}> Tools & Home Improvement</span>
        <span> Video and DVD</span>
        <span> Soccer</span>
        <span> Cricket Bats</span>
        <span> Glovers</span>
      </div>
    )
  }
}

export default ProductScroll;
