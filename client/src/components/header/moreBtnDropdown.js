import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';

class Dropdowns extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    render() {
        
        const moreMenu = (
            <Menu style={{ color: 'black' }}>
                <Menu.Item key="1" >About us</Menu.Item>
                <Menu.Item key="2" >Contact us</Menu.Item>
            </Menu>
        );

        return (
            <Dropdown overlay={moreMenu} style={{ color: 'white', marginTop: '-23px' }}>
                <a className="ant-dropdown-link">
                    More<Icon type="down" />
                </a>
            </Dropdown>
        )
    }
}

export default Dropdowns;
