import React, { Component } from 'react';
import './shopCard.css';
import { Rate} from 'antd';
import { isMobile, isTablet, isBrowser } from 'react-device-detect';

class ShopCard extends Component{
    render(){
        return(
            <div className="container" style={{padding:'0px', width:'100%'}}>
                <div className="row">
                    <div className="col-md-12" style={isMobile ? {padding: "0px"} : {padding:"15px"}}>
                        <div className="col-md-3 col-sm-4">
                            <div className="storecardopacity" style={{ cursor: 'pointer' }}>
                                <div className="shopstorecard" >
                                    <img alt='' src='/images/ecommerce/61Yeir0uhIL._AC_SY200_.jpg'/>
                                </div>
                                <h4 style={{ marginTop: "20px", textAlign: "left" }}>Hisense Store</h4>
                                <p> Time Square, NY</p>
                                <div className='row' style={{padding:'0'}}>
                                    <div className='col-md-8 col-xs-8'>
                                        <Rate  style={{paddingBottom: '20px', marginTop:"-20px",fontFamily: 'Source Sans Pro, sans-serif'}} allowHalf value={4.5}/>
                                    </div>
                                </div>
                                <div class="overlay"></div>
                                <div class="button"><a href="#"> BUTTON </a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ShopCard; 
