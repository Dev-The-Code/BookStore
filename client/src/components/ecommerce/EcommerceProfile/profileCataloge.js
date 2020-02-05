import React, { Component } from 'react';
import './profileBanner.css'
import { isMobile, isTablet, isBrowser } from 'react-device-detect';

class ProfileCatalog extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { shopData } = this.props;

        return (
            <div className="">
                <div className="row" style={{ padding: '0px' }}>
                    <div className="col-md-12" style={{ padding: '0px' }}>
                        <div className="col-md-6">
                            <div className="catalogeimage">
                                <img alt='img' src={shopData.gridImageSrc} style={isTablet ? { width: "100%", height: '400px', marginBottom: '15px' } : { width: "100%", height: '680px' }} />
                            </div>
                        </div>
                        <div className="col-md-6" style={{ padding: '0px' }}>
                            <div className="row" style={{ padding: '0px' }}>
                                <div className="col-md-12">
                                    <div className="col-md-6 col-sm-6" style={{ marginBottom: '20px' }}>
                                        <div className="simpleBanner">
                                            <img alt='img' src={shopData.images[0]} style={{ width: "100%" }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-6" style={{ marginBottom: '20px' }}>
                                        <div className="simpleBanner">
                                            <img alt='img' src={shopData.images[1]} style={{ width: "100%" }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <div className="simpleBanner">
                                            <img alt='img' src={shopData.images[2]} style={{ width: "100%" }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <div className="simpleBanner">
                                            <img alt='img' src={shopData.images[3]} style={{ width: "100%" }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileCatalog;