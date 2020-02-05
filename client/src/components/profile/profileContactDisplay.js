import React, { Component } from 'react';
import ProfileContact from './profileContact';
import './profileDetail.css';
import { isMobile, isTablet, isBrowser } from 'react-device-detect';
import { Link } from 'react-router-dom'

class ProfileContactDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        const { email, phone, facebooklink, twitterlink } = this.props.profileTabData;
        console.log(facebooklink, 'facebooklink')
        console.log(twitterlink, 'twitterlink')

        return (
            <div className="container">
                <div className="row" style={isTablet ? { marginLeft: "25px" } : { marginLeft: "-15px" }}>
                    <div className="col-md-5">
                    </div>
                    {/* <div className="col-md-1"></div> */}
                    <div className="col-md-7">
                        <div className="Contactprofile" style={isMobile ? { marginTop: "-80px" } : { marginTop: "-130px" }}>
                            <div className="row ImageCard" style={{ width: '' }}>
                                <div className="col-md-9 col-sm-9 col-md-8" style={{ padding: '0px' }}>
                                    <h2 style={{ marginLeft: "0" }}>CONTACT</h2>
                                    <div className="row">
                                        <div className="col-md-3 col-sm-3 col-xs-4" style={{ padding: '0px' }}>
                                            <p style={{ fontSize: "16px", fontWeight: "600", color: "black" }}>Email: </p>
                                            <p style={{ fontSize: "16px", fontWeight: "600", color: "black" }}>Phone: </p>
                                        </div>
                                        <div className="col-md-8 col-sm-9 col-xs-8">
                                            <p className="emailnphone">{email}</p>
                                            <p className="emailnphone">{phone} </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-3 col-md-4">
                                    {/* <Link to={facebooklink}> */}
                                    <a
                                        href={facebooklink}
                                        target="_blank" className="fa fa-facebook"></a>
                                    {/* </Link> */}
                                    <a href={twitterlink} target="_blank" className="fa fa-twitter"></a>

                                </div>
                            </div>
                        </div>

                    </div>
                    {/* <div className="col-md-1"></div> */}
                </div></div>
        )
    }
}

export default ProfileContactDisplay;