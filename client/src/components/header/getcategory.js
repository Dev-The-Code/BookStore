import React, { Component } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { Link } from 'react-router-dom';
// import axios from 'axios';


class getCategory extends Component {

    render() {
        const menu = (
            <Menu >
                <Menu.Item>
                    <Link rel="noopener noreferrer" to={`/postad_business`}>Publish Your Business</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link rel="noopener noreferrer" to={`/postad_Roommates`}>Roommates / Rentals</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link rel="noopener noreferrer" to={`/postad_buysell`}>Buy & Sell</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link rel="noopener noreferrer" to={`/postad_jobPortal`}>Job Portal</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link rel="noopener noreferrer" to={`/postad_eventPortal`}>Organize an Event</Link>
                </Menu.Item>
                {/* <Menu.Item>
                    <Link  rel="noopener noreferrer" to={`/Forms_Ecommerce`}>Publish Your Product</Link>
                </Menu.Item> */}
                <Menu.Item>
                    <Link rel="noopener noreferrer" to={`/shopForm`}>Create Shop</Link>
                </Menu.Item>
            </Menu>
        );

        return (
            <div>
                 <Link rel="noopener noreferrer" to={`/add_listing`}>
                        <Button className="headerbuttontop">Post Your Need</Button>
                    </Link> 
                {/* <Dropdown overlay={menu} placement="bottomRight">
                   
                    <Button className="headerbuttontop">Post Your Need</Button>
                </Dropdown> */}
            </div>
        )
    }
}
export default getCategory;
