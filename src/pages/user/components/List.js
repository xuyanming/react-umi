import  { PureComponent } from 'react'
import { Table, Row, Col, Checkbox, Button, message } from 'antd'
import { Pagation } from 'components'
import styles from './List.less'
import { connect } from 'dva'

@connect(({ staff }) => ({ staff }))
class List extends PureComponent {

  handleMenuClick = (record, index) => {
    const { onEditItem } = this.props
    onEditItem(record)
  }

  handleClick = (i) => {
    const { onDeleteItem, selectedRowKeys } = this.props
    if(selectedRowKeys.length == 0){
      message.error('请选择')
    }else{
      onDeleteItem({ staff_id: selectedRowKeys, operation: i })
    }
  }
  onChanges = (checkedList) => {
    const { dispatch, applyid, } = this.props
    dispatch({ type: 'staff/updateState', payload: { selectedRowKeys: checkedList, indeterminate: !!checkedList.length && (checkedList.length < applyid.length), checkAll: checkedList.length === applyid.length } })
  }

  onCheckAllChange = (e) => {
    const { dispatch, applyid, } = this.props
    dispatch({ type: 'staff/updateState', payload: { selectedRowKeys: e.target.checked ? applyid : [], indeterminate: false, checkAll: e.target.checked } })
  }
  onCheckChange = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }


  render() {
    const { onDeleteItem,selectedRowKeys, onChange, indeterminate, checkAll, onEditItem, dataSource, loadingresign, loading, pagination, ...tableProps } = this.props
    const evnetpage = {
      pagination,
      onShowSizeChange(current, pageSize) {
        let page = {
          page: current,
          per_page: pageSize
        }
        onChange(page)
      },
      onChange(current) {
        let page = {
          page: current
        }
        onChange(page)
      },
    }
    const columns = [
      {
        title: '',
        key: '11',
        width: '4.16666667%',
        render: (text, record) => (
          <div onClick={this.onCheckChange} >
            <Checkbox value={record.staff_id}></Checkbox>
          </div>
        ),
      },
      {
        title: '员工姓名',
        dataIndex: 'name',
        key: '1',
        width: '8.33333333%'
      },
      {
        title: '手机号',
        dataIndex: 'mobile',
        key: '2',
        width: '12.5%'
      },
      {
        title: '证件号码',
        dataIndex: 'id_number',
        className:'tableths',
        key: '3',
        width: '12.5%',
      },
      {
        title: '部门',
        dataIndex: 'dept_name',
        className:'tableths',
        key: '4',
        width: '12.5%'
      },
      {
        title: '工号',
        dataIndex: 'employee_number',
        className:'tableths',
        key: '5',
        width: '8.33333333%',
        render: (text, record) => {
          return (
            <span  style={{ wordBreak: 'break-all'}}>
              {text}
            </span>
          )
        }
      },
      {
        title: '是否在职',
        dataIndex: 'shzt',
        key: '6',
        width: '8.33333333%',
        render: (text, record) => (
          <span>
            {record.is_link ? '是' : '否'}
          </span>
        )
      },
      {
        title: '初始密码',
        dataIndex: 'origin_password',
        key: '12',
        width: '8.33333333%',
      },
      {
        title: '角色',
        dataIndex: 'role_type',
        key: '7',
        width: '8.33333333%',
        render: (text, record) => {
          const roletype = ['员工', '企业联系人', '管理员'];
          return (
            <span>
              {roletype[record.role_type]}
            </span>
          )
        }
      },
      {
        title: '是否关联企业',
        dataIndex: 'is_join',
        key: '8',
        width: '8.33333333%',
        render: (text, record) => (
          <span>
            {record.is_join ? '是' : '否'}
          </span>
        )
      },
      {
        title: '操作',
        dataIndex: 'dept_name',
        key: '10',
        width: '8.33333333%',
        render: (text, record) => (
          <span>
            <a style={{ color: '#3389ff' }} onClick={e => { this.handleMenuClick(record, e) }} >编辑</a>
          </span>
        )
      }
    ]
    return (
      <div className={styles.eleList} >
        <Row className={styles.eleListTitle}  >
          <Col span={1}></Col>
          <Col span={2}>员工姓名</Col>
          <Col span={3}>手机号</Col>
          <Col span={3}>证件号码</Col>
          <Col span={3}>部门</Col>
          <Col span={2}>工号</Col>
          <Col span={2}>是否在职</Col>
          <Col span={2}>初始密码</Col>
          <Col span={2}>角色</Col>
          <Col span={2}>是否关联企业</Col>
          <Col span={2}>操作</Col>
        </Row>
        <Checkbox.Group style={{ width: '100%' }} value={selectedRowKeys} onChange={this.onChanges}>
          <Table
            showHeader={false}
            className={styles.eletable}
            columns={columns}
            loading={loading}
            dataSource={dataSource.result}
            pagination={false}
            rowKey={(record, index) => index}
          />
        </Checkbox.Group>
        <Pagation  {...evnetpage}  >
          <div className={styles.bottompage} >
            <Button onClick={(e) => { this.handleClick('2') }}  >设置离职</Button>
            <Button type="primary" onClick={(e) => { this.handleClick('1') }} >移动部门</Button>
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
