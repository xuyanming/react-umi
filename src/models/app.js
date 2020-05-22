/* global window */

import { router } from 'utils'
import { stringify } from 'qs'
import store from 'store'
import { queryLayout } from 'utils'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'

import api from 'api'
const { logoutUser } = api
import config from 'config'
import Cookies from 'js-cookie'
const list= [
  // {
  //   id: '1',
  //   icon: 'icon-shouye',
  //   name: 'Dashboard',
  //   zhName: '首页',
  //   route: '/dashboard',
  // },
  {
    id: '6',
    breadcrumbParentId: '1',
    name: 'todo',
    zhName: '专项附加扣除待办',
    icon: 'icon-daiban1',
    route: '/todo',
  },
  {
    id: '7',
    breadcrumbParentId: '1',
    name: 'taxs',
    zhName: '员工申请个税信息',
    icon: 'icon-geshui',
    route: '/taxs',
  },
  {
    id: '8',
    breadcrumbParentId: '1',
    name: 'company',
    zhName: '企业信息设置',
    icon: 'icon-cop',
    route: '/company',
  },
  {
    id: '9',
    breadcrumbParentId: '1',
    name: 'department',
    zhName: '部门管理',
    icon: 'icon-bumen',
    route: '/department',
  },
  {
    id: '10',
    breadcrumbParentId: '1',
    name: 'user',
    zhName: '员工管理',
    icon: 'icon-youhuiquanguanli-',
    route: '/user',
  },
  {
    id: '11',
    breadcrumbParentId: '1',
    name: 'other',
    zhName: '其他设置',
    icon: 'icon-shezhi',
    route: '/other',
  },
  {
    id: '12',
    breadcrumbParentId: '1',
    name: 'resetpass',
    zhName: '修改密码',
    icon: 'icon-shezhi',
    route: '/resetpass',
  }
  
]
export default {
  namespace: 'app',
  state: {
    user: {},
    datewite:'',
    permissions: {
      visit: [],
    },
    routeList: [
      {
        id: '1',
        icon: 'laptop',
        name: 'Dashboard',
        zhName: '首页',
        router: '/dashboard',
      },
    ],
    locationPathname: '',
    locationQuery: {},
    theme: store.get('theme') || 'light',
    collapsed: store.get('collapsed') || false,
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        })
      })
    },

    setupRequestCancel({ history }) {
      history.listen(() => {
        const { cancelRequest = new Map() } = window

        cancelRequest.forEach((value, key) => {
          if (value.pathname !== window.location.pathname) {
            value.cancel(CANCEL_REQUEST_MESSAGE)
            cancelRequest.delete(key)
          }
        })
      })
    },

    setup({history, dispatch }) {
      history.listen((location) => {
        if (!Cookies.get('name') && location.pathname != '/login'){
          router.push({
            pathname: '/login'
          })
        }else{
          if(location.pathname == '/'){
            router.push({
              pathname: '/todo'
            })
          }
        }
      })
      dispatch({ type: 'query' })
    },
  },
  effects: {
    *query({ payload }, { call, put, select }) {
      // const { success, user } = yield call(queryUserInfo, payload)
      const { locationPathname } = yield select(_ => _.app)
      if (Cookies.get('name')) {
        // const { list } = yield call(queryRouteList)
        const user={ id: 0,  username: Cookies.get('name'),  permissions: { role: 'admin' },  avatar: 'https://d3iw72m71ie81c.cloudfront.net/male-5.jpg' }
        const { permissions } = user
        let routeList = list
        // if (
        //   permissions.role === ROLE_TYPE.ADMIN ||
        //   permissions.role === ROLE_TYPE.DEVELOPER
        // ) {
        permissions.visit = list.map(item => item.id)

        // } else {
        //   routeList = list.filter(item => {
        //     const cases = [
        //       permissions.visit.includes(item.id),
        //       item.mpid
        //         ? permissions.visit.includes(item.mpid) || item.mpid === '-1'
        //         : true,
        //       item.bpid ? permissions.visit.includes(item.bpid) : true,
        //     ]
        //     return cases.every(_ => _)
        //   })
        // }
        yield put({
          type: 'updateState',
          payload: {
            user,
            permissions,
            routeList,
          },
        })
        // if (pathMatchRegexp('/login', window.location.pathname)) {
        //   router.push({
        //     pathname: '/dealt',
        //   })
        // }
      } else if (queryLayout(config.layouts, locationPathname) !== 'public') {
        router.push({
          pathname: '/login'
        })
      }
    },

    *signOut({ payload }, { call, put }) {
      const data = yield call(logoutUser)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            user: {},
            permissions: { visit: [] },
            menu: [
              // {
              //   id: '1',
              //   icon: 'laptop',
              //   name: 'Dashboard',
              //   zhName: '首页',
              //   router: '/dashboard',
              // },
            ],
          },
        })
        // Cookies.remove('name')
        Cookies.remove('name', { path: '/' })
        router.push({ pathname: '/login' })
      } else {
        throw data
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

    handleThemeChange(state, { payload }) {
      store.set('theme', payload)
      state.theme = payload
    },

    handleCollapseChange(state, { payload }) {
      store.set('collapsed', payload)
      state.collapsed = payload
    },
  },
}
