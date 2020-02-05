import React, { Component } from 'react';
import './addsearch.css';


class AddSearch extends Component{
  render(){
    return(
      <div className="container" style={{width:"70%"}}>
      <div className="addsearchBox">
        <h3>Search for your product's category </h3>
        <div className="row">
          <div className="col-md-9">
            <div className="input-group" style={{width:"100%"}}>
                <input type="text" className="form-control" placeholder="Example: mp3 player, baseball glove, DVD" style={{height:'40px'}}/>
            </div>
          </div>
          <div className="col-md-3">
            <span className="input-group-btn">
                <button className="btn finsearch" type="submit">Find Category</button>
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h5 style={{fontWeight:"bold"}}> The product you are searching may already exist on Pak Jazba </h5>
          </div>
          <div className="col-md-2">
            <span className="input-group-btn">
                <button className="btn finsearch" type="submit">Find on PakJazba</button>
            </span>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default AddSearch;
