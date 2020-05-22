import { PureComponent } from 'react'
import { connect } from 'dva'
import { Modal, Row, Col, Tree } from 'antd'
const { TreeNode } = Tree;
import { Page } from 'components'
import List from './components/List'
import Filter from './components/Filter'
import Modals from './components/Modal'
import Modalmoney from './components/Modalmoney'
import Modalimg from './components/Modalimg'


@connect(({ taxs, loading }) => ({ taxs, loading }))
class taxs extends PureComponent {

  handleRefresh = newQuery => {
    const { dispatch } = this.props
    dispatch({
      type: 'taxs/query'
    })
  }

  onSelect = (selectedKeys, info) => {
    const { dispatch, taxs } = this.props
    let data = Object.assign({}, taxs.filters, { dept_id: selectedKeys[0] })
    let page={
      page: 1,
      per_page: 10
    }
    dispatch({
      type: 'taxs/defSuccess',
      payload: { filters: data,page:page }
    })
    this.handleRefresh()
  }

  fiter = (data, i) => {
    if (data.dept_name.split('').length > (16 - i)) {
      return <span title={data.dept_name}>{data.dept_name.split('').slice(0, 16 - i).join('') + '...'}</span>
    } else {
      return <span title={data.dept_name} >{data.dept_name}</span>
    }
  }

  renderTreeNodes = (data, i) => data.map((item) => {
    if (item['children']) {
      return (
        <TreeNode title={this.fiter(item, i + 1)} key={item.dept_id} dataRef={item}>
          {this.renderTreeNodes(item.children, i + 1)}
        </TreeNode>
      );
    }
    return <TreeNode title={this.fiter(item, i + 1)} key={item.dept_id} dataRef={item} />;
  })

  render() {
    const { location, dispatch, taxs, loading } = this.props

    const { query, pathname } = location
    const {
      list,
      pagination,
      currentItem,
      modalVisible,
      moneymodalVisible,
      imgmodalVisible,
      selectedRowKeys,
      indeterminate,
      checkAll,
      allchecked,
      imgurl,
      modalType,
      yearall,
      applyid,
      datatime,
      datalist,
      filters,
      departdata,
    } = taxs

    let _this = this;
    const imgmodalProps = {
      imgurl,
      visible: imgmodalVisible,
      title: '材料',
      onOk(data) {
        dispatch({
          type: 'taxs/showModal',
          payload: {
            imgmodalVisible: false,
          },
        })
      },
      onCancel() {
        dispatch({
          type: 'taxs/hideModal',
          payload: {
            imgmodalVisible: false
          },
        })
      },
    }
    const moneymodalProps = {
      item: currentItem,
      visible: moneymodalVisible,
      confirmLoading: loading.effects[`taxs/amount`],
      title: '修改金额',
      onOk(data) {
        dispatch({
          type: `taxs/amount`,
          payload: data,
        })
      },
      onCancel() {
        dispatch({
          type: 'taxs/hideModal',
          payload: {
            moneymodalVisible: false
          },
        })
      },
    }
    const modalProps = {
      item: currentItem,
      datalist,
      yearall,
      visible: modalVisible,
      date: filters.year_month,
      wrapClassName: 'vertical-center-modal',
      title: `${currentItem.name}的个税信息${filters.year_month}`,
      onOk(i) {
        dispatch({
          type: 'taxs/showModal',
          payload: { imgmodalVisible: true, imgurl: i }
        })
      },
      onCancel() {
        dispatch({
          type: 'taxs/hideModal',
          payload: { modalVisible: false }
        })
      },
      onDeleteItem(payload) {
        dispatch({
          type: 'taxs/yearall',
          payload: { staff_id: currentItem.staff_id, stats_type: 1, year: payload },
        })
      },
    }

    const listProps = {
      dataSource: list,
      applyid: applyid,
      date: filters.year_month,
      datatime,
      allchecked,
      selectedRowKeys,
      indeterminate,
      checkAll,
      loading: loading.effects['taxs/query'],
      pagination,
      allcheckedList(checkedList){
        dispatch({
          type: 'taxs/defSuccess',
          payload: {
            allchecked: checkedList,
          },
        })
      },
      
      onChangepage(page) {
        dispatch({
          type: 'taxs/defSuccess',
          payload: { page: page }
        })
        _this.handleRefresh()
      },
      onDeleteItem(payload) {
        if (payload.operation == '2') {
          Modal.confirm({
            title: '完成扣除',
            content: '确定将选择标记为已完成状态？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
              dispatch({
                type: 'taxs/finish',
                payload: { staff_ids: payload.staff_ids, year_month: filters.year_month},
              })
            },
          });

        } else if (payload.operation == '1') {
          dispatch({
            type: 'taxs/export',
            payload: {
              staff_ids: payload.staff_ids,
              year_month: filters.year_month
            },
          })

        }else if(payload.operation == '3'){
          dispatch({
            type: 'taxs/exportall',
            payload: {
              staff_ids: payload.staff_ids,
              year_month: filters.year_month
            },
          })
        } else {

          dispatch({
            type: 'taxs/showModal',
            payload: {
              currentItem: payload.operation,
              moneymodalVisible: true
            },
          })
        }
      },
      onEditItem(item) {
        dispatch({
          type: 'taxs/showModal',
          payload: { modalVisible: true }
        })
        dispatch({
          type: 'taxs/yearall',
          payload: { staff_id: item.staff_id, stats_type: 1, year: filters.year_month.split('-')[0] },
        })
        dispatch({
          type: 'taxs/multi',
          payload: { year_month: filters.year_month, staff_id: item.staff_id, item: item },
        })
      },
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          dispatch({
            type: 'taxs/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
    }

    const filterProps = {
      filter: filters,
      onFilterChange(value) {
        let data = Object.assign({}, filters, { name: value.name, info_type: value.info_type, year_month: value.createTime })
        let page={
          page: 1,
          per_page: 10
        }
        dispatch({
          type: 'taxs/defSuccess',
          payload: { filters: data, page:page}
        })
        _this.handleRefresh()
      },
      onAdd() {
        dispatch({
          type: 'taxs/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }


    return (
      <Page inner>
        <Filter {...filterProps} />
        <Row type="flex" justify="space-between" >
          <Col style={{ width: '24%', boxShadow: '4px 4px 20px 0 rgba(0, 0, 0, 0.01)', padding: '10px', marginTop: '60px', backgroundColor: ' #ffffff', borderRadius: '10px', overflow: 'hidden' }} span={5} >
            <Tree
              onSelect={this.onSelect}
            >
              {departdata && this.renderTreeNodes(departdata, 0)}
            </Tree>
          </Col>
          <Col className="gutter-row" span={18}>
            <List {...listProps} />
          </Col>
        </Row>
        {<Modals {...modalProps} />}
        {moneymodalVisible && <Modalmoney {...moneymodalProps} />}
        {<Modalimg {...imgmodalProps} />}
      </Page>
    )
  }
}

export default taxs
