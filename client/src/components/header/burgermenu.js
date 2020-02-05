import React, { Component } from 'react';
import './burgermenu.css';
import MainLogin from '../header/mainLogin';
import Category from '../header/getcategory';
// import EHeader from '../entertainment/entertainmenthome/entertainmentHeader';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import CartButton from './shoppingCartBtn';


class Burgermenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            hidemenu: false,
        }
    }
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    openNav = () => {
        document.getElementById("myNav").style.width = "100%";
    }
    closeNav = () => {
        document.getElementById("myNav").style.width = "0%";
    }

    renderList = e => {
        let str = this.props.match.path,
            path = str.slice(str.indexOf('/') + 1, str.length);
        if (path !== e) {
            this.props.dispatch({ type: 'GOROUTE', route: true });
            this.setState({ selectRoute: true, route: e });
        }
    }


    render() {
        const { selectRoute, route } = this.state;
        if (selectRoute) {
            return <Redirect to={`/${route}`} />
        }
        return (
            <div>
                <nav className="navbar navbar-fixed-top hidden-xs"
                    style={{ position: "fixed", width: "100%", "zIndex": "999", marginTop: "-15px", border: 'none' }}>
                    <div className="container-fluid">
                        <div className="col-md-2 col-sm-6 col-xs-6">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false" >
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <p onClick={() => this.renderList('')} className="navbar-brand hidden-sm">
                                    <img alt='' src="../images/PakJazbaLogo-01.png" style={{ "width": "100%", marginTop: "32px", marginLeft: '35%', cursor: 'pointer' }} />
                                </p>
                                <Link to={`/`} className="navbar-brand visible-sm">
                                    <img alt='' src="../images/PakJazbaLogo-01.png" style={{ "width": "100%", marginTop: "8px" }} />
                                </Link>

                            </div>
                        </div>
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-4 col-sm-6 col-xs-6">
                            <div className="row">
                                <div className="col-md-7">
                                </div>
                                <div className="col-md-2 col-sm-2 col-xs-12" style={{ marginTop: "26px" }}>
                                    <MainLogin />
                                </div>{/*col-md-4*/}
                                <div className="col-md-2 col-sm-2 col-xs-12" style={{ marginTop: "21px" }}>
                                    <Category />
                                </div>{/*col-md-4*/}
                                <div className="col-md-1 col-sm-2 col-xs-12" style={{ marginTop: "21px" }}>
                                    <Link rel="noopener noreferrer" to={`/checkOutProduct`} style={{ color: 'black', fontSize: '14px' }}>
                                        <CartButton cartCount={this.props.cartCount} />
                                    </Link>
                                </div>
                            </div>{/*row*/}
                        </div>
                    </div>

                    {/* <div className="row hidden-sm">
                        <div style={{ background: 'rgba(236, 236, 236, 0.48)', height: '42px' }}>
                            <span type="" name='room' ghost className="button_globalclassName col-md-2 col-sm-2 global_submenu">
                                <p rel="noopener noreferrer" onClick={() => this.renderList('market_roommates')} style={{ color: 'black', fontSize: '14px', cursor: 'pointer' }}>Room Renting</p>
                            </span>
                            <span type="" name='bussiness' ghost className="button_globalclassName col-md-2 col-sm-2 global_submenu">
                                <p rel="noopener noreferrer" onClick={() => this.renderList('market_business')} style={{ color: 'black', fontSize: '14px', cursor: 'pointer' }}>Business Listing</p>
                            </span>
                            <span type="" name='buySell' ghost className="button_globalclassName col-md-2 col-sm-2 global_submenu">
                                <p rel="noopener noreferrer" onClick={() => this.renderList('market_classified')} style={{ color: 'black', fontSize: '14px', cursor: 'pointer' }}>Buy & Sell</p>
                            </span>
                            <span type="" name='buySell' ghost className="button_globalclassName col-md-2 col-sm-2 global_submenu">
                                <p rel="noopener noreferrer" onClick={() => this.renderList('market_jobPortal')} style={{ color: 'black', fontSize: '14px', cursor: 'pointer' }}>Job Portal</p>
                            </span>
                            <span type="" name='events' ghost className="button_globalclassName col-md-2 col-sm-2 global_submenu">
                                <p rel="noopener noreferrer" onClick={() => this.renderList('market_eventPortal')} style={{ color: 'black', fontSize: '14px', cursor: 'pointer' }}>Events</p>
                            </span>
                            <span type="" name='events' ghost className="button_globalclassName col-md-2 col-sm-2 global_submenu">
                                <p rel="noopener noreferrer" onClick={() => this.renderList('entertainment_Home')} style={{ color: 'black', fontSize: '14px', cursor: 'pointer' }}>Entertainment</p>
                            </span>
                            <span type="" name='events' ghost className="button_globalclassName col-md-2 col-sm-2 global_submenu">
                                <p rel="noopener noreferrer" onClick={() => this.renderList('market_ecommerceMarket')} style={{ color: 'black', fontSize: '14px', cursor: 'pointer' }}>Ecommerce</p>
                            </span>
                            <span type="" name='events' ghost className="button_globalclassName col-md-2 col-sm-2 global_submenu">
                                <p rel="noopener noreferrer" onClick={() => this.renderList('EcommerceProfile')} style={{ color: 'black', fontSize: '14px', cursor: 'pointer' }}>Profile</p>
                            </span>
                        </div>
                        {this.props.entertainment && <div className="row" className="hidden-sm">
                            <EHeader entertainment={this.props.entertainment} />
                        </div>}
                    </div> */}
                    {/* <div className="row hidden-sm">
                        <div style={{ width: '96%', height: '42px', marginLeft: '16px' }}>
                            <span type="" name='room' ghost className="button_globalclassName col-md-2 col-sm-2">
                                <Link rel="noopener noreferrer" to={`/market_roommates`} style={{ color: 'black', fontSize: '14px' }}>Room Renting</Link>
                            </span>
                            <span type="" name='bussiness' ghost className="button_globalclassName col-md-2 col-sm-2">
                                <Link rel="noopener noreferrer" to={`/market_business`} style={{ color: 'black', fontSize: '14px' }}>Business Listing</Link>
                            </span>
                            <span type="" name='buySell' ghost className="button_globalclassName col-md-2 col-sm-2">
                                <Link rel="noopener noreferrer" to={`/market_classified`} style={{ color: 'black', fontSize: '14px' }}>Buy & Sell</Link>
                            </span>
                            <span type="" name='buySell' ghost className="button_globalclassName col-md-2 col-sm-2">
                                <Link rel="noopener noreferrer" to={`/market_jobPortal`} style={{ color: 'black', fontSize: '14px' }}>Job Portal</Link>
                            </span>
                            <span type="" name='events' ghost className="button_globalclassName col-md-2 col-sm-2">
                                <Link rel="noopener noreferrer" to={`/market_eventPortal`} style={{ color: 'black', fontSize: '14px' }}>Events</Link>
                            </span>
                            <span type="" name='events' ghost className="button_globalclassName col-md-2 col-sm-2">
                                <Link rel="noopener noreferrer" to={`/entertainment_Home`} style={{ color: 'black', fontSize: '14px' }}>Entertainment</Link>
                            </span>
                        </div>
                        {this.props.entertainment && <div className="row" className="visible-sm">
                            <EHeader entertainment={this.props.entertainment} />
                        </div>}
                    </div> */}
                </nav>
                {/*=============================================visible xs============================================*/}
                <div id="myNav" className="overlay visible-xs navbar-fixed-top" style={{}}>
                    <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav} style={{ marginTop: '-8%' }}>&times;</a>
                    <div className="overlay-content">
                        <div className="row">
                            <div className="col-xs-6">
                                <MainLogin />
                            </div>{/*col-md-4*/}
                            <div className="col-xs-6">
                                <Category />
                            </div>{/*col-md-4*/}
                            <div className="col-xs-6">
                                <Link rel="noopener noreferrer" to={`checkOutProduct`} style={{ color: 'black', fontSize: '14px' }}>
                                    <CartButton cartCount={this.props.cartCount} />
                                </Link>
                            </div>
                        </div>{/*row*/}
                        <span>
                            <Link rel="noopener noreferrer" to={`/market_roommates`} onClick={this.closeNav}>Room Renting</Link>
                        </span>
                        <span style={{ marginTop: "8px" }}>
                            <Link rel="noopener noreferrer" to={`/market_business`}>Business Listing</Link>
                        </span>
                        <span style={{ marginTop: "8px" }}>
                            <Link rel="noopener noreferrer" to={`/market_classified`}>Buy & Sell</Link>
                        </span>
                        <span style={{ marginTop: "8px" }}>
                            <Link rel="noopener noreferrer" to={`/market_jobPortal`}>Job Portal</Link>
                        </span>
                        <span style={{ marginTop: "8px" }}>
                            <Link rel="noopener noreferrer" to={'/market_eventPortal'}>Events</Link>
                        </span>
                        <span style={{ marginTop: "8px" }}>
                            <Link rel="noopener noreferrer" to={`/entertainment_Home`}>Entertainment</Link>
                        </span>
                    </div>
                </div>
                <div className="row visible-xs" style={{ background: 'white' }}>
                    <div className="col-md-4 col-xs-4">
                        <i onClick={this.openNav} className="fa fa-bars" style={{ color: 'rgb(3, 42, 48)', marginLeft: '8px', fontSize: '24px', marginTop: '0px', cursor: 'pointer' }}></i>
                    </div>
                    <div className="col-md-4 col-xs-5">
                        <Link to={`/`}><img src="../images/pakjazba_new.png" alt='img' style={{ width: '100%' }} /></Link>
                    </div>
                    <div className="col-md-4 col-xs-3">
                    </div>
                </div>
                {/* {this.props.entertainment && <div className="row" className="visible-xs">
                    <EHeader entertainment={this.props.entertainment} />
                </div>} */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        route: state.route
    });
}

export default withRouter(connect(mapStateToProps)(Burgermenu));
