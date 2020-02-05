import React, { Component } from 'react';
import HeaderMenu from '../../header/headermenu';
import Footer from '../../footer/footer';
import { Link } from "react-router-dom";
import EightEcom from './eightEcom';
import FourEcom from './fourEcom';
import { isMobile, isTablet, isBrowser } from 'react-device-detect';
import { Tabs, Radio } from 'antd';
const { TabPane } = Tabs;

// import { isMobile } from 'react-device-detect';


class EcomDetail extends Component{
  render(){
    return(
      <div className="">
        <HeaderMenu/>
        <div className="row jobdetail-page" style={{ marginTop:"100px"}}>
        </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-3" style={{backgroundColor:"whitesmoke"}}>
                  <div className="row">
                    <h2 style={{fontWeight: '700', marginLeft:'15px'}}>Filters</h2>
                    <FourEcom/>
                  </div>
              </div>
              <div className="col-md-9">
                <EightEcom/>
              </div>
            </div>
          </div>
       
      </div>
    )
  }
}

export default EcomDetail;
