import React, { Component } from 'react';
import HeaderMenu from '../../header/headermenu';
import Footer from '../../footer/footer';
import EcommerceForm from './ecommerceforms';
// import Slider from '../../header/Slider';
// import KeywordsForm from './keywordsForm';
// import EcomTabs from './EcomTabs';
// import NewForm from './new_form';
// import VitalInfo from './EvitalInfo';
// import OfferInfo from './OfferInfo';
import './ecomform.css'
import { isMobile, isTablet, isBrowser } from 'react-device-detect';

class EcomForms extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="">
        <HeaderMenu />
        <div className="row jobdetail-page" style={isMobile ? { marginTop: "0px" } : { marginTop: "100px" }}>
          <div className="col-md-12 col-sm-12 col-xs-12" style={{ textAlign: "center", marginTop: "25px" }}>
            <div className="container">
              <h1 style={{ fontFamily: 'Crimson Text, serif', fontWeight: "bold", color: "#D9A67E" }}>Add Your Product</h1>
            </div>
          </div>
        </div>
        <div className="container">
          {/* <EcomTabs data={this.props.location.state} /> */}
          <EcommerceForm data={this.props.location.state}/>
        </div>
        <Footer />
      </div>
    )
  }
}
export default EcomForms;
