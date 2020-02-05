import React, { Component } from 'react';
import Burgermenu from '../../header/burgermenu';
import Footer from '../../footer/footer';
import ProfileCatologe from './profileCataloge';
import ProfileCarousel from './profileCarousel';
import ProfileBanner from './profileBanner';

class ProfileHome extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { shopData, allProducts } = this.props;
        return (
            <div className="">
                <div>
                    <ProfileBanner shopData={shopData} />
                </div>
                <div className="">
                    <h4 className="headingtext" style={{ marginLeft: '-11px', marginTop: '-15px' }}> </h4>
                    <hr />
                    <div style={{ marginTop: '-2%' }}>
                        <ProfileCarousel data={allProducts} />
                    </div>
                </div>
                <div>
                    <ProfileCatologe shopData={shopData} />
                </div>
            </div>
        )
    }
}

export default ProfileHome;