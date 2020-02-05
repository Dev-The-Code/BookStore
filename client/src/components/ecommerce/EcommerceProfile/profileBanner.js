import React, { Component } from 'react';
import './profileBanner.css'
import { isMobile, isTablet, isBrowser } from 'react-device-detect';


class ProfileBanner extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { shopData } = this.props;

        return (
            <div className="">
                <div className="profileBanner">
                    <img alt='img' src={shopData.bannerPhotoSrc} style={{ width: "100%", height: '450px' }} />
                </div>
            </div>
        )
    }
}

export default ProfileBanner;