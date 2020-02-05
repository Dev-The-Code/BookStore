import React, { Component } from 'react';
import RatingStars from '../../main_Component/RatingStars'
import './gridview.css'
import { Link } from 'react-router-dom';

class GridView extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    const { ecomData } = this.props;
    return (
      <div className="container" style={{ width: "100%" }}>
        {ecomData && ecomData.map((elem, key) => {
          return (

            <div className="row">
              <div className="col-md-12">
                <div>
                  <Link rel="noopener noreferrer" to={{ pathname: `/products_DetailStyle/${elem._id}`, state: elem }} >
                    <div className="col-md-3 col-sm-3">
                      <img src={elem.images[0]} alt='img' style={{ width: "100%" }} />
                    </div>
                    <div className="col-md-9 col-sm-9">
                      <div className="textgrid">
                        <h4 className='description'>{elem.description}</h4>
                        <p>By Pakjazba</p>
                        <h3 style={{ marginTop: "-20px" }}> {`$${elem.price} `} </h3>
                        <div>
                          <RatingStars />
                          <hr style={{ border: "1px solid", margin: "inherit", marginTop: "30px" }} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}

        {/* <div className="row">
          <div className="col-md-12">
            <div className="col-md-3 col-sm-3">
              <img src='./images/ecommerce/41pa5T0NGKL._AC_US218_.jpg' style={{ width: "100%" }} />
            </div>
            <div className="col-md-9 col-sm-9">
              <div className="textgrid">
                <h4>Samsung 128GB 100MB/s (U3) MicroSD EVO Select Memory Card with Adaptor (MB-ME128GA/AM)</h4>
                <p>By Pakjazba</p>
                <h3 style={{ marginTop: "-20px" }}> $ 32<sup>29</sup> </h3>

                <div>
                  <RatingStars />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr style={{ border: "1px solid" }} /> */}

        {/* <div className="row">
          <div className="col-md-12">
            <div className="col-md-3 col-sm-3">
              <img src='./images/ecommerce/41pa5T0NGKL._AC_US218_.jpg' style={{width:"100%"}}/>
            </div>
            <div className="col-md-9 col-sm-9">
              <div className="textgrid">
                <h4>Samsung 128GB 100MB/s (U3) MicroSD EVO Select Memory Card with Adaptor (MB-ME128GA/AM)</h4>
                <p>By Pakjazba</p>
                <h3 style={{marginTop:"-20px"}}> $ 32<sup>29</sup> </h3>

                <div>
                  <RatingStars/>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* <hr style={{border:"1px solid"}}/> */}

        {/* <div className="row">
          <div className="col-md-12">
            <div className="col-md-3 col-sm-3">
              <img src='./images/ecommerce/41pa5T0NGKL._AC_US218_.jpg' style={{width:"100%"}}/>
            </div>
            <div className="col-md-9 col-sm-9">
              <div className="textgrid">
                <h4>Samsung 128GB 100MB/s (U3) MicroSD EVO Select Memory Card with Adaptor (MB-ME128GA/AM)</h4>
                <p>By Pakjazba</p>
                <h3 style={{marginTop:"-20px"}}> $ 32<sup>29</sup> </h3>

                <div>
                  <RatingStars/>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr style={{border:"1px solid"}}/>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-3 col-sm-3">
              <img src='./images/ecommerce/41pa5T0NGKL._AC_US218_.jpg' style={{width:"100%"}}/>
            </div>
            <div className="col-md-9 col-sm-9">
              <div className="textgrid">
                <h4>Samsung 128GB 100MB/s (U3) MicroSD EVO Select Memory Card with Adaptor (MB-ME128GA/AM)</h4>
                <p>By Pakjazba</p>
                <h3 style={{marginTop:"-20px"}}> $ 32<sup>29</sup> </h3>

                <div>
                  <RatingStars/>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr style={{border:"1px solid"}}/>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-3 col-sm-3">
              <img src='./images/ecommerce/41pa5T0NGKL._AC_US218_.jpg' style={{width:"100%"}}/>
            </div>
            <div className="col-md-9 col-sm-9">
              <div className="textgrid">
                <h4>Samsung 128GB 100MB/s (U3) MicroSD EVO Select Memory Card with Adaptor (MB-ME128GA/AM)</h4>
                <p>By Pakjazba</p>
                <h3 style={{marginTop:"-20px"}}> $ 32<sup>29</sup> </h3>

                <div>
                  <RatingStars/>
                </div>
              </div>
            </div>
          </div>
        </div> */}


      </div>
    )
  }
}

export default GridView;
