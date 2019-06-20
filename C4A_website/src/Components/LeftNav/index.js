import React, { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';

import styles from './style.css';

const SubMenu = Menu.SubMenu;
const Sider = Layout.Sider;

class LeftNav extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menus: [
        {
          name: "my exercices",
          icon: "user",
          submenus: [
            {
              name: "exo1"
            },
            {
              name: "exo2"
            }
          ]
        },
        {
          name: "forked exercices",
          icon: "user",
          submenus: [
            {
              name: "exobb"
            },
            {
              name: "exoaa"
            }
          ]
        },
        {
          name: "create exercice",
          icon: "user"
        }
      ]
    }
  }

  render() {
    var menus = [];
    for(var menu in this.state.menus) {
      if(!this.state.menus[menu].submenus){
        menus.push(
          <Menu.Item key={"menu" + menu}>
            <Icon type={this.state.menus[menu].icon} />
            <span>{this.state.menus[menu].name}</span>
          </Menu.Item>
        );
      }
      else {
        var submenus = [];
        for(var submenu in this.state.menus[menu].submenus) {
          submenus.push(
            <Menu.Item key={"menu" + menu + "sub" + submenu}>{this.state.menus[menu].submenus[submenu].name}</Menu.Item>
          );
        }
        menus.push(
          <SubMenu
            key={"menu" + menu}
            title={
              <span>
                <Icon type={this.state.menus[menu].icon} />
                {this.state.menus[menu].name}
              </span>
            }
          >
          {submenus}
        </SubMenu>
        );
      }
    }

    return (
      <Sider width={200} style={{ background: '#fff' }}>
      <Menu
        mode="inline"
        /*defaultSelectedKeys={['0']}
        defaultOpenKeys={['0']}*/
        style={{ height: '100%' }}
      >
        {menus}
      </Menu>
    </Sider>
    );
  }
}

export default LeftNav;