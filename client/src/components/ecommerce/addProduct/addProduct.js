import React, { Component } from 'react';
import Burgermenu from '../../header/burgermenu';
import AddSearch from './addSearch';
import BrowseProduct from './browseProduct';
import { isMobile, isTablet, isBrowser } from 'react-device-detect';


class AddProduct extends Component{
  render(){
    return(
      <div>
        <Burgermenu/>
        <div className="row jobdetail-page" style={ isMobile ? {backgroundColor:"#37a99b", marginTop:"0px"} : {backgroundColor:"#37a99b", marginTop:"100px"} }>
            <div className="col-md-12 col-sm-12 col-xs-12" style={{textAlign:"center", marginTop:"25px"}}>
                <div className="">
                  <h1 style={{fontFamily: 'Crimson Text, serif', fontWeight:"bold", color:"white"}}>Add tp Products</h1>
                  <p style={{fontFamily: 'Crimson Text, serif', color:"white"}}> PakJazba IS the Best0  </p>
                </div>
            </div>
        </div>
        <div>
          <AddSearch/>
          <BrowseProduct/>
        </div>
      </div>
    )
  }
}

export default AddProduct;
