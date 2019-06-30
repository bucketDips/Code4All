import React, { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';
// eslint-disable-next-line
import styles from '../NavBars/style.css';

const SubMenu = Menu.SubMenu;
const Sider = Layout.Sider;

/**
* correspond to the left navigation in every window,
contained menus and submenus defined in connectedwindows
classes
*/
class LeftNav extends Component {

  state = {
    collapsed: false,
  };

  /**
  * action when clicking on a menu or submenu 
  */
  onClick(action, optional) {
    var tempContent = this.state.content;
    this.setState({
      content: (<div></div>)
    }, () => {
      action(optional).then((actioned) => {
        if(actioned == null) {
          this.setState({
            content: tempContent
          });
          return;
        }
        if(actioned[1] === "collapsed") {
          this.setState({
            collapsed: true,
            content: actioned[0]
          });
        }
        else if(actioned[1] === "not-collapsed") {
          this.setState({
            content: actioned[0]
          });
        }
      });
    });
  }

  /**
  * recreating menus from the menus defined in connectedwindows
  * classes
  */
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
            <Menu.Item key={"menu" + menu + "sub" + submenu} onClick={this.onClick.bind(this, this.props.menus[menu].submenus[submenu].action, this.props.menus[menu].submenus[submenu])}>{this.props.menus[menu].submenus[submenu].name}</Menu.Item>
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

  /**
  * action when collapsing menu
  */
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  /**
  * render method
  */
  render() {
    var content = this.state.content === undefined ? this.props.content : this.state.content;
    var menus = this.reinitMenus();

    return (
      <Layout>
        <Sider style={{ background: '#fff' }} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['menu0']}
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