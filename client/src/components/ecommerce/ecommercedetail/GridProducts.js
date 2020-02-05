import React, { Component } from 'react';
import Burgermenu from '../../header/burgermenu';
import Footer from '../../footer/footer';
import FourEcom from './fourEcom';
import GridView from './GridView';
import { isMobile } from 'react-device-detect';

class GridProducts extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { ecommreceFilterData, searchValue } = this.props.location.state;
    return (
      <div className="">
        <Burgermenu />
        <div className="row jobdetail-page"
          style={isMobile ?
            { backgroundColor: "#37a99b", marginTop: "0px" }
            :
            { backgroundColor: "#37a99b", marginTop: "100px" }}>
          <div className="col-md-12 col-sm-12 col-xs-12"
            style={{ textAlign: "center", marginTop: "25px" }}>
            <div className="">
              <h1 style={{ fontFamily: 'Crimson Text, serif', fontWeight: "bold", color: "white" }}
              >
                {searchValue}
              </h1>
              {/* <p style={{fontFamily: 'Crimson Text, serif', color:"white"}}
              > 
              Shop home entertainment, TVs, home audio, headphones, cameras, assessories and more </p> */}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-3 col-sm-3">
              <FourEcom />
            </div>
            <div className="hidden-md col-sm-1">
            </div>
            <div className="col-md-9 col-sm-8">
              <GridView ecomData={ecommreceFilterData} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default GridProducts;
