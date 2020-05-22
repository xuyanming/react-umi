/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp, arrayToTree } from 'utils'
import api from 'api'
const {querystaff,
  movestaff,
  importstaff,
  addstaff,
  editstaff,
  resignstaff,
  departTree,
  download,
  logoutUser } = api
import { pageModel } from 'utils/model'
import { router } from 'utils'
import Cookies from 'js-cookie'

export default modelExtend(pageModel, {
  namespace: 'staff',

  state: {
    currentItem: {},
    modalVisible: false,
    deptmodalVisible: false,
    importmodalVisible:false,
    loadingimport:false,
    modalType: 'create',
    selectedRowKeys: [],
    indeterminate: false,
    checkAll: false,
    departdata:[],
    staff_id:'',
    filter:{},
    page:{
      page: 1, 
      per_page: 10
    },
    link_count:{
      link_count:0,
      unlink_count:0
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/user', location.pathname)) {
          dispatch({
            type: 'defSuccess',
            payload: {
              filter:{},
              page:{
                page: 1, 
                per_page: 10
              }
            },
          })
          dispatch({
            type: 'query'
          })
          dispatch({
            type: 'depart',
          })
        }
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put, select }) {
      const { filter, page } = yield select(_ => _.staff)
      const data = yield call(querystaff,{...filter, ...page})
      if (data.code == 0) {
        let applyid = data.data.result.map(r=>r.staff_id)
        let link_count={link_count:data.data.link_count,unlink_count:data.data.unlink_count}
        yield put({
          type: 'defSuccess',
          payload: {
            link_count
          },
        })
        yield put({
          type: 'querySuccess',
          payload: {
            applyid,
            list: data.data,
            selectedRowKeys: [],
            pagination: {
              current: Number(page.page) || 1,
              pageSize: Number(page.per_page) || 10,
              total: data.data.total,
            },
          },
        })
        yield put({ type: 'defSuccess', payload: { selectedRowKeys: [],indeterminate: false, checkAll: false, } })
      }
    },
    *depart({ payload = {} }, { call, put }) {
      const data = yield call(departTree, payload)
      if (data.code == 0) {
        const menuTree = arrayToTree(data.data, 'dept_id', 'pid')
        yield put({
          type: 'defSuccess',
          payload: {
            departdata:menuTree
          },
        })
      }
    },
    *resign({ payload }, { call, put, select }) {
      const data = yield call(resignstaff,payload)
      if (data.code == 0) {
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    *movedept({ payload }, { call, put, select }) {
      const { staff_id } = yield select(_ => _.staff)
      const data = yield call(movestaff,{...payload,staff_ids:staff_id})
      if (data.code == 0) {
        yield put({ type: 'hideModal',payload:{deptmodalVisible:false}})
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    *import({ payload }, { call, put }) {
      const data = yield call(importstaff, payload)
      if (data.code == 0) {
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(addstaff, payload.val)
      if (data.code == 0) {
        yield put({ type: 'hideModal',payload:{modalVisible:false}})
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    *signOut({ payload }, { call, put }) {
      const data = yield call(logoutUser)
      if (data.code == 0) {
        Cookies.remove('name')
        router.push({ pathname: '/login' })
      } else {
        throw data
      }
    },
    *update({ payload }, { select, call, put }) {
      const data = yield call(editstaff, payload.val)
      if (data.code == 0) {
        yield put({ type: 'hideModal',payload:{modalVisible:false}})
        if(payload.type == 1){
          yield put({ type: 'signOut'})
          
        }else{
          yield put({ type: 'query' })
        }
        
      } else {
        throw data
      }
    },
    *download({ payload }, { select, call, put }) {
      const data = yield call(download)
      if (data) {
        const blob = new Blob([data])
    　　const fileName = '测试表格123.xls'
    　　if ('download' in document.createElement('a')) { // 非IE下载
    　　　　const elink = document.createElement('a')
    　　　　elink.download = fileName
    　　　　elink.style.display = 'none'
    　　　　elink.href = URL.createObjectURL(blob)
    　　　　document.body.appendChild(elink)
    　　　　elink.click()
    　　　　URL.revokeObjectURL(elink.href) // 释放URL 对象
    　　　　document.body.removeChild(elink)
    　　} else { // IE10+下载
    　　　　navigator.msSaveBlob(blob, fileName)
    　　}
      } else {
        throw data
      }
    },
  },

  reducers: {
    showModal(state, { payload }) {
      return { ...state, ...payload}
    },

    hideModal(state,{ payload }) {
      return { ...state, ...payload}
    },
    defSuccess(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
  },
})
