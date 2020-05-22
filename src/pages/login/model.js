import { router, pathMatchRegexp } from 'utils'
import api from 'api'
const { loginUser, reset, setcode, querycode } = api

import Cookies from 'js-cookie'


export default {
  namespace: 'login',

  state: {
    mobile: '',
    code: '',
    password: "",
    step: 1,
    flag: false,
    count: 0
  },

  effects: {
    *login({ payload }, { put, call, select }) {
      const data = yield call(loginUser, payload)
      // const { locationQuery } = yield select(_ => _.app)
      if (data.code == 0) {
        Cookies.set('name', data.data.name, { path: '/' });
        // const { from } = locationQuery
        yield put({ type: 'app/query' })
        // if (!pathMatchRegexp('/login', from)) {
        //   if (from === '/') router.push('/dealt')
        //   else router.push(from)
        // } else {
        router.push('/todo')
        // }
      } else {
        throw data
      }
    },
    *querycode({ payload = {} }, { call, put }) {
      const data = yield call(querycode, payload)
      if (data.code == 0) {
      }
    },
    *reset({ payload = {} }, { call, put, select }) {
      const { code, mobile } = yield select(_ => _.login)
      const data = yield call(reset, { password: payload.password })
      if (data.code == 0) {
        yield put({ type: 'defSuccess', payload: { step: 1, flag: false } })
      }
    },

    *setcode({ payload = {} }, { call, put, select }) {
      const data = yield call(setcode, payload)
      if (data.code == 0) {
        yield put({ type: 'defSuccess', payload: { step: 2, flag: true } })
      }
    }

  },
  reducers: {
    defSuccess(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
  },
}
