import  { PureComponent, Fragment } from 'react'
import { Pagination } from 'antd';
import { connect } from 'dva'
import { pathMatchRegexp, queryAncestors } from 'utils'
import styles from './Pagination.less'

@connect(({ app, loading }) => ({ app, loading }))
class Pagation extends PureComponent {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this);
  }
  onChange(pageNumber) {
    this.props.onChange(pageNumber)
  }
  render() {
    const { app, pagination} = this.props
    const {
      collapsed
    } = app
    return (
      <div className={styles.Pagination} style={{left:collapsed ? '126px':'300px'}} >
        <Pagination    onChange={this.onChange} current={pagination.current} total={pagination.total} />{this.props.children}
      </div>
    )
  }
}


export default Pagation
