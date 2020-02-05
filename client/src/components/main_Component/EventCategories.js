import React, { Component } from 'react';
import './EventCategories.css';
import { connect } from 'react-redux';

class EventCategories extends Component{
    constructor(props){
        super(props);
        this.clickItem = this.clickItem.bind(this);
    }

    clickItem(item){
        const { dispatch } = this.props;
        var inputValue = item;
        dispatch({type: 'SEARCHON', inputValue})
    }

    render(){
        return(
            <div className="container" style={{width:"90%"}}>
                <h2 style={{textAlign:"center", fontWeight:"bold", marginTop:"20px"}}> Event Categories </h2>
                <div className="row">
                <div className="col-md-1"></div>
                    <div className="col-md-2 col-sm-3">
                        <div className="wrimagecard wrimagecard-topimage">
                            <div className="wrimagecard-topimage_header" onClick={() => {this.clickItem('exhibition')}}>
                                <center>
                                    <img src="../images/new event icons/exibition.png" alt='img' style={{width: "100%"}}/>
                                </center>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-3">
                        <div className="wrimagecard wrimagecard-topimage">
                            <div className="wrimagecard-topimage_header" onClick={() => {this.clickItem('fashion')}}>
                                <center>
                                    <img src="../images/new event icons/fashion.png" alt='img' style={{width: "100%"}}/>
                                </center>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-3">
                        <div className="wrimagecard wrimagecard-topimage">
                            <div className="wrimagecard-topimage_header" onClick={() => {this.clickItem('film')}}>
                                <center>
                                    <img src="../images/new event icons/film.png" alt='img' style={{width: "100%"}}/>
                                </center>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-3">
                        <div className="wrimagecard wrimagecard-topimage">
                            <div className="wrimagecard-topimage_header" onClick={() => {this.clickItem('food')}}>
                                <center>
                                    <img src="../images/new event icons/food.png" alt='img' style={{width: "100%"}}/>
                                </center>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 col-sm-3">
                        <div className="wrimagecard wrimagecard-topimage">
                            <div className="wrimagecard-topimage_header" onClick={() => {this.clickItem('music')}}>
                                <center>
                                    <img src="../images/new event icons/music.png" alt='img' style={{width: "100%"}}/>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(EventCategories);
