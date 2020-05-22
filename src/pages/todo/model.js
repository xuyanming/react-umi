/* global window */
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp, getPreMonth, getNextMonth } from 'utils'
import moment from 'moment'
import api from 'api'
const {dealtDetail,
  quweybacklog,
  dealtAudit,
  createUser,
  queryother,
  updateUser,
  removeUserList, } = api

import { pageModel } from 'utils/model'

export default modelExtend(pageModel, {
  namespace: 'dealt',

  state: {
    currentItem: {},
    datewite:'',
    datalist:[],
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    indeterminate: false,
    checkAll: false,
    imgurl:'',
    imgmodalVisible:false,
    msgmodalVisible:false,
    moneymodalVisible:false,
    msgdata:{},
    amountchange:['','','','',''],
    amountchangetype:0,
    deftype:0
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/todo', location.pathname)) {
          const payload = location.query || { page: 1, per_page: 10 }
          dispatch({
            type: 'query',
            payload,
          })
          dispatch({
            type: 'queryother',
          })
        }
      })
    },
  },

  effects: {
    *queryother({ payload }, { call, put }) {
      const data = yield call(queryother)
      if(data.code == 0){
       let date =  moment(new Date()).format('YYYY-MM')
       if(new Date().getTime() < new Date(date+'-'+data.data.value).getTime()){
        let PreMonth= getPreMonth(moment(new Date()).format('YYYY-MM-DD')) 
        yield put({ type: 'app/updateState', payload: {datewite:moment(PreMonth).format('YYYY-MM') } })
        yield put({ type: 'updateState', payload: {datewite:moment(PreMonth).format('YYYY-MM') } })
       }else{
        yield put({ type: 'app/updateState', payload: {datewite:date} })
        yield put({ type: 'updateState', payload: {datewite:date} })
       }
      }
    },
    *query({ payload = {} }, { call, put }) {
      const data = yield call(quweybacklog, payload)
      if (data.code == 0) {
        let applyid = data.data.result.map(r=>r.apply_id)
        yield put({
          type: 'querySuccess',
          payload: {
            applyid,
            list: data.data,
            pagination: {
              current: Number(data.data.page) || 1,
              pageSize: Number(data.data.per_page) || 10,
              total: data.data.total,
            },
          },
        })
        yield put({ type: 'defSuccess', payload: { selectedRowKeys: [],indeterminate: false, checkAll: false, } })
      }
    },

    *audit({ payload }, { call, put, select }) {
      const data = yield call(dealtAudit,payload)
      if (data.code == 0) {
        yield put({ type: 'updateState', payload:{ msgmodalVisible: false,modalVisible:false } })
      } else {
        throw data
      }
    },

    *multiDelete({ payload }, { call, put }) {
      const data = yield call(removeUserList, payload)
      if (data.code == 0) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(createUser, payload)
      if (data.code == 0) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const id = yield select(({ user }) => user.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(updateUser, newUser)
      if (data.code == 0) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *detail({ payload }, { select, call, put }) {
      const data = yield call(dealtDetail, {staff_id:payload.staff_id})
      if (data.code == 0) {
        yield put({ type: 'updateState', payload:{ datalist:data.data,currentItem:payload } })
      } else {
        throw data
      }
    },
  },

  reducers: {
    showModal(state, { payload }) {
      return { ...state, ...payload , modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },
    defSuccess(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
  },
})
