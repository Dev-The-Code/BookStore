import React, { Component } from 'react';
import HeaderMenu from '../../header/headermenu';
import Footer from '../../footer/footer';
import './ecommerceProfile.css';
import { Redirect } from "react-router-dom";
import { isTablet } from 'react-device-detect';
import { Tabs } from 'antd';
import ProfileHome from './profileHome';
import ProfileProducts from './profileProducts';
import { HttpUtils } from "../../../Services/HttpUtils";

const { TabPane } = Tabs;

let categoriesArr = [];
let brandNameArr = [];
let locationArr = [];
let colorArr = [];

class EcomProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopData: '',
      shopId: '',
      shopEdit: false,
      addProduct: false,
      profileId: '',
      userId: '',
      addProductObj: {},
      allProducts: [],
      categories: [],
      color: [],
      location: [],
      brandName: [],
      filteredData: [],
      filterDataNotFound: false,
      filterDataShow: false,
      categoriesName: [],
      priceRangeNotGiven: false,
      oderList: false
    }
  }

  componentDidMount() {
    this.shops();
  }

  shops = async () => {
    let shopId = this.props.location.pathname.slice(18)
    let shopData = this.props.location.state;
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      this.setState({
        profileId: userData.profileId,
        userId: userData._id
      })
    }
    if (shopData) {
      this.setState({
        shopData: shopData,
        shopId: shopId,
      })
      this.getShopData(shopId)
    }
    else {
      let obj = {
        shopId: shopId
      }
      let reqShopData = await HttpUtils.post('getSpecificShopById', obj)
      if (reqShopData.code == 200) {
        this.setState({
          shopData: reqShopData.content[0],
          shopId: shopId,
        })
        this.getShopData(shopId)
      }
    }
  }

  getShopData = async (shopId) => {
    const { allProducts } = this.state;
    let categoriesArr = [];
    let colorArr = [];
    let locationArr = [];
    let brandNameArr = [];
    let obj = {
      shopIdForProduct: shopId
    }
    let reqShopData = await HttpUtils.post('getShopProducts', obj)
    if (reqShopData.code == 200) {
      let allProducts = reqShopData.content;
      for (var i = 0; i < allProducts.length; i++) {
        if (colorArr.indexOf(allProducts[i].color) == -1) {
          const color = allProducts[i].color.charAt(0).toUpperCase() + allProducts[i].color.substring(1);
          colorArr.push(color)
        }
        if (locationArr.indexOf(allProducts[i].country) == -1) {
          const location = allProducts[i].country.charAt(0).toUpperCase() + allProducts[i].country.substring(1);
          locationArr.push(location)
        }
        if (brandNameArr.indexOf(allProducts[i].brandName) == -1) {
          const brandName = allProducts[i].brandName.charAt(0).toUpperCase() + allProducts[i].brandName.substring(1);
          brandNameArr.push(brandName)
        }
        for (var j = 0; j < allProducts[i].category.length; j++) {
          if (categoriesArr.indexOf(allProducts[i].category[1]) == -1) {
            const category = allProducts[i].category[1].charAt(0).toUpperCase() + allProducts[i].category[1].substring(1);
            categoriesArr.push(category)
          }
        }
      }
      this.setState({
        allProducts: reqShopData.content,
        categories: categoriesArr,
        color: colorArr,
        location: locationArr,
        brandName: brandNameArr,
      })
    }
    if (allProducts.length > 0) {
      this.calculateRatingOfShop()
    }
  }

  calculateRatingOfShop = async () => {
    const { allProducts, shopId } = this.state;

    let numberOfProduct = 0;
    let totalPercantageOfShop = 0;
    let finalPercantageOfShop = 0;

    for (var i = 0; i < allProducts.length; i++) {
      if (allProducts[i].percantageOfProduct != undefined) {
        numberOfProduct = numberOfProduct + 1;
        totalPercantageOfShop = totalPercantageOfShop + allProducts[i].percantageOfProduct;
        finalPercantageOfShop = totalPercantageOfShop / numberOfProduct;
      }
    }

    finalPercantageOfShop = Math.round(finalPercantageOfShop);

    let obj = {
      objectId: shopId,
      percantageOfShop: finalPercantageOfShop,
    }

    let shopData = await HttpUtils.post('postshop', obj)
    this.setState({
      shopData: shopData.content[0]
    })
  }

  oderList = () => {
    this.setState({
      oderList: true
    })
  }
  editShop = () => {
    this.setState({
      shopEdit: true
    })
  }

  addProductOnShop = () => {
    const { shopId, shopData } = this.state;
    let addProductObj = {
      shopId: shopId,
      shopTitle: shopData.shopTitle
    }
    this.setState({
      addProduct: true,
      addProductObj: addProductObj
    })
  }

  removeCategories = (key) => {
    if (key == 'categories') {
      categoriesArr = [];
      let arr = [];
      this.onChange("categoriess", arr)
    }
  }

  //Collect the filtraion keys and values in seprate array for filtration
  onChange = (key, value) => {

    console.log(key, 'key')
    console.log(value, 'value')

    if (value.length == 0) {
      if (key == 'brand name') {
        brandNameArr = [];
      }
      else if (key == 'location') {
        locationArr = [];
      }
      else if (key == 'color') {
        colorArr = [];
      }
    }

    //add filter values in the seprate arrays
    if (key == 'categories') {
      categoriesArr = [];
      categoriesArr.push(value);

    }
    else if (key == 'brand name') {
      brandNameArr = [];
      for (var i = 0; i < value.length; i++) {
        brandNameArr.push(value[i])
      }

    }
    else if (key == 'location') {
      locationArr = [];
      for (var i = 0; i < value.length; i++) {
        locationArr.push(value[i])
      }

    }
    else if (key == 'color') {
      colorArr = [];
      for (var i = 0; i < value.length; i++) {
        colorArr.push(value[i])
      }

    }

    this.getFilterKeys()

  }

  getFilterKeys = () => {
    let categoroyOfShop = [];
    let brandName = [];
    let color = [];
    let location = [];
    
    let filterKey = [];

    //keys of the filter in array
    if (categoriesArr.length > 0) {
      filterKey.push('categories')
    }
    if (brandNameArr.length > 0) {
      filterKey.push('brand name')
    }
    if (colorArr.length > 0) {
      filterKey.push('color')
    }
    if (locationArr.length > 0) {
      filterKey.push('location')
    }

    for (var i = 0; i < categoriesArr.length; i++) {
      categoroyOfShop.push(categoriesArr[i])
    }
    for (var i = 0; i < brandNameArr.length; i++) {
      brandName.push(brandNameArr[i])
    }
    for (var i = 0; i < locationArr.length; i++) {
      color.push(locationArr[i])
    }
    for (var i = 0; i < colorArr.length; i++) {
      location.push(colorArr[i])
    }

    this.setState({
      categoroyOfRoom: categoroyOfShop,
      stateOfRoom: brandName,
      cityOfRoom: color,
      accomodatesOfRoom: location,
    })

    //call the function
    this.pushFilterArrayData(filterKey)
  }


  pushFilterArrayData = (filterKeysArr) => {

    //calls difrent function for diffrent with the filtaraion keys
    if (filterKeysArr.length == 1) {
      this.filterProductWithOneValue(filterKeysArr)
    }
    else if (filterKeysArr.length == 2) {
      this.filterProductWithTwoValue(filterKeysArr)

    }
    else if (filterKeysArr.length == 3) {
      this.filterProductWithThreeValue(filterKeysArr)

    }
    else if (filterKeysArr.length == 4) {
      this.filterProductWithFourValue(filterKeysArr)
    }
    else {
      let arr = [];
      this.setTheStateForFiltredValues(arr)
    }
  }

  //filter by any one of the key
  filterProductWithOneValue = (filterKeysArr) => {
    const { allProducts } = this.state;
    let filterFinalDataArr = [];

    if (filterKeysArr[0] == 'categories') {

      for (var i = 0; i < allProducts.length; i++) {
        if (allProducts[i].category[1].toLowerCase() == categoriesArr[0].toLowerCase()) {
          filterFinalDataArr.push(allProducts[i])
        }
      }
    }
    else if (filterKeysArr[0] == 'brand name') {
      for (var i = 0; i < brandNameArr.length; i++) {
        for (var j = 0; j < allProducts.length; j++) {
          if (allProducts[j].brandName.toLowerCase() == brandNameArr[i].toLowerCase()) {
            filterFinalDataArr.push(allProducts[j])
          }
        }
      }
    }
    else if (filterKeysArr[0] == 'location') {
      for (var i = 0; i < locationArr.length; i++) {
        for (var j = 0; j < allProducts.length; j++) {
          if (allProducts[j].country.toLowerCase() == locationArr[i].toLowerCase()) {
            filterFinalDataArr.push(allProducts[j])
          }
        }
      }
    }
    else if (filterKeysArr[0] == 'color') {
      for (var i = 0; i < colorArr.length; i++) {
        for (var j = 0; j < allProducts.length; j++) {
          if (allProducts[j].color.toLowerCase() == colorArr[i].toLowerCase()) {
            filterFinalDataArr.push(allProducts[j])
          }
        }
      }
    }
    this.setTheStateForFiltredValues(filterFinalDataArr)

  }

  //filter by any two of the key
  filterProductWithTwoValue = (filterKeysArr) => {
    const { allProducts } = this.state;
    let arr = [];
    let filterFinalDataArr = [];
    if (filterKeysArr[0] == 'categories' && filterKeysArr[1] == 'brand name') {

      for (var i = 0; i < allProducts.length; i++) {
        if (allProducts[i].category[1].toLowerCase() == categoriesArr[0].toLowerCase()) {
          arr.push(allProducts[i])
        }
      }
      for (var i = 0; i < brandNameArr.length; i++) {
        for (var j = 0; j < arr.length; j++) {
          if (arr[j].brandName.toLowerCase() == brandNameArr[i].toLowerCase()) {
            filterFinalDataArr.push(arr[j])
          }
        }
      }

    }
    else if (filterKeysArr[0] == 'categories' && filterKeysArr[1] == 'color') {

      for (var i = 0; i < allProducts.length; i++) {
        if (allProducts[i].category[1].toLowerCase() == categoriesArr[0].toLowerCase()) {
          arr.push(allProducts[i])
        }
      }
      for (var i = 0; i < colorArr.length; i++) {
        for (var j = 0; j < arr.length; j++) {
          if (arr[j].color.toLowerCase() == colorArr[i].toLowerCase()) {
            filterFinalDataArr.push(arr[j])
          }
        }
      }

    }
    else if (filterKeysArr[0] == 'categories' && filterKeysArr[1] == 'location') {

      for (var i = 0; i < allProducts.length; i++) {
        if (allProducts[i].category[1].toLowerCase() == categoriesArr[0].toLowerCase()) {
          arr.push(allProducts[i])
        }
      }
      for (var i = 0; i < locationArr.length; i++) {
        for (var j = 0; j < arr.length; j++) {
          if (arr[j].country.toLowerCase() == locationArr[i].toLowerCase()) {
            filterFinalDataArr.push(arr[j])
          }
        }
      }

    }
    else if (filterKeysArr[0] == 'brand name' && filterKeysArr[1] == 'color') {

      for (var i = 0; i < brandNameArr.length; i++) {
        for (var j = 0; j < allProducts.length; j++) {
          if (allProducts[j].brandName.toLowerCase() == brandNameArr[i].toLowerCase()) {
            arr.push(allProducts[j])
          }
        }
      }
      for (var i = 0; i < colorArr.length; i++) {
        for (var j = 0; j < arr.length; j++) {
          if (arr[j].color.toLowerCase() == colorArr[i].toLowerCase()) {
            filterFinalDataArr.push(arr[j])
          }
        }
      }

    }
    else if (filterKeysArr[0] == 'brand name' && filterKeysArr[1] == 'location') {

      for (var i = 0; i < brandNameArr.length; i++) {
        for (var j = 0; j < allProducts.length; j++) {
          if (allProducts[j].brandName.toLowerCase() == brandNameArr[i].toLowerCase()) {
            arr.push(allProducts[j])
          }
        }
      }
      for (var i = 0; i < locationArr.length; i++) {
        for (var j = 0; j < arr.length; j++) {
          if (arr[j].country.toLowerCase() == locationArr[i].toLowerCase()) {
            filterFinalDataArr.push(arr[j])
          }
        }
      }

    }
    else if (filterKeysArr[0] == 'color' && filterKeysArr[1] == 'location') {

      for (var i = 0; i < colorArr.length; i++) {
        for (var j = 0; j < allProducts.length; j++) {
          if (allProducts[j].color.toLowerCase() == colorArr[i].toLowerCase()) {
            arr.push(allProducts[j])
          }
        }
      }
      for (var i = 0; i < locationArr.length; i++) {
        for (var j = 0; j < arr.length; j++) {
          if (arr[j].country.toLowerCase() == locationArr[i].toLowerCase()) {
            filterFinalDataArr.push(arr[j])
          }
        }
      }

    }

    this.setTheStateForFiltredValues(filterFinalDataArr)

  }

  //filter by any three of the key
  filterProductWithThreeValue = (filterKeysArr) => {
    const { allProducts } = this.state;
    let arr1 = [];
    let arr2 = [];
    let filterFinalDataArr = [];

    if (filterKeysArr[0] == "categories" && filterKeysArr[1] == "brand name" && filterKeysArr[2] == "color") {

      for (var i = 0; i < allProducts.length; i++) {
        if (allProducts[i].category[1].toLowerCase() == categoriesArr[0].toLowerCase()) {
          arr1.push(allProducts[i])
        }
      }
      for (var i = 0; i < brandNameArr.length; i++) {
        for (var j = 0; j < arr1.length; j++) {
          if (arr1[j].brandName.toLowerCase() == brandNameArr[i].toLowerCase()) {
            arr2.push(arr1[j])
          }
        }
      }
      for (var i = 0; i < colorArr.length; i++) {
        for (var j = 0; j < arr2.length; j++) {
          if (arr2[j].color.toLowerCase() == colorArr[i].toLowerCase()) {
            filterFinalDataArr.push(arr2[j]);
          }
        }
      }

    }
    else if (filterKeysArr[0] == "categories" && filterKeysArr[1] == "color" && filterKeysArr[2] == "location") {

      for (var i = 0; i < allProducts.length; i++) {
        if (allProducts[i].category[1].toLowerCase() == categoriesArr[0].toLowerCase()) {
          arr1.push(allProducts[i])
        }
      }
      for (var i = 0; i < colorArr.length; i++) {
        for (var j = 0; j < arr1.length; j++) {
          if (arr1[j].color.toLowerCase() == colorArr[i].toLowerCase()) {
            arr2.push(arr1[j]);
          }
        }
      }
      for (var i = 0; i < locationArr.length; i++) {
        for (var j = 0; j < arr2.length; j++) {
          if (arr2[j].country.toLowerCase() == locationArr[i].toLowerCase()) {
            filterFinalDataArr.push(arr2[j])
          }
        }
      }

    }
    else if (filterKeysArr[0] == "categories" && filterKeysArr[1] == "brand name" && filterKeysArr[2] == "location") {

      for (var i = 0; i < allProducts.length; i++) {
        if (allProducts[i].category[1].toLowerCase() == categoriesArr[0].toLowerCase()) {
          arr1.push(allProducts[i])
        }
      }
      for (var i = 0; i < brandNameArr.length; i++) {
        for (var j = 0; j < arr1.length; j++) {
          if (arr1[j].brandName.toLowerCase() == brandNameArr[i].toLowerCase()) {
            arr2.push(arr1[j])
          }
        }
      }
      for (var i = 0; i < locationArr.length; i++) {
        for (var j = 0; j < arr2.length; j++) {
          if (arr2[j].country.toLowerCase() == locationArr[i].toLowerCase()) {
            filterFinalDataArr.push(arr2[j])
          }
        }
      }

    }
    else if (filterKeysArr[0] == "brand name" && filterKeysArr[1] == "color" && filterKeysArr[2] == "location") {
      for (var i = 0; i < brandNameArr.length; i++) {
        for (var j = 0; j < allProducts.length; j++) {
          if (allProducts[j].brandName.toLowerCase() == brandNameArr[i].toLowerCase()) {
            arr1.push(allProducts[j])
          }
        }
      }
      for (var i = 0; i < colorArr.length; i++) {
        for (var j = 0; j < arr1.length; j++) {
          if (arr1[j].color.toLowerCase() == colorArr[i].toLowerCase()) {

            arr2.push(arr1[j]);
          }
        }
      }
      for (var i = 0; i < locationArr.length; i++) {
        for (var j = 0; j < arr2.length; j++) {
          if (arr2[j].country.toLowerCase() == locationArr[i].toLowerCase()) {
            filterFinalDataArr.push(arr2[j])
          }
        }
      }
    }

    this.setTheStateForFiltredValues(filterFinalDataArr)

  }

  //filter by any four of the key
  filterProductWithFourValue = (filterKeysArr) => {
    const { allProducts } = this.state;

    let arr1 = [];
    let arr2 = [];
    let arr3 = [];
    let filterFinalDataArr = [];

    for (var i = 0; i < allProducts.length; i++) {
      if (allProducts[i].category[1].toLowerCase() == categoriesArr[0].toLowerCase()) {
        arr1.push(allProducts[i])
      }
    }
    for (var i = 0; i < brandNameArr.length; i++) {
      for (var j = 0; j < arr1.length; j++) {
        if (arr1[j].brandName.toLowerCase() == brandNameArr[i].toLowerCase()) {
          arr2.push(arr1[j])
        }
      }
    }
    for (var i = 0; i < colorArr.length; i++) {
      for (var j = 0; j < arr2.length; j++) {
        if (arr2[j].color.toLowerCase() == colorArr[i].toLowerCase()) {
          arr3.push(arr2[j]);
        }
      }
    }
    for (var i = 0; i < locationArr.length; i++) {
      for (var j = 0; j < arr3.length; j++) {
        if (arr3[j].country.toLowerCase() == locationArr[i].toLowerCase()) {
          filterFinalDataArr.push(arr3[j])
        }
      }
    }

    this.setTheStateForFiltredValues(filterFinalDataArr)
  }

  setTheStateForFiltredValues = (filterFinalDataArr) => {
    if (filterFinalDataArr.length > 0) {
      this.setState({
        filteredData: filterFinalDataArr,
        filterDataShow: true,
        filterDataNotFound: false,
        categoriesName: categoriesArr
      })
    }
    else {
      this.setState({
        filteredData: filterFinalDataArr,
        filterDataNotFound: true,
        filterDataShow: true,
        categoriesName: categoriesArr
      })
    }

    if (categoriesArr.length == 0 && brandNameArr.length == 0 &&
      locationArr.length == 0 && colorArr.length == 0) {
      this.setState({
        filterDataShow: false,
        filterDataNotFound: false,
      })
    }
  }

  serachProductMinToMaxPrice = (minPrice, maxPrice) => {
    const { allProducts, filteredData } = this.state;
    let rangePriceFilterData = []
    if (minPrice == '' || maxPrice == '') {
      this.setState({
        priceRangeNotGiven: true
      })
    }
    else {
      if (filteredData.length > 0) {
        for (var i = 0; i < filteredData.length; i++) {
          if (filteredData[i].price >= minPrice && filteredData[i].price <= maxPrice) {
            rangePriceFilterData.push(filteredData[i])
          }
        }
      }
      else {
        for (var i = 0; i < allProducts.length; i++) {
          if (allProducts[i].price >= minPrice && allProducts[i].price <= maxPrice) {
            rangePriceFilterData.push(allProducts[i])
          }
        }
      }
      this.setState({
        priceRangeNotGiven: false,
        filteredData: rangePriceFilterData,
        filterDataShow: true,
        filterDataNotFound: false,
        categoriesName: categoriesArr
      })
    }
  }

  render() {
    const { shopData, shopEdit, addProduct, profileId, addProductObj, allProducts, categories, color, location, brandName,
      filteredData, filterDataNotFound, filterDataShow, categoriesName, priceRangeNotGiven, oderList, shopId } = this.state;
    if (shopEdit) {
      return (
        <Redirect to={{ pathname: '/shopForm', state: shopData }} />
      )
    } else if (addProduct) {
      return (
        <Redirect to={{ pathname: '/Forms_Ecommerce', state: addProductObj }} />
      )
    }
    else if (oderList) {
      return (
        <Redirect to={{ pathname: `/oderList/${shopId}`, state: shopId }} />
      )
    }
    return (
      <div>
        <span>
          <div className="" style={{
            "backgroundImage": "url('../images/bgc-images/busnes-listing.png')",
            marginTop: "-20px", backgroundSize: 'cover'
          }}>
            <div className="background-image">
              <HeaderMenu />
            </div>
          </div>
        </span>
        <div className="row jobdetail-page" style={{ marginTop: "100px" }}>
        </div>
        {shopData &&
          <div className>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-8 col-sm-7">
                  <div className="row" style={{ padding: '0px' }}>
                    <div className="col-md-12">
                      <div className="col-md-2 col-sm-3 col-xs-3">
                        <div className="" style={{ borderRadius: '50px black' }}>
                          <img alt='' src={shopData.shopLogo} style={{ borderRadius: '50px !important' }} />
                        </div>
                      </div>
                      <div className="col-md-10 col-sm-9 col-xs-9">
                        <h2 style={isTablet ? { margin: "0", fontSize: '27px' } : { margin: '0', fontSize: '36px' }}>{shopData.shopTitle}</h2>
                        {shopData.percantageOfShop != undefined ?
                          <p>{`${shopData.percantageOfShop}% postive seller ratings`}</p>
                          :
                          <p>0% postive seller ratings</p>}
                      </div>
                    </div>
                  </div>
                </div>
                {shopData.profileId == profileId &&
                  <div className="col-md-4 col-sm-5">
                    <div className="col-md-6 col-sm-6 col-xs-6">
                      <div className="buttontoleft">
                        <button type="button" className="btn btn-sm btn-editprofile" style={{ width: "100%" }}
                          onClick={this.oderList}>
                          <div className="font-style fontClolor">
                            Order List
                        </div>
                        </button>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-6">
                      <div className="buttontoleft">
                        <button type="button" className="btn btn-sm btn-editprofile" style={{ width: "100%" }}
                          onClick={this.editShop}>
                          {/* Edit Home */}
                          <div className="font-style fontClolor">
                            Edit Home
                        </div>
                        </button>
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-6">
                      <div className="buttontoleft">
                        <button type="button" className="btn btn-sm btn-editprofile" style={{ width: "100%" }}
                          onClick={this.addProductOnShop}>
                          {/* Add Product */}
                          <div className="font-style fontClolor">
                            Publish Your Product
                        </div>
                        </button>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        }
        <div className="container" style={{ width: '98%' }}>
          <div className="row">
            <div className="col-md-12">
              <Tabs defaultActiveKey="1">
                <TabPane tab="Home" key="1">
                  {
                    shopData && <ProfileHome shopData={shopData} allProducts={allProducts} />
                  }
                </TabPane>
                <TabPane tab="All Products" key="2">
                  <ProfileProducts allProducts={allProducts} categories={categories} color={color}
                    location={location} brandName={brandName} onChange={this.onChange} filteredData={filteredData}
                    filterDataNotFound={filterDataNotFound} filterDataShow={filterDataShow}
                    categoriesName={categoriesName} removeCategories={this.removeCategories}
                    serachProductMinToMaxPrice={this.serachProductMinToMaxPrice}
                    priceRangeNotGiven={priceRangeNotGiven} />
                </TabPane>
                <TabPane tab="Profile" key="3">
                  Content of Tab Pane 3
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
export default EcomProfile;