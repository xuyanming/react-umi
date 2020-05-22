
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp, arrayToTree } from 'utils'
import { apiPrefix } from 'utils/config'
import { message } from 'antd'
import api from 'api'
const {quweytaxs,
  departTree,
  createUser,
  finishtaxs,
  amount,
  yearall,
  dealtDetail,
  exporttaxs,
  exportalltaxs,
  detailtaxs,
  queryother } = api

import { pageModel } from 'utils/model'

export default modelExtend(pageModel, {
  namespace: 'taxs',

  state: {
    currentItem: {},
    modalVisible: false,
    moneymodalVisible: false,
    imgmodalVisible: false,
    modalType: 'create',
    allchecked:[],
    selectedRowKeys: [],
    indeterminate: false,
    checkAll: false,
    departdata: [],
    datalist: [],
    yearall: {},
    datatime:{},
    imgurl: '',
    filters: {
      year_month: new Date(),
      name: '',
      dept_id: '',
    },
    page:{
      page: 1,
      per_page: 10
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {

      history.listen(location => {
        if (pathMatchRegexp('/taxs', location.pathname)) {
          dispatch({
            type: 'defSuccess',
            payload: {
              filters: {
                year_month: new Date(),
                name: '',
                dept_id: '',
              },
              page:{
                page: 1,
                per_page: 10
              }
            },
          })
          dispatch({
            type: 'depart',
          })
          dispatch({
            type: 'queryother',
          })
        }
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put, select }) {
      const { filters, page, allchecked } = yield select(_ => _.taxs)
      const data = yield call(quweytaxs, {...filters,...page})
      let applyid = data.data.result.map(r => {
        return r.staff_id
      });
      
      if (data.code == 0) {
        yield put({
          type: 'querySuccess',
          payload: {
            applyid,
            list: data.data.result,
            pagination: {
              current: Number(page.page) || 1,
              pageSize: Number(page.per_page) || 10,
              total: data.data.total,
            },
          },
        })
        let oldcheckedList = allchecked.filter(r=>{return applyid.indexOf(r) > -1})
        yield put({ 
          type: 'defSuccess', 
          payload: { 
            selectedRowKeys:oldcheckedList,
            indeterminate: !!oldcheckedList.length && (oldcheckedList.length < applyid.length), 
            checkAll: oldcheckedList.length === applyid.length, 
          } 
        })
      }
    },
    *queryother({ payload }, { call, put }) {
      const data = yield call(queryother)
      if(data.code == 0){
        yield put({
          type: 'updateState',
          payload:{datatime:data.data},
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
            departdata: menuTree
          },
        })
      }
    },
    *finish({ payload }, { call, put, select }) {
      const data = yield call(finishtaxs, payload)
      if (data.code == 0) {
        yield put({ type: 'defSuccess', payload: { allchecked: [] } })
        yield put({type: 'query'})
      } else {
        throw data
      }
    },
    *amount({ payload }, { call, put, select }) {
      const { currentItem } = yield select(_ => _.taxs)
      const data = yield call(amount, { apply_id: currentItem.apply_id, ...payload })
      if (data.code == 0) {
        yield put({
          type: 'hideModal',
          payload: {
            moneymodalVisible: false
          },
        })
        yield put({type: 'query'})
      } else {
        throw data
      }
    },

    *multi({ payload }, { call, put }) {
      const data = yield call(detailtaxs, { year_month: payload.year_month, staff_id: payload.staff_id })
      if (data.code == 0) {
        yield put({ type: 'defSuccess', payload: { datalist: data.data, currentItem: payload.item } })
      } else {
        throw data
      }
    },

    *yearall({ payload }, { call, put }) {
      const data = yield call(yearall, payload)
      if (data.code == 0) {
        yield put({ type: 'updateState', payload: { yearall: data.data } })
      } else {
        throw data
      }
    },
    *exportall({ payload }, { call, put }) {
      try{ 
        const iframe = document.createElement("iframe");
        iframe.style.display = "none"; // 防止影响页面
        iframe.style.height = 0; // 防止影响页面
        iframe.src =`${apiPrefix}/ajax/deduction/info/export?staff_ids=${payload.staff_ids}&year_month=${payload.year_month}`; 
        document.body.appendChild(iframe);
        setTimeout(()=>{
          iframe.remove();
        }, 2 * 60 * 1000);  
      }catch(e){ 
          message.error('下载异常')
      }   
      yield put({ type: 'defSuccess', payload: { allchecked: [] } })
      yield put({type: 'query'})
    },
    *export({ payload }, { call, put }) {
      const data = yield call(exporttaxs, payload)
      if (data.code == 0) {
        yield put({ type: 'defSuccess', payload: { allchecked: [] } })
        yield put({type: 'query'})
        data.data.forEach(r => {
          (function(r){
            try{ 
              const iframe = document.createElement("iframe");
              iframe.style.display = "none"; // 防止影响页面
              iframe.style.height = 0; // 防止影响页面
              iframe.src = apiPrefix + r; 
              document.body.appendChild(iframe);
              setTimeout(()=>{
                iframe.remove();
              }, 2 * 60 * 1000);  
            }catch(e){ 
                message.error('下载异常')
            }   
          })(r)
        });
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



    *detail({ payload }, { select, call, put }) {
      const data = yield call(dealtDetail, { staff_id: payload.staff_id })
      if (data.code == 0) {
        yield put({ type: 'defSuccess', payload: { datalist: data.data, currentItem: payload } })
      } else {
        throw data
      }
    },
  },

  reducers: {
    showModal(state, { payload }) {
      return { ...state, ...payload }
    },

    hideModal(state, { payload }) {
      return { ...state, ...payload }
    },
    defSuccess(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
  },
})
