import React, { Component } from 'react';
import { Icon } from 'antd';
import './profileDetail.css';
import ProfileTabs from './profileTabs';
import { isMobile, isTablet, isBrowser } from 'react-device-detect';
import ProfileContactDisplay from './profileContactDisplay';


class ProfileDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            location: '',
            description: '',
            twitterlink: '',
            facebooklink: '',
            imageurl: '',
            reviewProfile: false,
        }
    }
    onGoBack() {
        this.props.callPublicSection();
    }
    render() {
        const { imageurl, name, location, description, reviewProfile } = this.props.profileDetail.profileDetail;
        return (
            <div className="container">  {/*style={{ width: "90%" }}*/}
                <div className="row" >
                    <div className="col-md-4 col-sm-2 ImageCard">

                        <img className="ImageCard" src={imageurl ? imageurl : '../images/images.jpg'} style={{ width: "100%" }} />
                    </div>
                    <div className="col-md-1 col-sm-1"></div>
                    <div className="col-md-7 col-sm-9 ImageCard">
                        <h2> Hi, {name}
                            {reviewProfile && <Icon
                                type="edit" size={16}
                                style={{ marginLeft: '10%', cursor: 'pointer' }}
                                onClick={() => { this.onGoBack() }}>
                            </Icon>}
                        </h2>
                        <hr className="horizontaildetail" />
                        <div className="row" style={{ padding: "0" }}>
                            <div className="col-md-6">
                                <p className="detailpara"> Join Date 19-2-2018 </p>
                            </div>
                            <div className="col-md-6">
                                <p className="detailpara">
                                    <span className="glyphicon glyphicon-map-marker" style={{ color: "#008080", margin: "2px" }}></span>
                                    <span style={{ color: "black" }}>
                                        {location}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <p className="detailpara">{description}</p>
                        <div className="row">
                            <div className="col-md-6">
                                {/* <ProfileTabs /> */}
                            </div>
                            {/* <div className="col-md-6">
                                {fb && 
                                <a href={facebooklink} target="_blank" className="fa fa-facebook"></a>
                                 }
                                {twitter && 
                                <a href={twitterlink} target="_blank" className="fa fa-twitter"></a>
                                } 
                            </div> */}

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileDetail;
