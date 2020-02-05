import React, { Component } from 'react';
import './PthreeColumn.css';
import { InputNumber, Icon } from 'antd';
import ProductInformation from './ProductInformation';
import ProductReviews from './ProductReviews';
import { Link, Redirect } from "react-router-dom";
import RelatedInformation from './relatedInformation';


class PthreeColumn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isData: true,
      data: {},
      images: [],
      imgUrl: '',
      count: 0,
      commentData: [],
      editProduct: false
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
        data: data,
        images: data.images,
        imgUrl: data.images[0]
      })
    }
  }
  renderImagesinLi = (img) => {
    this.setState({
      imgUrl: img
    })
  }

  onChange = (value) => {
    this.setState({
      count: value
    })
  }

  addTocart = () => {
    const { count } = this.state;
    let user = JSON.parse(localStorage.getItem('user'));
    if (user === undefined) {
    }
    else {
      this.props.shoppingCartCount(count)
    }
  }
  onGoEditProduct() {
    this.setState({
      editProduct: true
    })
  }
  render() {
    const { data, count, commentData, editProduct } = this.state;
    const { profileId } = this.props;
    if (editProduct) {
      return (
        <Redirect to={{ pathname: `/Forms_Ecommerce`, state: data }} />
      )
    }
    return (
      <div class="container" style={{ width: "80%", padding: "0px" }}>
        <div class="card-three-column">
          <div class="row" style={{ padding: "15px" }}>
            <div class="col-md-6" style={{ padding: "0" }}>
              <div className="preview">
                <div class="preview-pic tab-content">
                  <div class="tab-pane active" id="pic-1"><img src={this.state.imgUrl} /></div>
                </div>
                <ul class="preview-thumbnail nav nav-tabs">
                  {this.state.images.map(img => <li onClick={() => this.renderImagesinLi(img)}><a ><img src={img} /></a></li>)}
                </ul>
              </div>
              <ProductInformation data={this.props.data} />
            </div>


            <div className="col-md-6">
              <div className="new-card">
                <div class="">
                  <div className="produc-description">
                    <h2>Description</h2>
                    <p>{data.description}</p>

                  </div>
                  {/* <h3 class=""
                  >{data.product}</h3>
                  <Link to={{
                    pathname: `/EcommerceProfile/${data.shopId}`,
                    // state: data.shopId
                  }}>
                    <div className="" >
                      <p>
                        {`By ${data.shopName}`}
                      </p>
                    </div>
                  </Link>
                  <h3>{'$' + data.price} & Free Shipping</h3> */}




                  {/* <ul className="margins">
                      <p>Description: {data.description}</p>
                    </ul>  */}

                  {/* <div>
                    <h4 className="margin"> From The Manufacturer </h4>
                    <h5>{data.manufacturer} <br />{data.manufacturerPart}</h5>
                    <p>Warranty Description: {data.warrantyDescription}</p>
                  </div> */}
                </div>
                {data.profileId == profileId ? <Icon
                  type="edit" size={26}
                  style={{ marginLeft: '10%', cursor: 'pointer' }}
                  onClick={() => { this.onGoEditProduct() }}
                >
                </Icon>
                  : null}
              </div>
              <div className="new-card" style={{ marginTop: "20px" }}>
                <div className="produc-features">
                  {/* <h2>Product Features</h2>
                  <p>{data.productFeature} </p> */}
                  {/* {data.sizes && data.sizes.map((elem , key)=>{
                    return(<p class="vote">Size: <strong>{elem}</strong></p>)

                  })} */}
                  <p>Auther Name: <strong>{data.auther}</strong></p>
                </div>
                <div >
                  <div>
                    <span>Qty:</span>
                    <span> <InputNumber min={0} max={10} defaultValue={1} onChange={this.onChange} /></span>
                  </div>
                  <div className="row center_global row">
                    <button style={{ textAlign: 'center', width: "90%", marginTop: "20px" }} className="btn button_custom"
                      // onClick={() => this.props.shoppingCartCount(count)}
                      onClick={this.addTocart}
                    >Add to cart</button>
                  </div>
                  {/* <Button type="primary" htmlType="submit" className="btn contact-button">
                          <span>Contact</span>
                        </Button> */}
                </div>
              </div>
              <RelatedInformation data={this.props.data} />
            </div>
            {/* <div className="row">
                <div class="details col-md-7">
                  <h3 class="product-title"
                  >{data.product}</h3>
                  <Link to={{
                    pathname: `/EcommerceProfile/${data.shopId}`,
                    // state: data.shopId
                  }}>
                    <div className="sellerstorecard" >
                      <p>
                        {`By ${data.shopName}`}
                      </p>
                    </div>
                  </Link>
                  <h3>{'$' + data.price} & Free Shipping</h3>
                  <p class="vote">Size: <strong>{data.size}</strong></p>
                  <div style={{ marginTop: "20px" }}>
                    <p>Product Feature: {data.productFeature} </p>
                    <ul className="margins">
                      <p>Description: {data.description}</p>
                    </ul>
                  </div>
                  <div>
                    <h4 className="margin"> From The Manufacturer </h4>
                    <h5>{data.manufacturer} <br />{data.manufacturerPart}</h5>
                    <p>Warranty Description: {data.warrantyDescription}</p>
                  </div>
                </div>
                {data.profileId == profileId ? <Icon
                  type="edit" size={26}
                  style={{ marginLeft: '10%', cursor: 'pointer' }}
                  onClick={() => { this.onGoEditProduct() }}
                >
                </Icon>
                  : null}
                <div className="col-md-5">
                  <p style={{ marginBottom: "0px" }}> Share: Email, Facebook, Twitter, Pinterest </p>
                  <div className="ecartbox">
                    <span>
                      <h4>{'$' + data.price} </h4>
                      <h4> & Free Shipping </h4>
                    </span>
                    <span>
                      <h4 className="efontcolor"> In Stock </h4>
                      <p> Ships from and sold by PakJazba.com </p>
                    </span>
                    <div>
                      <span>Qty:</span>
                      <span> <InputNumber min={0} max={10} defaultValue={1} onChange={this.onChange} /></span>
                    </div>
                    <div className="row center_global row">
                      <button style={{ textAlign: 'center', width: "90%", marginTop: "20px" }} className="btn button_custom"
                        // onClick={() => this.props.shoppingCartCount(count)}
                        onClick={this.addTocart}
                      >Add to cart</button>
                    </div>
                  </div>
                </div>
              </div> */}


            <div>
              {/* <PTable /> */}

            </div>
          </div>


          {/* <ProductFaq /> */}
          {data &&
            <ProductReviews shopId={this.props.shopId} productId={this.props.productId}
            />}
        </div>
      </div>
    )
  }
}
export default PthreeColumn;
