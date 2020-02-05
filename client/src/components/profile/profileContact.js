import React, { Component } from 'react';

class ProfileContact extends Component{
  
    render(){
        const { email, phone } = this.props.contactDetail;
        return(
            <div className="Hello">
                <h2> Contact </h2>
                <div className="row" style={{padding:"0"}}>
                    <div className="col-md-4">
                        Email:
                    </div>
                    <div className="col-md-8">
                        {email}
                    </div>
                    <div className="col-md-4">
                        Mobile:
                    </div>
                    <div className="col-md-8">
                        {phone}
                    </div>                  
                </div>
            </div>
        )
    }
}

export default ProfileContact;
