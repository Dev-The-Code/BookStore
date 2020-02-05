import React, { Component } from 'react';
import './ecomadditionalcard.css'

class Additionalcard extends Component {
  render() {
    return (
      <div className="container" style={{ width: "95%" }}>
        <div className="row" style={{ marginTop: "20px" }}>
          <span>
            <h3 className="" style={{ fontWeight: "bold", textAlign: "left", marginLeft: "15px" }}> Additional Items to explore  </h3>
          </span>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-3 col-sm-4">
              <div className="ecomshopcard" style={{ cursor: 'pointer' }}>
                <div className="ecomcard" >
                  <img alt='' src='./images/ecommerce/DURM-2309B35A28833317._V535730076_.jpg' />
                </div>
                <button type="button" className="btn btn-sm btn2-success font-style" style={{ width: "100%" }}>Shop Now</button>
              </div>
            </div>
            <div className="col-md-3 col-sm-4">
              <div className="ecomshopcard" style={{ cursor: 'pointer' }}>
                <div className="ecomcard" >
                  <img alt='' src='./images/ecommerce/51SqUlLAWWL._SCLZZZZZZZ___AC_SY200_.jpg' />
                </div>
                <button type="button" className="btn btn-sm btn2-success font-style" style={{ width: "100%" }}>Shop Now</button>
              </div>
            </div>
            <div className="col-md-3 col-sm-4">
              <div className="ecomshopcard" style={{ cursor: 'pointer' }}>
                <div className="ecomcard" >
                  <img alt='' src='./images/ecommerce/DURM-230DD6D6594D9C14._V535729156_.jpg' />
                </div>
                <button type="button" className="btn btn-sm btn2-success font-style" style={{ width: "100%" }}>Shop Now</button>
              </div>
            </div>
            <div className="col-md-3 col-sm-4">
              <div className="ecomshopcard" style={{ cursor: 'pointer' }}>
                <div className="ecomcard" >
                  <img alt='' src='./images/ecommerce/81JiWgGRqxL._AC_SY200_.jpg' />
                </div>
                <button type="button" className="btn btn-sm btn2-success font-style" style={{ width: "100%" }}>Shop Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Additionalcard;
