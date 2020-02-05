import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import RatingStars from '../../main_Component/RatingStars';
import './mobilemenu.css';

const SubMenu = Menu.SubMenu;

class MobileMenu extends Component{
  rootSubmenuKeys = ['sub1', 'sub2', 'sub3','sub4','sub5','sub5'];



  state = {
    openKeys: ['sub1','sub2','sub3','sub4','sub5','sub5'],
  };

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  render(){
    return(

      <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        style={{ width: 256  }}
      >
      <h3 style={{fontWeight:"bold"}}> Show Result </h3>
        <SubMenu key="sub1" title={<span><span className="headingbold">Electronics</span></span>}>
        <ol> Accesories & Supplies </ol>
        <ol> Camera & Photo </ol>
        <ol> Car & Vehicle Electronics </ol>
        <ol> Cell Phones & Accesories</ol>
        <ol> Computers & Accesories</ol>
        <ol> GPS, Finders & Accesories </ol>
        <ol> Headphones </ol>
        <ol> Home Audio </ol>
        <ol> Office Electronics </ol>
        <ol> Portable Audio & Video </ol>
        <ol> Security & Surveillance </ol>
        <ol> Televison & Video </ol>
        <ol> Video Game Consoles & Accesories </ol>
        <ol> eBook Readers & Accesories</ol>
        </SubMenu>
        <hr/>
        <SubMenu key="sub2" title={<span><span className="headingbold">Refined By</span></span>}>
          <div>
            <h5 style={{fontWeight:"bold"}}> Featured Brands </h5>
              <ol> Accesories & Supplies </ol>
              <ol> Camera & Photo </ol>
              <ol> Car & Vehicle Electronics </ol>
              <ol> Cell Phones & Accesories</ol>
              <ol> Computers & Accesories</ol>
              <ol> GPS, Finders & Accesories </ol>
              <ol> Headphones </ol>
              <ol> Home Audio </ol>
              <ol> Office Electronics </ol>
              <ol> Portable Audio & Video </ol>
              <ol> Security & Surveillance </ol>
              <ol> Televison & Video </ol>
              <ol> Video Game Consoles & Accesories </ol>
              <ol> eBook Readers & Accesories</ol>
          </div>
        </SubMenu>
        <SubMenu key="sub3" title={<span><span className="headingbold">Avg. Customer Review</span></span>}>
          <RatingStars/>
          <RatingStars/>
          <RatingStars/>
          <RatingStars/>


        </SubMenu>
        <SubMenu key="sub4" title={<span><span className="headingbold">Avg. Customer Review</span></span>}>
          <ol> New Arrivals</ol>
        </SubMenu>

        <SubMenu key="sub5" title={<span><span className="headingbold">Condition</span></span>}>
          <ol> New </ol>
          <ol> Used </ol>
        </SubMenu>

        <SubMenu key="sub6" title={<span><span className="headingbold">Price</span></span>}>

        </SubMenu>

      </Menu>

    )
  }
}

export default MobileMenu;
