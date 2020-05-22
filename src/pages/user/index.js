import { PureComponent } from 'react'
import { flattenOptions } from 'utils'
import { connect } from 'dva'
import { Modal } from 'antd'
import { Page } from 'components'
import List from './components/List'
import Filter from './components/Filter'
import Modals from './components/Modal'
import Modaldept from './components/Modaldept'
import Modalimport from './components/Modalimport'

@connect(({ staff, app, loading }) => ({ staff, app, loading }))

class staff extends PureComponent {

  render() {
    const { location, dispatch, staff, loading } = this.props
    const {
      list,
      applyid,
      pagination,
      currentItem,
      modalVisible,
      deptmodalVisible,
      importmodalVisible,
      modalType,
      selectedRowKeys,
      indeterminate,
      checkAll,
      departdata,
      loadingimport,
      link_count,
      page
    } = staff
    let _this = this
    const handleRefresh = newQuery => {
      dispatch({
        type: 'staff/query'
      })
    }

    const importmodalProps = {
      visible: importmodalVisible,
      loadingimport,
      confirmLoading: loading.effects['staff/movedept'],
      title: `${`批量导入职工信息`
        }`,
      onOk(i) {

        if (i == '3') {
          dispatch({
            type: 'staff/defSuccess',
            payload: { loadingimport: true }
          })
        }
        if (i == '4') dispatch({ type: 'staff/defSuccess', payload: { loadingimport: false } })
        if (i == '1') dispatch({ type: 'staff/hideModal', payload: { importmodalVisible: false } })
        if (i == '2') {
          dispatch({ type: 'staff/hideModal', payload: { importmodalVisible: false } })
          dispatch({
            type: 'staff/defSuccess',
            payload: { page:{page:1,per_page:10}}
          })
          handleRefresh()
        }

      },
      onCancel() {
        dispatch({
          type: 'staff/hideModal',
          payload: { importmodalVisible: false }
        })
      },
    }

    const deptmodalProps = {
      item: {},
      departdata: departdata,
      visible: deptmodalVisible,
      confirmLoading: loading.effects['staff/movedept'],
      title: `${`移动部门`
        }`,
      onOk(val) {
        dispatch({
          type: `staff/movedept`,
          payload: val
        })
      },
      onCancel() {
        dispatch({
          type: 'staff/hideModal',
          payload: { deptmodalVisible: false }
        })
      },
    }

    const modalProps = {
      item: modalType === 'create' ? {} : currentItem,
      departdata: departdata,
      modalType: modalType,
      visible: modalVisible,
      confirmLoading: loading.effects[`staff/${modalType}`],
      title: `${modalType === 'create' ? `添加员工` : `编辑员工`
        }`,
      onOk(val, i) {
        dispatch({
          type: `staff/${modalType}`,
          payload: { val: val, type: i }
        })
      },
      onCancel() {
        dispatch({
          type: 'staff/hideModal',
          payload: { modalVisible: false }
        })
      },
    }

    const listProps = {
      dataSource: list,
      applyid: applyid,
      selectedRowKeys,
      indeterminate,
      checkAll,
      loading: loading.effects['staff/query'],
      loadingresign: loading.effects['staff/resign'],
      pagination,
      page,
      onChange(page) {
        dispatch({
          type: 'staff/defSuccess',
          payload: { page: page }
        })
        handleRefresh()

      },
      onDeleteItem(payload) {
        if (payload.operation == '2') {
          Modal.confirm({
            title: '设置离职',
            content: '确定将选择员工设置离职？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
              dispatch({
                type: 'staff/resign',
                payload: { staff_ids: payload.staff_id },
              })
            },
          });

        } else {
          dispatch({
            type: 'staff/showModal',
            payload: { staff_id: payload.staff_id, deptmodalVisible: true, page:{page:1,per_page:10} },
          })
        }

      },
      onEditItem(item) {
        if (item.dept_id) item['deptid'] = flattenOptions(departdata, [], item.dept_id)[0].map(r => r.dept_id)
        dispatch({
          type: 'staff/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
            modalVisible: true
          },
        })
      },
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          dispatch({
            type: 'staff/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
    }
   
    const filterProps = {
      filter: {},
      link_count,
      departdata,
      onFilterChange(payload) {
        let page={
          page: 1,
          per_page: 10
        }
        dispatch({
          type: 'staff/defSuccess',
          payload: { filter: payload,page:page}
        })
        handleRefresh()
      },
      onAdd(i) {
        if (i == '1') {
          dispatch({
            type: 'staff/showModal',
            payload: {
              modalType: 'create',
              modalVisible: true
            },
          })
        } else {
          dispatch({
            type: 'staff/showModal',
            payload: { importmodalVisible: true },
          })
        }

      },
    }

    return (
      <Page inner>
        <Filter {...filterProps} />
        <List {...listProps} />
        {modalVisible && <Modals {...modalProps} />}
        {deptmodalVisible && <Modaldept {...deptmodalProps} />}
        <Modalimport {...importmodalProps} />
      </Page>
    )
  }
}


export default staff
