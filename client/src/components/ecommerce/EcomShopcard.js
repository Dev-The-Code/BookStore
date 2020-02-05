import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './EcomShopcard.css'

class EshopCard extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    const { productsData } = this.props
    return (

      <div className="container" style={{ width: "95%" }}>




        {productsData && productsData.length > 0 &&
          <div className="row" style={{ marginTop: "20px" }}>
            <span>
              <h3 className="exploreHead"> Products </h3>
            </span>
          </div>}


        <div className="row">

          <div className="col-md-12">

            {/* filtered data  render*/}


            {/* all products data  render*/}

            {
              productsData && productsData.map((elem, key) => {
                let str = elem.shopName || '';
                if (str.length > 35) {
                  str = str.substring(0, 35);
                  str = str + '...'
                }
                return (
                  <div className="col-md-4 col-sm-4">
                    <Link rel="noopener noreferrer" to={{ pathname: `/products_DetailStyle/${elem._id}`, state: elem }} >
                      <div className="ecomshopcard">
                        <div className="ecommerce-card" >
                          <img alt='' src={elem.images[0]} />
                        </div>
                        <div className="">
                          <div className="pricing">
                            <h4 style={{ margin: "0", color: "#337AB7" }}>{`Rs.${elem.price.number}`} </h4>
                          </div>
                          <div className="category">
                            <h4>
                              {elem.auther}
                            </h4>
                          </div>
                        </div>
                        <div className="otherdetails">
                          <span><h3>{elem.product.slice(0, 15)}....</h3></span>
                          <span><h5>By:{elem.shopName}</h5></span>
                          <Link rel="noopener noreferrer" to={{ pathname: `/products_DetailStyle/${elem._id}`, state: elem }} ><button className="shop-btn">Shop Now</button></Link>
                        </div>

                      </div>
                    </Link>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div >
    )
  }
}

export default EshopCard;

/*featureData, featuredCategories, noRecordFound, recordFound, loader, searchBy, checkRadioBtn,*/