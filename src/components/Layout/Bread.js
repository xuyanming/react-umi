import { PureComponent, Fragment } from 'react'
import { Breadcrumb, Icon } from 'antd'
import Link from 'umi/navlink'
import withRouter from 'umi/withRouter'
import { pathMatchRegexp, queryAncestors } from 'utils'
import styles from './Bread.less'

@withRouter
class Bread extends PureComponent {
  generateBreadcrumbs = paths => {
    return paths.map((item, key) => {
      const content = (
        <Fragment>
          {item.icon ? (
            <Icon type={item.icon} style={{ marginRight: 4 }} />
          ) : null}
          {item.zhName}
        </Fragment>
      )

      return (
        <Breadcrumb.Item key={key}>
          {paths.length - 1 !== key ? (
            <Link to={item.route || '#'}>{content}</Link>
          ) : (
            content
          )}
        </Breadcrumb.Item>
      )
    })
  }
  render() {
    const { routeList, location, i18n } = this.props

    // Find a route that matches the pathname.
    const currentRoute = routeList.find(
      _ => _.route && pathMatchRegexp(_.route, location.pathname)
    )

    // Find the breadcrumb navigation of the current route match and all its ancestors.
    const paths = currentRoute
      ? queryAncestors(routeList, currentRoute, 'breadcrumbParentId').reverse()
      : [
          routeList[0],
          {
            id: 404,
            name: `Not Found`,
          },
        ]
    return (
      <Breadcrumb className={styles.bread}>
        {this.generateBreadcrumbs(paths)}
      </Breadcrumb>
    )
  }
}


export default Bread
