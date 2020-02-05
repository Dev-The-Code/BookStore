import React, { Component } from 'react';
import VitalInfo from './EvitalInfo';
import OfferInfo from './OfferInfo';
import ImageForm from './imageForm';
import DescriptionForm from './descriptionForm';
import KeywordsForm from './keywordsForm';
import './ecomtabs.css';
import { Tabs } from 'antd';
import { HttpUtils } from '../../../Services/HttpUtils';
import { Redirect } from 'react-router';


const TabPane = Tabs.TabPane;
var steps = 1

class EcomTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'top',
      evitalInfo: true,
      offerInfo: false,
      images: false,
      description: false,
      keywords: false,
      herfSec: '',
      draftStatus: '',
      submitStatus: '',
      formStep: '',
      objectId: '',
      allTabs: ['evitalInfo',],
      msg: false,
      isData: true,
      objData: {},
      shopId: '',
      shopName: ''
    };
  }


  componentDidMount() {
    const { allTabs } = this.state
    let data = this.props.data;
    if (data._id != undefined) {
      data.objectId = data._id
      allTabs.length = 0
      for (var i = 0; i < data.allTabs.length; i++) {
        allTabs.push(data.allTabs[i])
      }
      this.setState({ allTabs: [...allTabs], objData: data[0], shopId: data.shopId, shopName: data.shopName })
      localStorage.setItem('updateData', JSON.stringify(data));
    }
    else {
      this.setState({
        shopId: data.shopId,
        shopName: data.shopTitle
      })
    }
  }

  handleProps = async (values, key) => {
    let { allTabs, objectId, shopId, shopName } = this.state;
    var user = JSON.parse(localStorage.getItem('user'));
    var updateData = localStorage.getItem('updateData');
    values.user_Id = user._id;
    values.profileId = user.profileId;
    values.shopId = shopId;
    values.shopName = shopName;
 
    if (updateData !== undefined && updateData !== 'undefined' && updateData != null) {
      var updateData = JSON.parse(localStorage.getItem('updateData'));
      values.objectId = updateData.objectId;
    } else {
      values.objectId = objectId;
    }
    allTabs.push(key);
    values.allTabs = allTabs;

    if (this.state.draftStatus === 'draft') {
      values.status = this.state.draftStatus
    }
    else if (this.state.submitStatus === 'submit') {
      values.status = this.state.submitStatus
    }

    let responseEcommreceData = await HttpUtils.post('postecommercedata', values)
    if (responseEcommreceData.code === 200) {
      if (objectId === '') {
        this.setState({ allTabs, objectId: responseEcommreceData.content._id, objData: responseEcommreceData.content[0] })
      }
      else {
        responseEcommreceData.content.map((k, index) => {
          this.setState({ allTabs, objectId: responseEcommreceData.content[index]._id, objData: responseEcommreceData.content[0] })
        })
      }
      responseEcommreceData.content.objectId = objectId
      await localStorage.setItem('formData', JSON.stringify(responseEcommreceData.content[0]));
    }
  }

  statusFormDraft = () => {
    this.setState({
      draftStatus: "draft",
      formStep: steps
    })
    steps++;
  }

  statusFormSubmit = () => {
    this.setState({
      submitStatus: 'submit',
      formStep: steps
    })
    steps++;
  }

  offerStates = () => {
    this.setState({
      offerInfo: true,
      evitalInfo: false,
    })
  }
  imgStates = () => {
    this.setState({
      images: true,
      offerInfo: false
    })
  }
  desStates = () => {
    this.setState({
      description: true,
      images: false
    })
  }
  keywordStates = () => {
    this.setState({
      keywords: true,
      description: false
    })
  }
  redirectPage = () => {
    this.setState({
      msg: true
    })
    localStorage.removeItem('updateData');

  }

  render() {
    const { mode, allTabs, evitalInfo, offerInfo, images, description, keywords, herfSec, objData } = this.state;
    if (this.state.msg === true) {
      return <Redirect to={{ pathname: `/products_DetailStyle/${objData._id}`, state: objData }} />
    }
    return (
      <div className>
        <div className="container">
          <div className="row">
            <div className="col-md-12 hidden-xs">
              <div className="tab" role="tabpanel">
                <ul className="nav nav-tabs" role="tablist">
                  <li role="presentation" className={evitalInfo ? 'active' : allTabs.includes('evitalInfo') ? '' : 'disableTabs'}>
                    <a href="#Section1" aria-controls="home"
                      disabled={allTabs.includes('evitalInfo') ? false : true}
                      role="tab" data-toggle="tab">
                      Vital Info</a>
                  </li>
                  <li role="presentation" className={offerInfo ? 'active' : allTabs.includes('offerInfo') ? '' : 'disableTabs'}>
                    <a href="#Section2" aria-controls="profile"
                      disabled={allTabs.includes('offerInfo') ? false : true}
                      role="tab" data-toggle="tab">
                      Offer</a>
                  </li>
                  <li role="presentation" className={images ? 'active' : allTabs.includes('images') ? '' : 'disableTabs'}>
                    <a href="#Section3" aria-controls="messages"
                      disabled={allTabs.includes('images') ? false : true}
                      role="tab" data-toggle="tab">
                      Images</a>
                  </li>
                  <li role="presentation" className={description ? 'active' : allTabs.includes('description') ? '' : 'disableTabs'}>
                    <a href="#Section4" aria-controls="messages"
                      disabled={allTabs.includes('description') ? false : true}
                      role="tab" data-toggle="tab">
                      Description</a>
                  </li>
                  <li role="presentation" className={keywords ? 'active' : allTabs.includes('keywords') ? '' : 'disableTabs'}>
                    <a href="#Section5" aria-controls="messages"
                      disabled={allTabs.includes('keywords') ? false : true}
                      role="tab" data-toggle="tab"
                    >Keywords</a>
                  </li>
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
                    <TabPane tab="Vital Info" key="1">
                      <a href="#Section1" aria-controls="home" role="tab" data-toggle="tab">
                        Vital Info
                      </a></TabPane>
                    <TabPane tab="Offer" disabled key="2" >
                      Offer</TabPane>
                    <TabPane tab="Images" key="3">
                      <a href="#Section3" aria-controls="messages" role="tab" data-toggle="tab">
                        Images</a></TabPane>
                    <TabPane tab="Description" key="4">Description</TabPane>
                    <TabPane tab="Keywords" key="5">
                      <a href="#Section3" aria-controls="messages" role="tab" data-toggle="tab">
                        Keywords</a></TabPane>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container" style={{ width: "100%" }}>
          <div class="tab-content">
            <div role="tabpanel" class="tab-pane fade in active" id="Section1">
              <VitalInfo
                handleProps={this.handleProps}
                offerStates={this.offerStates}
                statusFormDraft={this.statusFormDraft}
                statusFormSubmit={this.statusFormSubmit}
                data={this.props.data}
              />
            </div>
            <div role="tabpane2" class="tab-pane fade " id="Section2">
              <OfferInfo
                handleProps={this.handleProps}
                imgStates={this.imgStates}
                statusFormDraft={this.statusFormDraft}
                statusFormSubmit={this.statusFormSubmit}
                data={this.props.data}
              />
            </div>
            <div role="tabpane3" class="tab-pane fade " id="Section3">
              <ImageForm
                handleProps={this.handleProps}
                desStates={this.desStates}
                statusFormDraft={this.statusFormDraft}
                statusFormSubmit={this.statusFormSubmit}
                data={this.props.data}
              />
            </div>
            <div role="tabpane4" class="tab-pane fade" id="Section4">
              <DescriptionForm
                handleProps={this.handleProps}
                keywordStates={this.keywordStates}
                statusFormDraft={this.statusFormDraft}
                statusFormSubmit={this.statusFormSubmit}
                data={this.props.data}
              />
            </div>
            <div role="tabpane5" class="tab-pane fade" id="Section5">
              <KeywordsForm
                handleProps={this.handleProps}
                statusFormDraft={this.statusFormDraft}
                statusFormSubmit={this.statusFormSubmit}
                data={this.props.data}
                redirectPage={this.redirectPage}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EcomTabs;
