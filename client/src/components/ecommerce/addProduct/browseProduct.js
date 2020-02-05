import React, { Component } from 'react';
import ProductScroll from './productsScroll';
import ProductScrolltwo from './productScrolltwo';
import ProductScrollthree from './productScrollthree';
import './addsearch.css';


class BrowseProduct extends Component{
  constructor(props){
    super(props);
    this.state = {
      item: 'Apparel',
      sub: 'Abaya'
    }
  }
  whenClicked = (item) => {
    this.setState({ item })
  }

  whenSecondClicked = (sub) => {
    this.setState({sub})
  }

  render(){
    return(
      <div className="container" style={{width:"70%"}}>
        <div className="addsearchBox">
          <h3> Browse your product Category </h3>
          <p style={{margin:"0"}}> All Product Categories </p>
          <div className="row" style={{padding:"0"}}>
            <div className="col-md-4" style={{margin:"0"}}>
              <div className="addsearchBox">
                <ProductScroll whenClicked={this.whenClicked}/>
              </div>
          </div>
            <div className="col-md-4">
              <div className="addsearchBox">
                <ProductScrolltwo whenSecondClicked={this.whenSecondClicked}
                item={this.state.item}/>
              </div>
            </div>
            <div className="col-md-4">
              <div className="addsearchBox" style={{height:"260px"}}>
                 <ProductScrollthree item={this.state.sub}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BrowseProduct;
