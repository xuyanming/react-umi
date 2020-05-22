
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp, arrayToTree } from 'utils'
import api from 'api'
const { quweytaxs,
  departTree,
  departedit,
  departadd,
  removeUser,
  departdelete,
  removeUserList, } = api

import { pageModel } from 'utils/model'

export default modelExtend(pageModel, {
  namespace: 'depart',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    indeterminate: false,
    checkAll: false,
    departdata:[],
    defaultSelectedKeys:[],
    defaultExpandedKeys:''
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/department', location.pathname)) {
          const payload = location.query || { page: 1, per_page: 10 }
          dispatch({
            type: 'depart',
          })
        }
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const data = yield call(quweytaxs, payload)
      if (data.code == 0) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.result,
            pagination: {
              current: Number(data.data.page) || 1,
              pageSize: Number(data.data.per_page) || 10,
              total: data.data.total,
            },
          },
        })
      }
    },
    *depart({ payload = {} }, { call, put }) {
      const data = yield call(departTree, payload)
      if (data.code == 0) {
        const menuTree = arrayToTree(data.data, 'dept_id', 'pid')
        yield put({
          type: 'defSuccess',
          payload: {
            departdata:menuTree,
            defaultExpandedKeys:String(menuTree[0].dept_id) 
          },
        })
        let applyid = menuTree[0].children.map(r=>r.dept_id)
        yield put({
          type: 'querySuccess',
          payload: {
            applyid,
            list: menuTree[0].children.map(r=> { return {dept_id:r.dept_id, dept_name:r.dept_name,pname:menuTree[0].dept_name, pid: r.pid, count: r.count}}),
            defaultSelectedKeys:[],
          },
        })
      }
    },
    *delete({ payload }, { call, put, select }) {
      const data = yield call(departdelete,payload)
      if (data.code == 0) {
        yield put({
          type: 'depart',
        })
        yield put({ type: 'defSuccess', payload: { selectedRowKeys: [], indeterminate: false, checkAll: false, } })
      } else {
        // throw data
      }
    },

    *multiDelete({ payload }, { call, put }) {
      const data = yield call(removeUserList, payload)
      if (data.code == 0) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        // throw data
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(departadd, payload)
      if (data.code == 0) {
        yield put({ type: 'hideModal',payload:{modalVisible:false}})
        yield put({
          type: 'depart',
        })
      } else {
        // throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const data = yield call(departedit, payload)
      if (data.code == 0) {
        yield put({ type: 'hideModal',payload:{modalVisible:false}})
        yield put({
          type: 'depart',
        })
      } else {
        // throw data
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
