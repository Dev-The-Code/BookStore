import React, { Component } from 'react';
import { Rate } from 'antd';
import { Link } from 'react-router-dom';


class EcomCardsfor extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        const { cardDetails } = this.props;
        return (

            <Link rel="noopener noreferrer" to={{ pathname: `/products_DetailStyle/${cardDetails._id}`, state: cardDetails }} >
                <div className="container" style={{ padding: '0px', width: '100%' }}>
                    <div className="sellercardopacity" style={{ cursor: 'pointer' }}>
                        <div className="sellerstorecard" >
                            <img alt='' src={cardDetails.images[0]} />
                        </div>
                        <h4 style={{ marginTop: "20px", textAlign: "left" }}>{cardDetails.product}</h4>
                        <p> {`Rs.${cardDetails.price}`}</p>
                        <div className='row' style={{ padding: '0' }}>
                            <div className='col-md-8 col-xs-8'>
                                <Rate style={{ paddingBottom: '20px', marginTop: "-20px", fontFamily: 'Source Sans Pro, sans-serif' }} allowHalf value={cardDetails.averageRateProduct} />
                            </div>
                            <div className="vol-md-4 col-xs-4">
                                <p style={{ marginTop: '0', color: '#D3D3D3', marginLeft: '0px' }}>{cardDetails.country}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}

export default EcomCardsfor;

