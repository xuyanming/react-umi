import  { PureComponent } from 'react'
import { router } from 'utils'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm, Modal } from 'antd'
import { Page } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Filter from './components/Filter'
import Modals from './components/Modal'
import Modalimg from './components/Modalimg'
import Modalmsg from './components/Modalmsg'
import Modalmoney from './components/Modalmoney'

@connect(({ app, dealt, loading }) => ({ app, dealt, loading }))
class dealt extends PureComponent {
  
  render() {
    const { location, dispatch, dealt, loading } = this.props
    const { query, pathname } = location
    const {
      list,
      applyid,
      datewite,
      pagination,
      currentItem,
      modalVisible,
      modalType,
      msgmodalVisible,
      imgmodalVisible,
      moneymodalVisible,
      imgurl,
      datalist,
      msgdata,
      selectedRowKeys,
      amountchange,
      amountchangetype,
      deftype
    } = dealt
    const handleRefresh = newQuery => {
      // dispatch({
      //   type: 'dealt/updateState',
      //   payload: {
      //     pagination:{current:newQuery.page}
      //   },
      // })
      router.push({
        pathname,
        search: stringify(
          {
            ...query,
            ...newQuery,
          },
          { arrayFormat: 'repeat' }
        ),
      })
    }
    
    const moneymodalProps = {
      amountchange,
      amountchangetype,
      visible: moneymodalVisible,
      // confirmLoading: loading.effects[`dealt/audit`],
      title: '修好金额',
      onOk(payload) {
        
        let newamountchange = amountchange
        newamountchange[amountchangetype] =payload.amount
        dispatch({
          type: 'dealt/updateState',
          payload: {
            moneymodalVisible: false,
            amountchange:newamountchange
          },
        })
      },
      onCancel() {
        dispatch({
          type: 'dealt/updateState',
          payload: {
            moneymodalVisible: false
          },
        })
      },
    }

    const msgmodalProps = {
      msgdata,
      visible: msgmodalVisible,
      confirmLoading: loading.effects[`dealt/audit`],
      title: '待办审核',
      onOk(payload) {
        dispatch({
          type: 'dealt/audit',
          payload:{apply_ids:msgdata.apply_ids,operation:msgdata.operation,amount:msgdata.amount,memo:payload.memo},
        }).then(() => {
          handleRefresh({
            page:1
          })
        })
      },
      onCancel() {
        dispatch({
          type: 'dealt/updateState',
          payload: {
            msgmodalVisible: false
          },
        })
      },
    }
    const imgmodalProps = {
      imgurl,
      visible: imgmodalVisible,
      title: '材料',
      onOk() {
        dispatch({
          type: 'dealt/updateState',
          payload: {
            imgmodalVisible: true,
          },
        })
      },
      onCancel() {
        dispatch({
          type: 'dealt/updateState',
          payload: {
            imgmodalVisible: false
          },
        })
      },
    }

    const modalProps = {
      item: currentItem,
      deftype,
      amountchange,
      datalist: datalist,
      visible: modalVisible,
      // confirmLoading: loading.effects['dealt/audit'],
      wrapClassName: 'vertical-center-modal',
      title: `专项待办扣除${datewite}`,
      onOk(i) {
        dispatch({
          type: 'dealt/updateState',
          payload: { imgmodalVisible: true, imgurl: i }
        })
      },
      onCancel() {
        dispatch({
          type: 'dealt/hideModal',
        })
      },
      handlemoney(data,i){
        let newamountchange = amountchange
        newamountchange[i] =data
        dispatch({
          type: 'dealt/updateState',
          payload: {
            moneymodalVisible: true,
            amountchange:newamountchange,
            amountchangetype:i,
          },
        })
      },
      onDeleteItem(payload) {
        dispatch({
          type: 'dealt/updateState',
          payload: {
            msgmodalVisible: true,
            msgdata:payload
          },
        })
      },
      
    }

    const listProps = {
      dataSource: list,
      applyid: applyid,
      loading: loading.effects['dealt/query'],
      pagination,
      onChange(page) {
        handleRefresh({
          ...page
        })
      },
      onDeleteItem(payload) {
        dispatch({
          type: 'dealt/updateState',
          payload: {
            msgmodalVisible: true,
            msgdata:payload
          },
        })
      },
      onEditItem(item) {
        dispatch({ type: 'dealt/showModal' })
        dispatch({
          type: 'dealt/detail',
          payload: item,
        })
        dispatch({
          type: 'dealt/defSuccess',
          payload: {
            amountchange: ['','','','',''],
            deftype:item.info_type
          },
        })
      },
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          dispatch({
            type: 'dealt/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
    }

    const filterProps = {
      filter: {
        ...query,
      },
      onFilterChange(payload) {

        handleRefresh({
          ...payload,
          page: 1,
        })
      },
      onAdd() {
        dispatch({
          type: 'user/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }
    return (
      <Page inner>
        <Filter {...filterProps} />
        <List {...listProps} />
        {modalVisible && <Modals {...modalProps} />}
        {<Modalimg {...imgmodalProps} />}
        {msgmodalVisible && <Modalmsg {...msgmodalProps} />}
        {moneymodalVisible && <Modalmoney {...moneymodalProps} />}
      </Page>
    )
  }
}


export default dealt
