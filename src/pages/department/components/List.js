import  { PureComponent } from 'react'

import { Table, Modal, message, Row, Col, Checkbox, Button } from 'antd'
import { connect } from 'dva'
import styles from './List.less'

@connect(({ app, depart }) => ({ app, depart }))
class List extends PureComponent {
  
  onChanges = (checkedList) => {
    const {  dispatch, applyid,  } = this.props
    dispatch({ type: 'depart/updateState', payload: { selectedRowKeys:checkedList, indeterminate: !!checkedList.length && (checkedList.length < applyid.length), checkAll: checkedList.length === applyid.length} })
  }

  onCheckAllChange = (e) => {
    const {  dispatch, applyid, } = this.props
    dispatch({ type: 'depart/updateState', payload: { selectedRowKeys:e.target.checked ? applyid : [], indeterminate: false,checkAll: e.target.checked} })
  }

  handleMenuClick = (record, e) => {
    const { onEditItem } = this.props
    onEditItem(record)
  }

  confirm = () =>{
    const { confirm,selectedRowKeys } = this.props
    if(selectedRowKeys.length == 0){
      message.error('请选择')
    }else{
      confirm(selectedRowKeys)
    }
    
  }
  render() {
    const {app, onDeleteItem, onEditItem, indeterminate, checkAll,  pagination,selectedRowKeys, loading, dataSource, ...tableProps } = this.props
    const { collapsed } = app
    const columns = [
      {
        title: '部门名称',
        dataIndex: 'pname',
        key: '1',
        width: '25%'
      },
      {
        title:'子部门名称',
        dataIndex: 'dept_name',
        key: '2',
        width: '50%'
      },
      {
        title:'操作',
        dataIndex: '',
        key: '10',
        width: '16.66666667%',
        render:(text, record) => (
          <span>
            <a style={{color:'#3389ff'}} onClick={e => {this.handleMenuClick(record, e)}} >编辑</a>
          </span>
        )
      },
      {
        title: '',
        key: '11',
        width: '8.33333333%',
        render: (text, record) => (
          <div  onClick={this.onCheckChange} >
            <Checkbox  value={record.dept_id}></Checkbox>
          </div>
        ),
      }
    ]
    
    return (
      <div className={styles.eleList } >
        <Row  className={styles.eleListTitle }  >
          <Col span={6}>部门名称</Col>
          <Col span={12}>子部门名称</Col>
          <Col span={4}>操作</Col>
          <Col span={2}></Col>
        </Row>
        <Checkbox.Group style={{ width: '100%' }} value={selectedRowKeys} onChange={this.onChanges}>
          <div  >
            {dataSource && <Table
            className={styles.eletable }
            showHeader={false}
            columns={columns}
            loading={loading}
            dataSource={dataSource}
            pagination={false}
            rowKey={(record,index)=>record.dept_id}
          />}
          </div>
           
        </Checkbox.Group>
        <div className={styles.Pagination} style={{left:collapsed ? '126px':'300px'}} >
            <div  > </div>
            <div className={styles.bottompage} >
              <Button type='primary' onClick={this.confirm} >删除部门</Button>
              <Checkbox
                indeterminate={indeterminate}
                onChange={this.onCheckAllChange}
                checked={checkAll}
              >
                全 选
              </Checkbox>
            </div>
          </div>
      </div>
    )
  }
}


export default List
