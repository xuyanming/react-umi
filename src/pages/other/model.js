import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import api from 'api'
const {queryother, setother } = api
import { pathMatchRegexp } from 'utils'

export default {
  namespace: 'other',
  state: {
    list:[],
    listdata:[],
    flag:true
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/other', location.pathname)) {
          dispatch({
            type: 'query'
          })
        }
      })
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(queryother)
      if(data.code == 0){
        yield put({
          type: 'updateState',
          payload:{list:data.data,listdata:data.data},
        })
      }
      
    },
    *setother({ payload}, { call, put }) {
      const data = yield call(setother, payload)
      if (data.code==0) {
        yield put({
          type: 'updateState',
          payload:{flag:true},
        })
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
