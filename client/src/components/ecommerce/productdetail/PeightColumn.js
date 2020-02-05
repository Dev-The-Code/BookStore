import React, { Component } from 'react';
import RatingStars from '../../main_Component/RatingStars';
import './PthreeColumn.css'

class PeightColumn extends Component {
  render() {
    return (
      <div className="container" style={{ width: "100%", padding: "0px" }}>
        <div className="row" style={{ padding: "0px" }}>
          <div className="col-md-12">
            <div className="col-md-9">
              <div className="textP">
                <h4>Samsung 128GB 100MB/s (U3) MicroSD EVO Select Memory Card with Adaptor (MB-ME128GA/AM)</h4>
                <p>By Pakjazba</p>
                <h3 style={{ marginTop: "-20px" }}> $ 32<sup>29</sup> </h3>
                <div>
                  <RatingStars />
                </div>
              </div>
            </div>
            <div className="col-md-3">
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default PeightColumn;
