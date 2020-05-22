import  { PureComponent, Fragment } from 'react'
import { router } from 'utils'
import { Menu, Icon, Layout, Avatar} from 'antd'
import { pathMatchRegexp, queryAncestors } from 'utils'
import withRouter from 'umi/withRouter'
import classnames from 'classnames'
import styles from './Header.less'

const { SubMenu } = Menu
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_964356_ogw1nfmz0t.js',
});
@withRouter
class Header extends PureComponent {
  handleClickMenu = e => {
    if(e.key === 'SignOut'){
      e.key === 'SignOut' && this.props.onSignOut()
    }else{
      router.push({ pathname: `/${e.key}` })
    }
    
  }
  render() {
    const {
      newRouteList,
      fixed,
      avatar,
      datewite,
      username,
      collapsed,
      onCollapseChange,
      location,
    } = this.props
    // Find a route that matches the pathname.
    const currentRoute = newRouteList.find(
      _ => _.route && pathMatchRegexp(_.route, location.pathname)
    )

    // Find the breadcrumb navigation of the current route match and all its ancestors.
    const paths = currentRoute
      ? currentRoute
      : { id: 404, name: `Not Found`}
        
    const rightContent = [
      // <Menu key="icon-bangzhu" theme='light' mode="horizontal">
      //   <Menu.Item key="bangzhu">
      //     <IconFont type="icon-bangzhu" style={{fontSize:'20px',verticalAlign: 'middle'}} />使用帮助
      //   </Menu.Item>
      // </Menu>,
      <Menu key="icon-bangzhu" theme='light' mode="horizontal" >
        <SubMenu
          title={
            <Fragment>
              <a target="_blank" href="https://www.geshuicloud.com/help.html" >
                <IconFont type="icon-bangzhu" style={{fontSize:'20px',verticalAlign: 'middle'}} />
                <span>使用帮助</span>
              </a>
            </Fragment>
          }
        > 
        </SubMenu>
      </Menu>,
      <Menu key="user" theme='light' mode="horizontal" onClick={this.handleClickMenu}>
        <SubMenu
          title={
            <Fragment>
              <IconFont type="icon-guanliyuan" style={{fontSize:'20px',verticalAlign: 'middle'}} />
              <span>{username}</span>
            </Fragment>
          }
        > 
          <Menu.Item key="company">
          <IconFont type="icon-cop" style={{fontSize:'20px',color:'#FEDC86'}} />企业信息设置
          </Menu.Item>
          <Menu.Item key="resetpass">
          <IconFont type="icon-iconfontmima" style={{fontSize:'20px',color:'#86FEEE'}}/> 修改密码
          </Menu.Item>
          <Menu.Item key="SignOut">
          <IconFont type="icon-tuichu" style={{fontSize:'20px',color:'#FB5B2B'}} />  退出系统
          </Menu.Item>
        </SubMenu>
      </Menu>,
    ]
    return (
      
      <Layout.Header
        className={classnames(styles.header, {
          [styles.fixed]: fixed,
          [styles.collapsed]: collapsed,
        })}
        id="layoutHeader"
      >
        <div
          className={styles.button}
          onClick={onCollapseChange.bind(this, !collapsed)}
        >
          <Icon
            type={classnames({
              'menu-unfold': collapsed,
              'menu-fold': !collapsed,
            })}
          />
        </div>
        <div className={styles.context} ><i></i>{paths.name}<span>{ paths.route == '/todo' ? `-${datewite}` :''}</span></div>
        <div className={styles.rightContainer}>
        
          {rightContent}
        </div>
      </Layout.Header>
    )
  }
}
export default Header
