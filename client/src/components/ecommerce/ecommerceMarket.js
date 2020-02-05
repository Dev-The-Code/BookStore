import React, { Component } from 'react';
import Headermenu from '../header/headermenu';
import Footer from '../footer/footer';
import Slider from '../header/Slider';
import EcomCard from './EcomCard';
import Eshopcard from './EcomShopcard';
import DealsEcom from './EcomDeals';
import { HttpUtils } from "../../Services/HttpUtils";
import { Spin, Icon, Radio } from 'antd';

class EcommerceMarket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsData: '',
      featureData: '',
      allData: '',
      ecomSerchValue: '',
      featuredCategories: true,
      noRecordFound: false,
      recordFound: true,
      loader: true,
      searchBy: '',
      checkRadioBtn: false
    }
  }

  async componentDidMount() {
    let res = await HttpUtils.get('getYourProduct');
    let featureData = [];
    if (res) {
      if (res.code == 200) {
        this.setState({
          productsData: res.content,
          allData: res.content,
          loader: false,
          recordFound: true
        })
      }
    }
  }

  searcProduct = (e) => {
    const { allData } = this.state;
    this.setState({
      ecomSerchValue: e.target.value
    })
    if (e.target.value == '') {
      this.setState({
        productsData: allData,
        featuredCategories: true,
        noRecordFound: false,
        recordFound: true
      })
    }
  }

  searchProduct = async (e) => {
    const { ecomSerchValue, allData, searchBy } = this.state;
    e.preventDefault();
    let data;
    let res = await HttpUtils.get('getYourProduct');
    if (res) {
      if (res.code = 200) {
        data = res.content;
      }
    }
    let ecomSearchValue = ecomSerchValue.toLowerCase();
    let ecommreceFilterData = [];
    if (searchBy != '') {
      if (ecomSerchValue != '') {
        for (let i in data) {
          if (searchBy == 'product') {
            if (ecomSearchValue == data[i].product.toLowerCase()) {
              ecommreceFilterData.push(data[i])
            }
          }
          else if (searchBy == 'shop') {
            if (ecomSearchValue == data[i].shopName.toLowerCase()) {
              ecommreceFilterData.push(data[i])
            }
          }
          else if (searchBy == 'brand') {
            if (ecomSearchValue == data[i].brandName.toLowerCase() || ecomSearchValue == data[i].manufacturer.toLowerCase()) {
              ecommreceFilterData.push(data[i])
            }
          }
        }
        if (ecommreceFilterData.length == 0) {
          this.setState({
            recordFound: false,
            noRecordFound: true,
            featuredCategories: false,
          })
        }
        else {
          this.setState({
            productsData: ecommreceFilterData,
            featuredCategories: false,
            recordFound: true,
            noRecordFound: false,
          })
        }
      }
    }
    else {
      this.setState({
        checkRadioBtn: true
      })
    }
  }

  onAddMore = () => {
    const { allData } = this.state;
    this.setState({
      productsData: allData,
      featuredCategories: true,
      recordFound: true,
      noRecordFound: false
    })
  }

  onChange = e => {
    this.setState({
      searchBy: e.target.value,
      checkRadioBtn: false
    });
  };

  render() {
    const { productsData, featureData, featuredCategories, noRecordFound, recordFound, loader, searchBy, checkRadioBtn } = this.state;
    const antIcon = <Icon type="loading" style={{ fontSize: 120 }} spin />;
    return (
      <div>
        <span>
          <div className="vissible-xs" style={{ "background": "#d8e7e4", marginTop: "102px", backgroundSize: 'cover' }}>
            <div className="visible-xs" style={{ marginTop: '-119px' }}></div>
            <div className="background-image">
              <Headermenu />

              <Slider mainH1="Pakjazba Ecommerce" mainH2="" searcProduct={this.searcProduct} searchProduct={this.searchProduct}
                onChange={this.onChange} searchBy={searchBy} checkRadioBtn={checkRadioBtn} />
            </div>
          </div>
        </span>
        {loader && <div style={{ textAlign: 'center', marginLeft: '-100px', marginBottom: '15px' }}>
          <Spin indicator={antIcon} />
        </div>}
        {/* {featuredCategories ?
          <div>
            <div className="row" style={{ marginTop: "20px" }}>
              <h1 className="" style={{ fontWeight: "bold", textAlign: "center" }}> Feature Categories  </h1>
            </div>
            <div className="row" style={{ marginTop: "-10px" }}>
              <EcomCard featureData={featureData} />
            </div>
          </div>
          : null
        } */}
        {noRecordFound && <span style={{ textAlign: "center" }}><h1>Not found....</h1></span>}
        {noRecordFound && <span style={{ textAlign: "center" }}><h5>you can find your search by type</h5></span>}
        {noRecordFound && <div className="col-md-12" style={{ textAlign: "center" }}><button type="button" className="btn2 btn2-success" onClick={this.onAddMore}>Go Back</button></div>}
        {recordFound ? <div className="row">
          <Eshopcard productsData={productsData} />
        </div> : null}
        {/* <div className="row" style={{ marginTop: "-70px" }}>
          <DealsEcom />
        </div> */}
        {/* <div className="row">
              <div className="col-md-12">
                <img src="../images/businesslistingimage.png" style={{ width: '100%' }} alt='img' />
              </div>
            </div> */}
        <Footer />
      </div>
    )
  }
}

export default EcommerceMarket;
