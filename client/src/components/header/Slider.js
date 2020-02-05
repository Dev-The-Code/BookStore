import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import './slider.css';
import { HttpUtils } from "../../Services/HttpUtils";
import { Redirect } from 'react-router';
import { Radio } from 'antd';

class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            ecomSerchValue: '',
            ecommreceFilterData: [],
            redirectToEcomFilterPage: false
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({ type: 'SEARCHOF' });
    }

    onChange(e) {
        var inputValue = e.target.value;
        this.setState({
            inputValue,
        })
        if (inputValue === '') {
            const { dispatch } = this.props;
            dispatch({ type: 'SEARCHON', inputValue })
        }
    }

    searchText = (e) => {
        e.preventDefault();
        const { inputValue } = this.state;
        const { dispatch } = this.props;
        dispatch({ type: 'SEARCHON', inputValue })

    }
    serachEcom = async (e) => {
        const { ecomSerchValue } = this.state;
        e.preventDefault();
        let res = await HttpUtils.get('getYourProduct');
        let data = res.content
        let ecommreceFilterData = [];
        let obj = {
            searchValue: ecomSerchValue
        }
        for (let i in data) {
            if (ecomSerchValue == data[i].product || ecomSerchValue == data[i].productFeature ||
                ecomSerchValue == data[i].brandName || ecomSerchValue == data[i].description ||
                ecomSerchValue == data[i].legalDesclaimer || ecomSerchValue == data[i].manufacturer ||
                ecomSerchValue == data[i].manufacturerPart) {
                ecommreceFilterData.push(data[i])
            }
        }
        obj.ecommreceFilterData = ecommreceFilterData
        this.setState({
            ecommreceFilterData: obj,
            redirectToEcomFilterPage: true
        })
    }

    postRoom = (e) => {
        e.preventDefault();
        this.props.getMethod();
    }



    render() {
        const { inputValue, redirectToEcomFilterPage, ecommreceFilterData } = this.state;
        if (redirectToEcomFilterPage) {
            return <Redirect to={{ pathname: '/products_GridStyle', state: ecommreceFilterData }} />
        }
        return (
            <div>
                <div>
                    {this.props.mainH1 === 'Pakjazba Classified' && <div className="row">
                        <span className="col-md-2"></span>
                        <div className="col-md-5 col-sm-12 col-xs-12">
                            <h3 className="text-h1" style={{ fontSize: '36px', fontWeight: 'bold', color: 'black', textAlign: 'left' }}>{this.props.mainH1}</h3>
                            <form>
                                <div className="single">

                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Search" style={{ height: '40px' }} onChange={this.onChange.bind(this)} />
                                        <span className="input-group-btn">
                                            <button className="btn btn-theme" type="submit" style={{ backgroundColor: '#37a99b', color: 'white' }} onClick={this.searchText}><i className="fa fa-search" /></button>
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-5 col-sm-6 hidden-xs hidden-sm">
                            <img src="../images/buysell/header1.png" style={{ width: '65%' }} />
                        </div>
                    </div>}



                    {this.props.mainH1 === 'Pakjazba Business Listing' && <div className="row">
                        <div className="col-md-2 col-sm-2"> </div>
                        <div className="col-md-5 col-sm-12 col-xs-12">
                            <h3 className="text-h1" style={{ fontSize: '36px', fontWeight: 'bold', color: 'black', textAlign: 'left' }}>{this.props.mainH1}</h3>
                            <div className="row" style={{ padding: "0" }}>
                                <div className="col-md-12">
                                    <form>
                                        <div className="single">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Search" style={{ height: '40px' }}
                                                    onChange={this.onChange.bind(this)} />
                                                <span className="input-group-btn">
                                                    <button className="btn btn-theme" type="submit"
                                                        style={{ backgroundColor: '#37a99b', color: 'white' }}
                                                        onClick={this.searchText}><i className="fa fa-search" /></button>
                                                </span>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-5 col-sm-6 hidden-xs hidden-sm">
                            <img src="../images/business/busi-illus-1.png" style={{ width: "65%" }} />
                        </div>
                    </div>}

                    {/*Slider for Job Portal start*/}
                    {this.props.mainH1 === 'PakJazba Job Portal' && <div className="row">
                        <span className="col-md-2"></span>
                        <div className="col-md-5 col-sm-12 col-xs-12">
                            <h3 className="text-h1" style={{ fontSize: '36px', fontWeight: 'bold', color: 'black', textAlign: 'left' }}>{this.props.mainH1}</h3>
                            <form>
                                <div className="single">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Search" style={{ height: '40px' }} onChange={this.onChange.bind(this)} />
                                        <span className="input-group-btn">
                                            <button className="btn btn-theme" type="submit" style={{ backgroundColor: '#37a99b', color: 'white' }} onClick={this.searchText}><i class="fa fa-search" /></button>
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-5 col-sm-6 hidden-xs hidden-sm">
                            <img src="../images/job-icons/ilus-1.png" style={{ width: '55%' }} />
                        </div>
                    </div>}
                    {/*Slider for Job Portal start*/}

                    {/*Slider for Event Portal start*/}
                    {this.props.mainH1 === 'PakJazba Event Portal' && <div className="row">
                        <span className="col-md-2"></span>
                        <div className="col-md-5 col-sm-12 col-xs-12">
                            <h3 className="text-h1" style={{ fontSize: '36px', fontWeight: 'bold', color: 'black', textAlign: 'left' }}>{this.props.mainH1}</h3>
                            <form>
                                <div className="single">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Search" onChange={this.onChange.bind(this)} />
                                        <span className="input-group-btn">
                                            <button disabled={this.props.showBtn} className="btn btn-theme" type="submit" style={{ backgroundColor: '#37a99b', color: 'white', height: '34px' }} onClick={this.searchText}><i class="fa fa-search" /></button>
                                        </span>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-5 col-sm-6 hidden-xs">
                            <img src="../images/job-icons/uper-art.png" style={{ width: '55%' }} />
                        </div>
                    </div>}
                   
                </div>
                {/*=====================roomRenting start==================*/}
                {/*<!-- Header Start -->*/}
                {this.props.mainH1 === "PakJazba Room Renting" && <div className="row">
                    <span className="col-md-2"></span>
                    <div className="col-md-5 col-sm-12 col-xs-12">
                        <h3 className="text-h1" style={{ fontSize: '36px', fontWeight: 'bold', color: 'black', textAlign: 'left' }}>{this.props.mainH1}</h3>
                        <form>
                            <div className="single">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search"
                                        style={{ height: '40px' }}
                                        onChange={this.onChange.bind(this)} />
                                    <span className="input-group-btn">
                                        <button className="btn btn-theme" type="submit"
                                            style={{ backgroundColor: '#37a99b', color: 'white' }}
                                            onClick={this.searchText}>
                                            <i className="fa fa-search" />
                                        </button>
                                    </span>
                                </div>
                                <div className="row">
                                    <div className="col-md-7 col-sm-8">
                                        <h4 style={{ marginTop: "4px", marginLeft: "-12px" }}>Looking for tenant or a roommate?</h4>
                                    </div>
                                    <div className="col-md-5 col-sm-4">
                                        <button className="header_button" onClick={this.postRoom} style={{ backgroundColor: "rgb(55, 169, 155)" }}>Post Your Room</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-5 col-sm-6 hidden-xs hidden-sm">
                        <img src="../images/room icon/room_header.png" style={{ width: '65%' }} />
                    </div>
                </div>}
                {/*<!-- Header End -->*/}

                {/*=====================Ecommerce start==================*/}

                {this.props.mainH1 === "Pakjazba Ecommerce" && 
                    <div className="row">
                        <span className="col-md-2"></span>
                        <div className="col-md-12 col-sm-12 col-xs-12">
                        
                            <form>
                                <div className="single">
                                    <div>
                                        <Radio.Group onChange={this.props.onChange} value={this.props.searchBy}>
                                            <Radio value={'product'}>Product Name</Radio><br/><br/>
                                            <Radio value={'shop'}>Shop Name</Radio>
                                        </Radio.Group>
                                    </div><br/>
                                    <div className="input-group">
                                        <input type="text" className="form-control"
                                            placeholder="Search" style={{ height: '42px' }}
                                            onChange=
                                            {e => this.props.searcProduct(e)}
                                        />
                                        <span className="input-group-btn">
                                            <button className="btn btn-theme"
                                                type="submit"
                                                style={{ backgroundColor: '#37a99b', color: 'white' }}
                                                onClick={this.props.searchProduct}>
                                                <i className="fa fa-search" />
                                            </button>
                                        </span>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12">
                                            {this.props.checkRadioBtn ?
                                                <div>
                                                    <h4
                                                        style={{ marginTop: "4px", marginLeft: "-12px", color: 'red' }}
                                                    >
                                                        Please Select radio button first
                                            </h4>
                                                </div>
                                                : null}
                                        </div>
                                        <div className="col-md-12 col-sm-12">
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                }
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return ({
        text: state.text
    })
}

export default connect(mapStateToProps)(Slider);
