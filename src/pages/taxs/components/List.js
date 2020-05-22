import  { PureComponent } from 'react'
import { Spin, Row, Col, Checkbox, Button, message } from 'antd'
import { Pagation } from 'components'
import { connect } from 'dva'
import moment from 'moment';
import styles from './List.less'
const info_type=[{name:'子女教育',src:'dbxq_ico_znjy_24x24.svg'}, {name:'赡养老人',src:'dbxq_ico_sylr_24x24.svg'}, {name:'住房租金',src:'dbxq_ico_zfzj_24x24.svg'}, {name:'住房贷款利息',src:'dbxq_ico_zjdklx_24x24.svg'}, {name:'继续教育',src:'dbxq_ico_jxjy_24x24.svg'}, {name:'大病医疗',src:''}]

@connect(({ taxs }) => ({ taxs }))
class List extends PureComponent {
  // state = {
  //   checkedList: [],
  //   indeterminate: false,
  //   checkAll: false,
  // };

  handleClick = (i) => {
    const { onDeleteItem, datatime,allchecked,selectedRowKeys, date } = this.props
    if(i == '2'){
      let months =''
      let years=''
      if(date.split('-')[1]==12){
        months = 1
        years=Number(date.split('-')[0])+1
      }else{
        months=Number(date.split('-')[1])+1
        years=date.split('-')[0]
      }
      let datenew =years+'-'+months+'-'+datatime.value
      if(new Date(datenew).getTime()>new Date().getTime()){
        message.error('当前月不可操作')
        return 
      }
    }
    if(allchecked.length == 0 && (i == '1' || i == '2' || i == '3')){
      message.error('请选择')
    }else{
      onDeleteItem({ staff_ids: allchecked, operation: i })
    }
  }
  handleMenuClick = (record, item) => {
    const { onEditItem } = this.props
    record['defindex'] =item.info_type
    onEditItem(record)
  }
  onChanges = (checkedList) => {
    const { dispatch,allchecked, applyid,selectedRowKeys } = this.props
    let mewallchecked = allchecked.filter(r=>{return applyid.indexOf(r) < 0})
    let new_array = mewallchecked.concat(checkedList);
    dispatch({ type: 'taxs/updateState', payload: {allchecked:new_array,selectedRowKeys: checkedList, indeterminate: !!checkedList.length && (checkedList.length < applyid.length), checkAll: checkedList.length === applyid.length } })
  }

  onCheckAllChange = (e) => {
    const { dispatch, applyid,allchecked } = this.props
    let mewallchecked = allchecked.filter(r=>{return applyid.indexOf(r) < 0})
    let allapplyid = e.target.checked ? applyid : []
    let new_array = mewallchecked.concat(allapplyid);
    dispatch({ type: 'taxs/updateState', payload: { allchecked:new_array,selectedRowKeys: e.target.checked ? applyid : [], indeterminate: false, checkAll: e.target.checked } })
  }
  componentWillReceiveProps() {
    // this.setState({
    //   checkedList: [],
    //   indeterminate: false,
    //   checkAll: false
    // })
  }
  generaterow = data => {
    
    return data.applys.map((item, index) => {
      return (
        <Row key={index} className={styles.eleListItemcol} onClick={e => { this.handleMenuClick(data,item) }} >
          <Col span={5}>
            <div >
            <span><img className={styles.tableitemimg} src={`./static/icon/${info_type[item.info_type].src}`} />{info_type[item.info_type].name}</span>
            </div>
          </Col>
          <Col span={6}>
            <div >{item.apply_time}</div>
          </Col>
          <Col span={6}>
            <div >{item.audit_time}</div>
          </Col>
          <Col span={4}>
            <div>{item.audit_amount}</div>
            {/* <Button disabled={item.is_deducted} onClick={e => { e.stopPropagation(); e.nativeEvent.stopImmediatePropagation(); this.handleClick(item) }} >{item.audit_amount}</Button> */}
          </Col>
          <Col span={3}>
            <div >{item.is_deducted ? <span >已完成</span> : <span  >未完成</span>}</div>
          </Col>
        </Row>
      )
    })
  }

  generatedealt = data => {
    return data.map((item, index) => {
      return (
        <Row key={index} className={styles.eleListItem}>
          <Col className={styles.eleListName} span={1}>
            <Checkbox value={item.staff_id}></Checkbox>
          </Col>
          <Col className={styles.eleListName} span={3}>

            <div>{item.name}</div>
          </Col>
          <Col className={styles.eleListName} span={3}>

            <div>{item.total_amount}</div>
          </Col>
          <Col span={17}>
            {this.generaterow(item)}
          </Col>
        </Row>
      )
    })
  }

  render() {
    const { onDeleteItem,selectedRowKeys, indeterminate, checkAll, onChangepage, date, onEditItem, pagination, loading, dataSource, ...tableProps } = this.props

    const evnetpage = {
      pagination,
      onShowSizeChange(current, pageSize) {
        let page = {
          page: current,
          per_page: pageSize
        }
        onChangepage(page)
      },
      onChange(current) {
        let page = {
          page: current
        }
        onChangepage(page)
      },
    }

    return (
      <div className={styles.eleList} >
        <Row className={styles.eleListTitle}  >
          <Col span={1}></Col>
          <Col span={3}>员工姓名</Col>
          <Col span={3}>申请总额</Col>
          <Col span={17}>
            <Row>
              <Col span={5}>扣除类型</Col>
              <Col span={6}>申请时间</Col>
              <Col span={6}>审核时间</Col>
              <Col span={4}>申请金额</Col>
              <Col span={3}>扣除状态</Col>
            </Row>
          </Col>
        </Row>
        <Checkbox.Group style={{ width: '100%' }} value={selectedRowKeys} onChange={this.onChanges}>
          <Spin spinning={loading}>
            <div className={styles.eleListbox} >
              {dataSource.length == 0 ? <div className="ant-table-placeholder">暂无数据</div> : this.generatedealt(dataSource)}
            </div>
          </Spin>
        </Checkbox.Group>
        <Pagation  {...evnetpage}  >
          <div className={styles.bottompage} >
            <Button onClick={(e) => { this.handleClick('3') }}  >
              下载扣除数据
            </Button>
            <Button onClick={(e) => { this.handleClick('1') }}  >
              下载申报材料
            </Button>
            <Button onClick={(e) => { this.handleClick('2') }} >完成扣除</Button>
            <Checkbox
              indeterminate={indeterminate}
              onChange={this.onCheckAllChange}
              checked={checkAll}
            >
              全 选
            </Checkbox>
          </div>
        </Pagation>
      </div>
    )
  }
}


export default List
