import React, { Component } from 'react';

class RatingStars extends Component{
  render(){
    return(
      <div>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <p style={{display:"inline-block", marginLeft:"10px"}}> Ratings </p>
      </div>

    )
  }
}

export default RatingStars;
