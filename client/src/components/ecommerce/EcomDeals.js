import React, { Component } from 'react';
import './EcomDeals.css'

class DealsEcom extends Component {
  render() {
    return (
      <div className="container" style={{ width: "80%" }}>
        <div className="row">
          <div cl assName="col-md-12">
            <div className="col-md-6 col-sm-12">
              <div className="Dealscard">
                <div className="col-md-6 col-sm-6">
                  <h4 className="textcard"> Accesories on Budget </h4>
                </div>
                <div className="col-md-6 col-sm-6">
                  <img src='./images/ecommerce/81JiWgGRqxL._AC_SY200_.jpg' alt='img' style={{ width: "100%", height: "100%", marginTop: "40px" }} />
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="Dealscard">
                <div className="col-md-6 col-sm-6">
                  <h4 className="textcard"> Explore Our Daily Deals </h4>
                </div>
                <div className="col-md-6 col-sm-6">
                  <img src='./images/ecommerce/download (4).jpg' alt='img' style={{ width: "100%", height: "100%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DealsEcom;
