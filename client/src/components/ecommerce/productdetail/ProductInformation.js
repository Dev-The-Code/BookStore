import React, { Component } from 'react';
import { Rate } from 'antd';
import { isMobile, isTablet, isBrowser } from 'react-device-detect';
import './productinformation.css';

class ProductInformation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isData: true,
      data: {},
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    let data = this.props.data;
    if (data === undefined) {
      this.setState({
        isData: false
      })
    } else {
      this.setState({
        isData: true,
        data: data
      })
    }
  }
  render() {
    const { data } = this.state;
    let length = data.itemLength;
    let weight = data.itemWeight;
    let width = data.itemWidth;
    return (

      <div class="container" style={isMobile ? { width: "100%" } : { width: '100%', padding: "0", marginTop: "10px" }}>
        <div className="card-specification">
          <span><h4><strong>General Information</strong>  </h4></span>
          <table class="table table-specification">
            <tbody>
              {/* {data.brandName ? <tr>
                  <td><strong>Brand Name</strong></td>
                  <td className="float-right">{data.brandName}</td>
                </tr>
                  : null} */}

              {/* {data.condition ?
                <tr>
                  <td><strong>Condition</strong></td>
                  <td className="float-right">{data.condition}</td>
                </tr>
                : null} */}
              {/* {data.conditionNote ?
                <tr>
                  <td><strong>Condition Note</strong></td>
                  <td className="float-right">{data.conditionNote}</td>
                </tr> */}
              {/* : null} */}

              {/* {data.country ?
                  <tr>
                    <td><strong>Country</strong></td>
                    <td className="float-right">{data.country}</td>
                  </tr>
                  : null} */}
              {/* {data.countryLabeled ?
                  <tr>
                    <td><strong>Country Labeled</strong></td>
                    <td className="float-right">{data.countryLabeled}</td>
                  </tr>
                  : null} */}

              {/* {length ?
                  <tr>
                    <td><strong>Item Length</strong></td>
                    <td className="float-right">{length.itemLengthNumber} {length.itemLengthUnit}</td>
                  </tr>
                : null} */}

              {/* {weight ?
                  <tr>
                    <td><strong>Item Weight</strong></td>
                    <td className="float-right">{weight.itemWeightNumber} {weight.itemWeightUnit}</td>
                  </tr>
                : null} */}

              {/* {width ?
                  <tr>
                    <td><strong>Item Width</strong></td>
                    <td className="float-right">{width.itemWidthNumber} {width.itemWidthUnit}</td>
                  </tr>
                : null} */}

              {/* {data.color ?
                <tr>
                <td><strong>Color</strong></td>
                <td>{data.color}</td>
                </tr>
              : null} */}
              {/* {data.materialType ?
                <tr>
                  <td><strong>Material Type</strong></td>
                  <td className="float-right">{data.materialType}</td>
                </tr>
                : null} */}
              {data.quantity ?
                <tr>
                  <td><strong>Quantity</strong></td>
                  <td>{data.quantity}</td>
                </tr>
                : null}
              {/* {data.sizes ?
                <tr>
                  <td><strong>Size</strong></td>
                  {data.sizes && data.sizes.map((elem, key) => {
                    // <p class="vote">Size: <strong>{elem}</strong></p>
                    return (<td>{elem}</td>)

                  })}
                </tr>
                : null} */}
              {/* {data.handlingTime ?
                  <tr>
                    <td><strong>Handling Time</strong></td>
                    <td className="float-right">{data.handlingTime}</td>
                  </tr>
                : null} */}

              {/* {data.tension ?
                <tr>
                  <td><strong>Tension</strong></td>
                  <td className="float-right">{data.tension}</td>
                </tr>
                : null} */}
            </tbody>
          </table>
        </div>

        <table class="table table-bordered">
          <tbody>
            {/* {data.brandName ? <tr>
              <td><strong>Brand Name</strong></td>
              <td>{data.brandName}</td>
            </tr>
              : null} */}


            {/* {data.lenseColor ?
              <tr>
                <td><strong>Lense Color</strong></td>
                <td>{data.lenseColor}</td>
              </tr>
              : null} */}
            {/* {data.condition ?
              <tr>
                <td><strong>Condition</strong></td>
                <td>{data.condition}</td>
              </tr>
              : null}
            {data.conditionNote ?
              <tr>
                <td><strong>Condition Note</strong></td>
                <td>{data.conditionNote}</td>
              </tr>
              : null}
            {data.country ?
              <tr>
                <td><strong>Country</strong></td>
                <td>{data.country}</td>
              </tr>
              : null}
            {data.countryLabeled ?
              <tr>
                <td><strong>Country Labeled</strong></td>
                <td>{data.countryLabeled}</td>
              </tr>
              : null} */}
            {/* {data.gtin ?
              <tr>
                <td><strong>GTIN</strong></td>
                <td>{data.gtin}</td>
              </tr>
              : null} */}
            {/* {data.handlingTime ?
              <tr>
                <td><strong>Handling Time</strong></td>
                <td>{data.handlingTime}</td>
              </tr>
              : null} */}
            {/* {data.importDesignation ?
              <tr>
                <td><strong>Import Designation</strong></td>
                <td>{data.importDesignation}</td>
              </tr>
              : null} */}
            {/* {length ?
              <tr>
                <td><strong>Item Length</strong></td>
                <td>{length.itemLengthNumber} {length.itemLengthUnit}</td>
              </tr>
              : null}
            {weight ?
              <tr>
                <td><strong>Item Weight</strong></td>
                <td>{weight.itemWeightNumber} {weight.itemWeightUnit}</td>
              </tr>
              : null}
            {width ?
              <tr>
                <td><strong>Item Width</strong></td>
                <td>{width.itemWidthNumber} {width.itemWidthUnit}</td>
              </tr>
              : null}


            {data.materialType ?
              <tr>
                <td><strong>Material Type</strong></td>
                <td>{data.materialType}</td>
              </tr>
              : null} */}
            {/* {data.maximumWeight ?
              <tr>
                <td><strong>Maximum Weight</strong></td>
                <td>{data.maximumWeight}</td>
              </tr>
              : null}
            {data.orientation ?
              <tr>
                <td><strong>Orientation</strong></td>
                <td>{data.orientation}</td>
              </tr>
              : null} */}

            {/* {data.pakageQuantity ?
              <tr>
                <td><strong>Pakage Quantity</strong></td>
                <td>{data.pakageQuantity}</td>
              </tr>
              : null}

            {data.seller ?
              <tr>
                <td><strong>Seller</strong></td>
                <td>{data.seller}</td>
              </tr>
              : null}
            {data.shaft ?
              <tr>
                <td><strong>Shaft</strong></td>
                <td>{data.shaft}</td>
              </tr>
              : null}
            {data.shape ?
              <tr>
                <td><strong>Shape</strong></td>
                <td>{data.shape}</td>
              </tr>
              : null} */}

            {/* {data.taxCode ?
              <tr>
                <td><strong>Tax Code</strong></td>
                <td>{data.taxCode}</td>
              </tr>
              : null} */}
            {/* {data.tension ?
              <tr>
                <td><strong>Tension</strong></td>
                <td>{data.tension}</td>
              </tr>
              : null} */}
            {/* {data.variationTheme ?
              <tr>
                <td><strong>Variation Theme</strong></td>
                <td>{data.variationTheme}</td>
              </tr>
              : null} */}
            {/* {data.legalDesclaimer ?
              <tr>
                <td><strong>Legal Desclaimer</strong></td>
                <td>{data.legalDesclaimer}</td>
              </tr>
              : null}
            {data.sellingDate ?
              <tr>
                <td><strong>Date First Available</strong></td>
                <td>{data.sellingDate}</td>
              </tr>
              : null}
            {data.salePriceDate1 ?
              <tr>
                <td><strong>Sale Date Start</strong></td>
                <td>{data.salePriceDate1}</td>
              </tr>
              : null}
            {data.salePriceDate2 ?
              <tr>
                <td><strong>Sale Date End</strong></td>
                <td>{data.salePriceDate2}</td>
              </tr>
              : null}
            {data.restockDate ?
              <tr>
                <td><strong>Restock Date</strong></td>
                <td>{data.restockDate}</td>
              </tr>
              : null}
            {data.offering ?
              <tr>
                <td><strong>Offering Date</strong></td>
                <td>{data.offering}</td>
              </tr>
              : null} */}
          </tbody>
        </table>
      </div>
    )
  }
}

export default ProductInformation;
