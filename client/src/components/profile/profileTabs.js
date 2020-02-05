import React, { Component } from 'react';
import ProfileContact from './profileContact';
import ProfileListing from './profileListing';
import { Tabs, Radio } from 'antd';

const TabPane = Tabs.TabPane;

class ProfileTabs extends Component{

  constructor(props) {
     super(props);
     this.state = {
       mode: 'top'
     };
   }

   handleModeChange = (e) => {
     const mode = e.target.value;

     this.setState({ mode });
   }

  render(){
    const { mode } = this.state,
    { email, phone, userId, listing } = this.props.profileTabData;

    return(
      <div className="container" style={{width:"70%"}}>
        <div className="row">

          
              <div className="col-md-12 hidden-xs" style={{marginLeft:"-10px"}}>
                  <div className="tab" role="tabpanel">
                      <ul className="nav nav-tabs" role="tablist">
                          <li role="presentation" className="active"><a href="#Section1" aria-controls="home" role="tab" data-toggle="tab">Business</a></li>
                          <li role="presentation"><a href="#Section2" aria-controls="listing" role="tab" data-toggle="tab">Room Rental</a></li>
                          <li role="presentation"><a href="#Section3" aria-controls="listing" role="tab" data-toggle="tab">Buy & Sell</a></li>
                          <li role="presentation"><a href="#Section4" aria-controls="listing" role="tab" data-toggle="tab">Jobs</a></li>
                          <li role="presentation"><a href="#Section5" aria-controls="listing" role="tab" data-toggle="tab">Education</a></li>
                          <li role="presentation"><a href="#Section6" aria-controls="listing" role="tab" data-toggle="tab">Entertainment</a></li>
                      </ul>
                  </div>
              </div>
              <div className="visible-xs">
                <div className="tab" role="tabpanel">
                  <div className="nav nav-tabs" role="tablist">
                    <Tabs
                      defaultActiveKey="1"
                      tabPosition={mode}
                    >
                      <TabPane tab="Business" key="1"><a href="#Section1" 
                      aria-controls="home" role="tab" data-toggle="tab"></a></TabPane>
                      <TabPane tab="Room Rental" key="2"><a href="#Section2" 
                      aria-controls="profile" role="tab" data-toggle="tab"></a></TabPane>
                      <TabPane tab="Buy & Sell" key="2"><a href="#Section3" 
                      aria-controls="profile" role="tab" data-toggle="tab"></a></TabPane>
                      <TabPane tab="Jobs" key="2"><a href="#Section4" 
                      aria-controls="profile" role="tab" data-toggle="tab"></a></TabPane>
                      <TabPane tab="Education" key="2"><a href="#Section5" 
                      aria-controls="profile" role="tab" data-toggle="tab"></a></TabPane>
                      <TabPane tab="Entertainment" key="2"><a href="#Section6" 
                      aria-controls="profile" role="tab" data-toggle="tab"></a></TabPane>
                    </Tabs>
                  </div>
                </div>
              </div>
          </div>
        
          <div className="tab-content" style={{marginLeft:"30px"}}>
              <div role="tabpanel" className="tab-pane fade in active" id="Section1">
                <ProfileContact contactDetail={{ email, phone }}/> 
              </div>
              <div role="tabpanel" className="tab-pane fade" id="Section2">
                 <ProfileListing userId={userId} listing={listing}/>
              </div>
          </div>
      </div>
    )
  }
}

export default ProfileTabs;
