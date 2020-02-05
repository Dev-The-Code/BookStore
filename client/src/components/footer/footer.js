import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './footer.css'

class Footer extends Component{
    constructor(props){
        super(props);
    }
    render(){
        
        return(
            <footer className={`jazba_footer ${this.props.footerPosition}`}>
                {/*<div className="">
                    <div className="row">
                        <div className="col-sm-3" style={{textAlign:'center'}}>
                            <h5>Get started</h5>
                            <ul>
                                <li style={{marginLeft: '-50px'}}><a href="">Home</a></li>
                                <li style={{marginLeft: '-40px'}}><a href="">Sign up</a></li>
                                <li style={{marginLeft: '-19px'}}><a href="">Downloads</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-2">
                            <h5>About us</h5>
                            <ul>
                                <li><a href="">Company Information</a></li>
                                <li><a href="">Contact us</a></li>
                                <li><a href="">Reviews</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-2">
                            <h5>Support</h5>
                            <ul>
                                <li><a href="">FAQ</a></li>
                                <li><a href="">Help desk</a></li>
                                <li><a href="">Forums</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-2 info">
                            <h5>Information</h5>
                            <p> Lorem ipsum dolor amet, consectetur adipiscing elit. Etiam consectetur aliquet aliquet. Interdum et malesuada fames ac ante ipsum primis in faucibus. </p>
                        </div>
                        <div className="col-md-3 col-sm-3 col-xs-12" style={{marginTop: '27px'}}>
                            <img src="../images/logo.png" style={{width:'74%'}} />
                        </div>
                    </div>
                </div>*/}
                {/*<div className="second-bar">
                    <div className="container">
                        <h2 className="logo"><a href=""> LOGO </a></h2>
                        <div className="social-icons">
                            <a href="" className="twitter"><i className="fa fa-twitter"></i></a>
                            <a href="" className="facebook"><i className="fa fa-facebook"></i></a>
                            <a href="" className="google"><i className="fa fa-google-plus"></i></a>
                        </div>
                    </div>
                </div>*/}
                <div className="row hidden-xs">
                    <div className="col-md-12 jazba_text_align">
                        <Link to={`/`}>
                            <img alt='' src="../images/footer-logo.png"  />
                        </Link>
                    </div>
                    <div className="row" style={{padding:'0px'}}>
                        <div className="col-md-6" style={{textAlign:'left'}}>
                            <span style={{marginLeft:'55%'}}><b>Contact Us</b></span>
                        </div>
                        <div className="col-md-6" style={{textAlign:'left'}}>
                            <span style={{marginRight:'0',marginLeft:'24%'}}><b>For All Your Local Need</b></span>
                           {/*<span style={{marginLeft:"160px"}}><b>Post Your Need</b></span>*/}
                        </div>
                    </div>
                    <div className="row" style={{padding:'0px'}}>
                        <div className="col-md-6" style={{textAlign:'left'}}>
                            <span style={{marginLeft:'55%',}}><b>info@pakjazba.com</b></span>
                        </div>
                        <div className="col-md-6" style={{textAlign:'left'}}>
                           <span style={{marginLeft:'24%'}}><b>Find expert service providers</b></span>
                           
                        </div>
                    </div>
                    <div className="row" style={{padding:'0px'}}>
                        <div className="col-md-6" style={{textAlign:'left'}}>
                            <span style={{marginLeft:'55%'}}><b>+01 456 7890</b></span>
                        </div>
                        <div className="col-md-6" style={{textAlign:'left'}}>
                        <span className="footerlinks"><Link to={`/privacypolicy`} target="blank" style={{marginLeft:'24%'}}><b>privacy policy</b></Link></span>
                           <span className="footerlinks" style={{marginLeft: '10px'}}><Link to="/termofservice" target="blank" style={{marginLeft:'0%'}}><b>term of service</b></Link></span>
                        </div>
                    </div>
                    {/*<div className="row" style={{padding:'0px'}}>
                        <div className="col-md-6" style={{textAlign:'left'}}>
                            <span style={{marginLeft:'55%'}}></span>
                        </div>
                        <div className="col-md-6" style={{textAlign:'left'}}>
                           <span style={{marginLeft:"160px"}}><b>Get Started Now!</b></span>
                        </div>
                    </div>*/}
                    <div className="row" style={{padding:'0px'}}>
                        <div className="col-md-12" style={{textAlign:'center'}}>
                            <span><b>Follow Us</b></span>
                        </div>
                    </div>
                </div>

                <div className="row visible-xs">
                    <div className="col-md-12 jazba_text_align">
                        <Link to={`/`}>                        
                            <img alt='' src="../images/pakjazba_new.png" style={{width:'50%'}} />
                        </Link>
                    </div>
                    <div className="row" style={{padding:'0px'}}>
                        <div className="col-xs-6" style={{textAlign:'left'}}>
                            <span style={{marginLeft:'5%'}}><b>Contact Us</b></span>
                        </div>
                        <div className="col-xs-6" style={{textAlign:'left'}}>
                            <span style={{marginRight:'0'}}><b>For All Your Local Need</b></span>
                           {/*<span style={{marginRight:'0'}}><b>Post Your Need</b></span>*/}
                        </div>
                    </div>
                    <div className="row" style={{padding:'0px'}}>
                        <div className="col-xs-6" style={{textAlign:'left'}}>
                            <span style={{marginLeft:'5%'}}><b>info@pakjazba.com</b></span>
                        </div>
                        <div className="col-xs-6" style={{textAlign:'left'}}>
                           <span style={{marginRight:'0'}}><b>Find expert service providers</b></span>
                           <span><Link to={`/privacypolicy`} target="blank" style={{color:'#666666'}}>privacy policy</Link></span>
                           <span><Link to="/termofservice" target="blank" style={{color:'#666666'}}>term of service</Link></span>
                        </div>
                    </div>
                    <div className="row" style={{padding:'0px'}}>
                        <div className="col-xs-6" style={{textAlign:'left'}}>
                            <span style={{marginLeft:'5%'}}><b>+01 456 7890</b></span>
                        </div>
                        <div className="col-xs-6" style={{textAlign:'left'}}>
                           {/*<span style={{marginRight:'0'}}><b>For All Your Local Need</b></span>*/}
                        </div>
                    </div>
                    {/*<div className="row" style={{padding:'0px'}}>
                        <div className="col-xs-6" style={{textAlign:'left'}}>
                            <span style={{marginLeft:'5%'}}></span>
                        </div>
                        <div className="col-xs-6" style={{textAlign:'left'}}>
                           <span style={{marginRight:'0'}}><b>Get Started Now!</b></span>
                        </div>
                    </div>*/}
                    <div className="row" style={{padding:'0px'}}>
                        <div className="col-xs-12" style={{textAlign:'center'}}>
                            <span><b>Follow Us</b></span>
                        </div>
                    </div>
                </div>

                <div className="row" style={{padding:'0px'}}>
                    <div className="col-md-12" style={{textAlign:'center'}}>
                        <a href="https://www.facebook.com" target="_blank" className="fa fa-facebook social_button" style={{width:"40px", height:"40px", color: '#2f55a4'}}><i></i></a>
                        <a href="https://www.linkedin.com" target="_blank" className="fa fa-linkedin social_button" style={{margin:'6px', width:"40px", height:"40px", color: '#2867B2'}}></a>
                        <a href="https://mail.google.com" target="_blank" className="fa fa-google-plus social_button"style={{width:"40px", height:"40px", color: '#db4a39'}}></a>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;
