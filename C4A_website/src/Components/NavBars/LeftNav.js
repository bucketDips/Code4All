import React, { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';

import styles from './style.css';
import { cpus } from 'os';

const SubMenu = Menu.SubMenu;
const Sider = Layout.Sider;

class LeftNav extends Component {

  state = {
    collapsed: false,
  };

  onClick(action) {
    var content = action();
    this.setState({
      collapsed: true,
      content: content
    });
  }

  reinitMenus() {
    var menus = [];
    for(var menu in this.props.menus) {
      if(!this.props.menus[menu].submenus){
        menus.push(
          <Menu.Item key={"menu" + menu} onClick={this.onClick.bind(this, this.props.menus[menu].action)}>
            <Icon type={this.props.menus[menu].icon} />
            <span>{this.props.menus[menu].name}</span>
          </Menu.Item>
        );
      }
      else {
        var submenus = [];
        for(var submenu in this.props.menus[menu].submenus) {
          submenus.push(
            <Menu.Item key={"menu" + menu + "sub" + submenu}>{this.props.menus[menu].submenus[submenu].name}</Menu.Item>
          );
        }
        menus.push(
          <SubMenu
            key={"menu" + menu}
            title={
              <span>
                <Icon type={this.props.menus[menu].icon} />
                <span>{this.props.menus[menu].name}</span>
              </span>
            }
          >
          {submenus}
        </SubMenu>
        );
      }
    }
    return menus;
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    var content = this.state.content === undefined ? this.props.content : this.state.content;
    var menus = this.reinitMenus();

    return (
      <Layout>
        <Sider style={{ background: '#fff' }} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <Menu
            mode="inline"
            /*defaultSelectedKeys={['0']}
            defaultOpenKeys={['0']}*/
            style={{ height: '100%' }}
          >
            {menus}
          </Menu>
        </Sider>
        <Layout>
          {content}
        </Layout>
      </Layout>
    );
  }
}

export default LeftNav;