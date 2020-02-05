import React, { Component } from 'react';
import { HttpUtils } from "../../../Services/HttpUtils";
import './orderList.css';
import Burgermenu from '../../header/headermenu';
import { Modal } from 'antd';
import Footer from '../../footer/footer';

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderLists: [],
            productImages: [],
            showImageModal: false
        }
    }

    async componentDidMount() {
        this.billBoradData();

    }
    billBoradData = async () => {
        let data = this.props.location.state;
        console.log(data, 'data')
        let getShopOrders = {
            shopId: data
        }
        let response = await HttpUtils.post('getSpecificORderProductShopId', getShopOrders);
        console.log(response, 'response')

        if (response) {
            if (response.code == 200) {
                this.setState({
                    orderLists: response.content
                })
            }
        }

    }
    imagesShow = (productImages) => {
        this.setState({
            showImageModal: true,
            productImages: productImages
        })
    }

    handleCancel = (e) => {
        this.setState({
            showImageModal: false,
        });
    }
    render() {
        const { orderLists, productImages, showImageModal } = this.state;
        console.log(productImages, 'productImages')
        const billboardRendring = (
            <div>
                <br />
                <div className="scroll_table">
                    <table className='tableData table'>
                        <thead className="thead-dark" style={{ width: '10px' }}>
                            <th className='tableHead' scope="col">#</th>
                            <th className='tableHead' scope="col">Product Name</th>
                            <th className='tableHead' scope="col">Count Product</th>
                            <th className='tableHead' scope="col">Price</th>
                            <th className='tableHead' scope="col">Total Amount Product</th>
                            {/* <th className='tableHead' scope="col">Size</th> */}
                            <th className='tableHead' scope="col">Images</th>
                        </thead>
                        {
                            orderLists && orderLists.map((elem, key) => {
                                return (<tbody>
                                    <tr>
                                        <th scope="row">{key}</th>
                                        <td className='tableTd'>{elem.productName}</td>
                                        <td className='tableTd'>{elem.cartCount}</td>
                                        <td className='tableTd'>{`$ ${elem.price}`}</td>
                                        <td className='tableTd'>{`$ ${elem.price * elem.cartCount}`}</td>
                                        {/* <td className='tableTd'>{elem.size}</td> */}
                                        <td className='tableTd'> <span onClick={this.imagesShow.bind(this, elem.images)}>View</span></td>
                                    </tr>
                                </tbody>)
                            })
                        }
                    </table>
                </div>
            </div>
        );
        return (
            <div>
                <Burgermenu />
                <div className="container">
                    <div className="hidden-xs" style={{ width: "100%", height: "67px", marginTop: "3px" }}></div>

                    <div className='row' style={{ marginLeft: '0px' }}>
                        <div className='col-xl-12 col-lg-12 col-md-12 col-11'>
                            {billboardRendring}
                        </div>
                    </div>
                    {showImageModal &&
                        <Modal
                            title="Prodct Images"
                            visible={showImageModal}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            width="800px"
                        >
                            <div className="row">
                                <div className="col-md-12" style={{ textAlign: 'center' }}>
                                    <div className="example">
                                        {productImages && productImages.map((elem, key) => {
                                            // console.log(elem, 'elem')
                                            return (
                                                <div className="col-md-4">
                                                    <img src={`${elem}`} alt={key} style={{ width: '70px', height: "70px", margin: '10px' }} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    }
                </div>
                <Footer footerPosition="fixedPositionOnCheckOutPage" />
            </div>
        )
    }
}
export default OrderList;
