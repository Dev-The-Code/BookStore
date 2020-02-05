import React, { Component } from 'react';
import { Rate } from 'antd';
import { isMobile, isTablet, isBrowser } from 'react-device-detect';
import './productinformation.css';

class RelatedInformation extends Component {
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
        <div className="new-card">
            <div className="More-Information">
                <h2>More Information</h2>
            </div>
            <div>
                <table class="table table-specification">
                    <tbody>
                         {data.price ?
                        <tr>
                            <td><strong>Price</strong></td>
                            <td>{ data.price.number + ' Pkr'}</td>
                        </tr>
                        : null}
                        {data.salePrice ?
                        <tr>
                            <td><strong>Sale Price</strong></td>
                            <td>{ data.salePrice.number + ' Pkr'}</td>
                        </tr>
                        : null}
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}
}

export default RelatedInformation