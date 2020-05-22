import  { PureComponent } from 'react'
import { router } from 'utils'
import { connect } from 'dva'
import {Menu, Modal, Button, Row, Col, Tree} from 'antd'
const { SubMenu } = Menu;
const { TreeNode } = Tree;
import { Page } from 'components'
import List from './components/List'
import Modals from './components/Modal'



@connect(({ depart, loading }) => ({ depart, loading }))
class depart extends PureComponent {
  state={
    defaultSelectedKeys:['']
  }
  handleclick = () =>{
  
    const {  dispatch } = this.props
    dispatch({ type: 'depart/showModal',payload:{modalType:'create',modalVisible:true}})
  }

   handleRefresh = newQuery => {
    const {dispatch} = this.props
    dispatch({
      type: 'depart/query',
      payload:newQuery
    })
  }

  onSelect = (selectedKeys, info) => {
    const {  dispatch } = this.props

    dispatch({ type: 'depart/defSuccess',payload:{selectedRowKeys: [], indeterminate: false, checkAll: false}})
    if(info.selected){
      let data=[];
      let applyid=[]
      if(info.selectedNodes[0].props.dataRef['children']){
         data = info.selectedNodes[0].props.dataRef['children'].map(r=> { return {dept_id:r.dept_id, dept_name:r.dept_name,pname:info.selectedNodes[0].props.dataRef.dept_name, pid: r.pid, count: r.count}});
         applyid = data.map(r=>r.dept_id)
      }
      
      dispatch({ type: 'depart/querySuccess',payload:{list:data,applyid}})
    }else{
      dispatch({
        type: 'depart/depart',
      })
    }
  }

  fiter =(data,i)=>{
    if(data.dept_name.split('').length>(14-i)){
      return <span  title={data.dept_name}>{ data.dept_name.split('').slice(0,14-i).join('')+'...'+`(${data.keys}人)`}</span>
    }else{
      return <span  title={data.dept_name} >{data.dept_name+`(${data.keys}人)`}</span> 
    }
  }

  renderTreeNodes = (data,i) => data.map((item) => {
    if (item['children']) {
      return (
        <TreeNode title={this.fiter(item,i+1)} key={item.dept_id} dataRef={item}>
          {this.renderTreeNodes(item.children,i+1)}
        </TreeNode>
      );
    }
    return <TreeNode title={this.fiter(item,i+1)} key={item.dept_id} dataRef={item} />;
  })
  componentWillReceiveProps(){
    this.setState({
      defaultSelectedKeys: [''],
    })
  }
  render() {
    const { location, dispatch, depart, loading } = this.props
    
    const { query, pathname } = location
    const {
      list,
      applyid,
      pagination,
      currentItem,
      modalVisible,
      modalType,
      selectedRowKeys,
      indeterminate,
      checkAll,
      departdata,
      defaultExpandedKeys
    } = depart

    const modalProps = {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      departdata,
      modalType,
      confirmLoading: loading.effects[`depart/${modalType}`],
      title: `${
        modalType === 'create' ? `添加部门` : `编辑部门`
      }`,
      onOk(data) {
        dispatch({
          type: `depart/${modalType}`,
          payload: data,
        })
      },
      onCancel() {
        dispatch({
          type: 'depart/hideModal',
          payload:{modalVisible:false}
        })
      },
    }
    const listProps = {
      dataSource: list,
      applyid:applyid,
      loading: loading.effects['depart/depart'],
      pagination,
      selectedRowKeys,
      indeterminate,
      checkAll,
      confirm(checkedList){
        Modal.confirm({
          title: '删除部门',
          content: '确定删除所选部门？',
          okText: '确认',
          cancelText: '取消',
          onOk() {
            dispatch({
              type: `depart/delete`,
              payload: {dept_ids:checkedList},
            })
          },
        });
      },
      onDeleteItem(id) {
        dispatch({
          type: 'depart/delete',
          payload: id,
        }).then(() => {
          handleRefresh({
            page:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          })
        })
      },
      onEditItem(item) {
        dispatch({
          type: 'depart/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
            modalVisible:true
          },
        })
      },
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          dispatch({
            type: 'depart/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
    }
    function toarr(data){
      let keys=0
      data.forEach(r=>{
        if(r.children){
          keys += r.count + toarr(r.children)
          r['keys'] = r.count+ toarr(r.children)
          
        }else{
          keys += r.count
          r['keys'] = r.count
        }
        
      })
      return keys
    }
    toarr(departdata)
    return (
      <Page inner>
        <Row>
          <Col span={24} style={{textAlign:"right"}} >
            <Button
              type="primary" onClick={this.handleclick}
            >
              添加部门
            </Button>
          </Col>
        </Row>
        <Row type="flex" justify="space-between" >
          <Col style={{width: '26%', boxShadow:'4px 4px 20px 0 rgba(0, 0, 0, 0.01)',padding: '10px',marginTop:'60px', backgroundColor:' #ffffff',borderRadius: '10px',overflow:'hidden'}}  >
            {departdata && <Tree 
            onSelect={this.onSelect}
            defaultSelectedKeys={this.state.defaultSelectedKeys}
            defaultExpandedKeys={[defaultExpandedKeys]}
            >
              { this.renderTreeNodes(departdata,0)}
            </Tree>}
          </Col>
          <Col style={{width:'73%'}}>
            {list && <List {...listProps} />}
          </Col>
        </Row>
        {modalVisible && <Modals {...modalProps} />}
      </Page>
    )
  }
}

export default depart
