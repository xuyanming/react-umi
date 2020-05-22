import  { PureComponent } from 'react'
import { Table, Row, Col, message, Checkbox, Button } from 'antd'
import { Pagation} from 'components'
import styles from './List.less'
import { connect } from 'dva'


const info_type=[{name:'子女教育',src:'dbxq_ico_znjy_24x24.svg'}, {name:'赡养老人',src:'dbxq_ico_sylr_24x24.svg'}, {name:'住房租金',src:'dbxq_ico_zfzj_24x24.svg'}, {name:'住房贷款利息',src:'dbxq_ico_zjdklx_24x24.svg'}, {name:'继续教育',src:'dbxq_ico_jxjy_24x24.svg'}, {name:'大病医疗',src:''}]
@connect(({ dealt }) => ({ dealt }))
class List extends PureComponent {
  // state = {
  //   checkedList: [],
  //   indeterminate: false,
  //   checkAll: false,
  // };
  handleMenuClick = (record, index) => {
    const { onEditItem } = this.props
    onEditItem(record)
  }

  handleClick = (i) => {
    const { onDeleteItem , dealt} = this.props
    if(dealt.selectedRowKeys.length == 0){
      message.error('请选择')
    }else{
      onDeleteItem({apply_ids:dealt.selectedRowKeys,operation:i,amount:'',memo:''})
    }
    
  }
  onChanges = (checkedList) => {
    const { dispatch, applyid, } = this.props
    dispatch({ type: 'dealt/updateState', payload: { selectedRowKeys: checkedList, indeterminate: !!checkedList.length && (checkedList.length < applyid.length), checkAll: checkedList.length === applyid.length } })
    
  }

  onCheckAllChange = (e) => {
    const { dispatch, applyid, } = this.props
    dispatch({ type: 'dealt/updateState', payload: { selectedRowKeys: e.target.checked ? applyid : [], indeterminate: false, checkAll: e.target.checked } })
  }
  onCheckChange = (e) =>{
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }
  // componentWillReceiveProps(){
  //   console.log('11111111111111111')
  //   this.setState({checkedList: [],
  //     indeterminate: false,
  //     checkAll: false})
  // }
  render() {
    const { onDeleteItem, onChange, onEditItem, dataSource, loading, pagination,dealt, ...tableProps } = this.props
    const {
      indeterminate,
      checkAll,
      selectedRowKeys,
    } = dealt
    const evnetpage={
      pagination,
      onShowSizeChange(current,pageSize) {
        let page={
          page:current,
          per_page:pageSize
        }
        onChange(page)
      },
      onChange(current) {
        let page={
          page:current
        }
        onChange(page)
      },
    }
    const columns = [
      {
        title: '',
        key: '7',
        width: '8.33333333%',
        render: (text, record) => (
          <div  onClick={this.onCheckChange} >
            <Checkbox  value={record.apply_id}></Checkbox>
          </div>
        ),
      },
      {
        title: '员工姓名',
        dataIndex: 'staff_name',
        key: '1',
        width: '12.5%'
      },
      {
        title:'所在部门',
        dataIndex: 'dept_name',
        key: '2',
        width: '20.83333333%'
      },
      {
        title:'扣除类型',
        dataIndex: 'info_type',
        key: '3',
        width: '16.66666667%',
        render: (text, record) => (
          <span><img className={styles.tableitemimg} src={`./static/icon/${info_type[record.info_type].src}`} />{info_type[record.info_type].name}</span>
        ),
      },
      {
        title:'申请时间',
        dataIndex: 'create_time',
        key: '4',
        width: '16.66666667%'
      },
      {
        title:'申请金额',
        dataIndex: 'amount',
        key: '5',
        width: '12.5%'
      },
      {
        title:'审核状态',
        dataIndex: 'shzt',
        key: '6',
        width: '12.5%',
        render: (text, record) => (
          <span>待审核</span>
        ),
      }
    ]
    return (
      <div className={styles.eleList } >
        <Row  className={styles.eleListTitle }  >
          <Col span={2}></Col>
          <Col span={3}>员工姓名</Col>
          <Col span={5}>所在部门</Col>
          <Col span={4}>扣除类型</Col>
          <Col span={4}>申请时间</Col>
          <Col span={3}>申请金额</Col>
          <Col span={3}>审核状态</Col>
          
        </Row>
        <Checkbox.Group style={{ width: '100%' }} value={selectedRowKeys} onChange={this.onChanges}>
        <Table
          showHeader={false}
          className={styles.eletable }
          columns={columns}
          loading={loading}
          dataSource={dataSource.result}
          pagination={false}
          rowKey={(record,index)=> index}
          onRow={(record) => {
            return {
              onClick:e => {this.handleMenuClick(record, e)}
            };
          }}
        />
        </Checkbox.Group>
        <Pagation  {...evnetpage}  >
          <div className={styles.bottompage} >
          <Button  onClick={(e) => { this.handleClick('2')}}>拒 绝</Button>
          <Button  type="primary" onClick={(e) => { this.handleClick('1')}} >通 过</Button>
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
