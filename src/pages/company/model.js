import api from 'api'
const { querycom, setcom } = api
import { pathMatchRegexp } from 'utils'

export default {
  namespace: 'com',
  state: {
    list: {},
    listdata: {},
    flag: true
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/company', location.pathname)) {
          dispatch({
            type: 'query'
          })
        }
      })
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(querycom)
      yield put({
        type: 'updateState',
        payload: { list: data.data, listdata: data.data },
      })
    },
    *setcom({ payload }, { call, put }) {
      const data = yield call(setcom, payload)

      if (data.code == 0) {
        yield put({
          type: 'query'
        })
        yield put({
          type: 'updateState',
          payload: { flag: true }
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
