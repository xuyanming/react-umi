import  { PureComponent } from 'react'
import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
import { Color } from 'utils'
import { Page, ScrollBar } from 'components'
import styles from './index.less'


class Dashboard extends PureComponent {
  render() {
    
    return (
      <Page
        // loading={loading.models.dashboard && sales.length === 0}
        className={styles.dashboard}
      >
      </Page>
    )
  }
}

export default Dashboard
