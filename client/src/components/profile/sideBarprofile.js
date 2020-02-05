import React, { Component } from 'react';
import './sideBarprofile.css';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

class ProfileSidebar extends Component {
       
    handleClick = (e) => {
      this.props.onChange(e.domEvent.target.id)
    }

    render(){
        return(
            <Menu
                onClick={this.handleClick}
                style={{ width: 256, height: 270 }}
                defaultSelectedKeys={['1']}
                mode="inline"
            >
                <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Listing</span></span>}>
                    <Menu.Item key="1" id="businessData">Business Listing</Menu.Item>
                    <Menu.Item key="2" id="roomRentData">Room Renting</Menu.Item>
                    <Menu.Item key="3" id="buySellData">Buy & Sell</Menu.Item>
                    <Menu.Item key="4" id="jobListData">Job Listing</Menu.Item>
                    <Menu.Item key="5" id="eventPortalData">Event Portal</Menu.Item>
                    <Menu.Item key="6" id="ecommerce">E Commerce</Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
}

export default ProfileSidebar;
