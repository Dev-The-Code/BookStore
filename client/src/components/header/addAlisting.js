import React, { Component } from 'react';
import './addAlisting.css';
import Burgermenu from '../header/burgermenu';
import Footer from '../footer/footer';
import HeaderMenu from './headermenu';

import { Menu, Dropdown, Button } from 'antd';
import { Link } from 'react-router-dom';

class AddListing extends Component{

    render(){
        const menu = (
            <Menu >
                <Menu.Item>
                    <Link rel="noopener noreferrer" to={`/shopForm`}>Create Shop</Link>
                </Menu.Item>
            </Menu>
        );
        return(
            <div>
                <HeaderMenu/>
                
                <div className="container" >
                    <div className="col-lg-12 col-md-12 col-sm-12 hidden-xs" style={{textAlign: 'center',marginTop: '17vh'}}>
                        <h1>Create a listing</h1>
                        <p>What type of listing would you like to add?</p>
                    </div>
                    <div className="visible-xs" style={{textAlign: 'center',marginTop: '2vh'}}>
                        <h1>Create a listing</h1>
                        <p>What type of listing would you like to add?</p>
                    </div>
                    <div className="row">
                        <Link rel="noopener noreferrer" to={`/shopForm`}>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 flip-card">
                                <div className="devCard flip-card-inner">
                                    <div className="flip-card-front">
                                        <div className="iconDev6">
                                            <img className="iconDevImg" src="images/post-your-need-images/ecommerce.png" alt='img'/>
                                        </div>
                                        <h4 className="needPost-Head">Creat Shop</h4>
                                    </div>
                                    <div className="flip-card-back">
                                        <div className="flip-card-back-child-dev6">
                                            <h4 className="needPost-Head">Creat Shop</h4>
                                        </div>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        </Link>
                    </div>
                </div>
                <Footer />  
            </div>
        )
    }
}
export default AddListing;