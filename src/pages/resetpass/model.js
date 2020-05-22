import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import api from 'api'
const {changepassword } = api
import { message } from 'antd'

export default {
  namespace: 'reset',
  state: {
    
  },
  subscriptions: {
    
  },
  effects: {
    *reset({ payload }, { call, put }) {
      const data = yield call(changepassword,payload)
      if(data.code == 0){
        message.success('修改成功')
      }else{
        message.error('修改失败')
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
