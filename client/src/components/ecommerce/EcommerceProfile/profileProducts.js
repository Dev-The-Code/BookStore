import React, { Component } from 'react';
import EcomNine from './ecomNine';
import FourEcom from '../ecommercedetail/fourEcom';

class ProfileProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { allProducts, categories, color, location, brandName, filteredData, filterDataNotFound, filterDataShow,
      categoriesName, removeCategories, serachProductMinToMaxPrice, priceRangeNotGiven } = this.props;

    return (
      <div className="">
        <div className="row" style={{ padding: '0px' }}>
          <div className="col-md-12">
            {/* <div className="col-md-3" style={{ backgroundColor: "whitesmoke" }}>
              <div className="row">
                <h2 style={{ fontWeight: '700', marginLeft: '15px' }}>Filters</h2>
                <FourEcom categories={categories} color={color} location={location}
                  brandName={brandName} onChange={this.props.onChange}
                  serachProductMinToMaxPrice={serachProductMinToMaxPrice}
                  priceRangeNotGiven={priceRangeNotGiven} />
              </div>
            </div> */}
            <div className="col-md-12">
              <EcomNine allProducts={allProducts} filterDataShow={filterDataShow}
                filteredData={filteredData} filterDataNotFound={filterDataNotFound}
                categoriesName={categoriesName} removeCategories={removeCategories} />
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default ProfileProducts;