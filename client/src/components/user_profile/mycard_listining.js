import React, { Component } from 'react';



class MycardListining extends Component{

	render(){
		return(
				<div>
					<div className="row">
						<div className="col-md-2">
							<div className="form-group">
							  	<label for="sel1">Sort By:</label>
							</div>
						</div>	
						<div className="col-md-10">  
						  <select className="form-control" id="sel1" style={{"width": "26%"}}>
						    <option>Default Sorting</option>
						    <option>Newest First</option>
						    <option>Oldest First</option>
						  </select>
						</div>
					</div>
				{/*==========================Item=============================================*/}
				</div>
			)
	}
}

export default MycardListining;