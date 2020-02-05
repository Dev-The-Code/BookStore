import React, { Component } from 'react';
import './ecomNine.css';
import { Rate } from 'antd';
import { Link } from "react-router-dom";



class EcomNine extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { allProducts, filterDataShow, filteredData, filterDataNotFound, categoriesName, removeCategories } = this.props;
        return (
            <div className="container" style={{ padding: '0px', width: '100%' }}>
                {categoriesName.length > 0 ?
                    <div>
                        <li>{categoriesName[0]}<span class="close"
                            onClick={removeCategories.bind(this, 'categories')}>x</span></li>
                    </div> : null}
                {/* <div className="row">
                    <div className="col-md-12" style={isMobile ? { padding: "0px" } : { padding: "15px" }}>
                        <div className="col-md-3 col-sm-4">
                            <div className="sellercardopacity" style={{ cursor: 'pointer' }}>
                                <div className="overlay1">
                                    <div className="sellerstorecard" >
                                        <img alt='' src='/images/ecommerce/61Yeir0uhIL._AC_SY200_.jpg' />
                                    </div>
                                    <h4 style={{ marginTop: "20px", textAlign: "left" }}>Hisense AC 1.5 ton</h4>
                                    <p> Rs. 65000</p>
                                    <div className='row' style={{ padding: '0' }}>
                                        <div className='col-md-8 col-xs-8'>
                                            <Rate style={{ paddingBottom: '20px', marginTop: "-20px", fontFamily: 'Source Sans Pro, sans-serif' }} allowHalf value={4.5} />
                                        </div>
                                        <div className="vol-md-4 col-xs-4">
                                            <p style={{ marginTop: '0', color: '#D3D3D3', marginLeft: '0px' }}>Huston</p>
                                        </div>
                                    </div>
                                    <div class="middle">
                                        <div class="text">John Doe</div>
                                    </div>
                                </div>

                                {/* <div class="button"><a href="#"> BUTTON </a></div> 
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-4">
                            <div className="sellercardopacity" style={{ cursor: 'pointer' }}>
                                <div className="sellerstorecard" >
                                    <img alt='' src='/images/ecommerce/61Yeir0uhIL._AC_SY200_.jpg' />
                                </div>
                                <h4 style={{ marginTop: "20px", textAlign: "left" }}>Hisense AC 1.5 ton</h4>
                                <p style={{ color: "#37a99b", textAlign: 'left', fontWeight: '600', marginLeft: '15px' }}> Rs. 65000</p>
                                <div className='row' style={{ padding: '0' }}>
                                    <div className='col-md-8 col-xs-8'>
                                        <Rate style={{ paddingBottom: '20px', marginTop: "-20px", fontFamily: 'Source Sans Pro, sans-serif' }} allowHalf value={4.5} />
                                    </div>
                                    <div className="vol-md-4 col-xs-4">
                                        <p style={{ marginTop: '0', color: '#D3D3D3', marginLeft: '0px' }}>Huston</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-4">
                            <div className="sellercardopacity" style={{ cursor: 'pointer' }}>
                                <div className="sellerstorecard" >
                                    <img alt='' src='/images/ecommerce/61Yeir0uhIL._AC_SY200_.jpg' />
                                </div>
                                <h4 style={{ marginTop: "20px", textAlign: "left" }}>Hisense AC 1.5 ton</h4>
                                <p style={{ color: "#37a99b", textAlign: 'left', fontWeight: '600', marginLeft: '15px' }}> Rs. 65000</p>
                                <div className='row' style={{ padding: '0' }}>
                                    <div className='col-md-8 col-xs-8'>
                                        <Rate style={{ paddingBottom: '20px', marginTop: "-20px", fontFamily: 'Source Sans Pro, sans-serif' }} allowHalf value={4.5} />
                                    </div>
                                    <div className="vol-md-4 col-xs-4">
                                        <p style={{ marginTop: '0', color: '#D3D3D3', marginLeft: '0px' }}>Huston</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-4">
                            <div className="sellercardopacity" style={{ cursor: 'pointer' }}>
                                <div className="sellerstorecard" >
                                    <img alt='' src='/images/ecommerce/61Yeir0uhIL._AC_SY200_.jpg' />
                                </div>
                                <h4 style={{ marginTop: "20px", textAlign: "left" }}>Hisense AC 1.5 ton</h4>
                                <p style={{ color: "#37a99b", textAlign: 'left', fontWeight: '600', marginLeft: '15px' }}> Rs. 65000</p>
                                <div className='row' style={{ padding: '0' }}>
                                    <div className='col-md-8 col-xs-8'>
                                        <Rate style={{ paddingBottom: '20px', marginTop: "-20px", fontFamily: 'Source Sans Pro, sans-serif' }} allowHalf value={4.5} />
                                    </div>
                                    <div className="vol-md-4 col-xs-4">
                                        <p style={{ marginTop: '0', color: '#D3D3D3', marginLeft: '0px' }}>Huston</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div> */}
                <div className="row">
                    <div className="col-md-12">
                        {filterDataShow ?
                            filteredData && filteredData.map((elem, key) => {
                                return (
                                    <div className="col-md-3 col-sm-4">
                                        <Link rel="noopener noreferrer" to={{ pathname: `/products_DetailStyle/${elem._id}`, state: elem }} >
                                            <div className="sellercardopacity" style={{ cursor: 'pointer' }}>
                                                <div className="sellerstorecard" >
                                                    <img alt='' src={elem.images[0]} />
                                                </div>
                                                <h4 style={{ marginTop: "20px", textAlign: "left" }}>{elem.product}</h4>
                                                <p style={{ color: "#37a99b", textAlign: 'left', fontWeight: '600', marginLeft: '15px' }}> {`Rs.${elem.price}`}</p>
                                                <Rate style={{ paddingBottom: '20px', marginTop: "-20px", fontFamily: 'Source Sans Pro, sans-serif' }} value={elem.averageRateProduct} />
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                            :
                            allProducts && allProducts.map((elem, key) => {
                                return (
                                    <div className="col-md-3 col-sm-4">
                                        <Link rel="noopener noreferrer" to={{ pathname: `/products_DetailStyle/${elem._id}`, state: elem }} >
                                            <div className="sellercardopacity" style={{ cursor: 'pointer' }}>
                                                <div className="sellerstorecard" >
                                                    <img alt='' src={elem.images[0]} />
                                                </div>
                                                <h4 style={{ marginTop: "20px", textAlign: "left" }}>{elem.product}</h4>
                                                <p style={{ color: "#37a99b", textAlign: 'left', fontWeight: '600', marginLeft: '15px' }}> {`Rs.${elem.price}`}</p>
                                                <Rate style={{ paddingBottom: '20px', marginTop: "-20px", fontFamily: 'Source Sans Pro, sans-serif' }} allowHalf value={elem.averageRateProduct} />
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                        {filterDataNotFound && <span style={{ textAlign: "center" }}><h1>Not found....</h1></span>}
                        {filterDataNotFound && <span style={{ textAlign: "center" }}><h5>you can find your search by type</h5></span>}
                    </div>
                </div>
            </div>
        )
    }
}
export default EcomNine;