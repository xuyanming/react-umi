import  { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button,Checkbox, Divider, Form, Icon, Input } from 'antd'
import config from 'utils/config'
import styles from './index.less'
const FormItem = Form.Item
const InputGroup = Input.Group;
@connect(({ loading }) => ({ loading }))
@Form.create()
class rest extends PureComponent {
  
  componentWillUnmount() {
    clearInterval(this.interval);
    const {  onchange } = this.props
    onchange({ count:0 });
  }
  handleOk = () => {
    const { dispatch, form } = this.props
    const { validateFieldsAndScroll } = form
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }else{
        dispatch({ type: 'login/setcode', payload: values })
      }

    })
  }

  onGetCaptchas = () =>{
    const {  form } = this.props
    const { validateFields } = form
    return new Promise((resolve, reject) => {
      validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          // return
        } else {
          const { dispatch } = this.props;
          dispatch({
            type: 'login/querycode',
            payload: {mobile:values.mobile,code_type:'4'},
          })
          .then(resolve)
          .catch(reject);
        }
      });
    });
  }
  onGetCaptcha = () => {
    const result = this.onGetCaptchas()
    if (result === false) {
      return;
    }
    if (result instanceof Promise) {

      result.then(this.runGetCaptchaCountDown);
    } else {
      this.runGetCaptchaCountDown();
    }
  };

  runGetCaptchaCountDown = () => {
    const {  onchange } = this.props
    let count =  59;
    onchange({ count });
    this.interval = setInterval(() => {
      count -= 1;
      onchange({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  render() {

    const { loading, form, count, onchange, ...loginporps } = this.props
    const { getFieldDecorator } = form
    
    return (
      <form ref={form => {
        this.loginForm = form;
      }} >
          <div style={{width:'100%',height:'60px',textAlign:'center',lineHeight:'60px'}} >
            {`找回密码(1/2)`}
          </div>
          <FormItem >
          <InputGroup >
          {getFieldDecorator('mobile', {
            rules: [
              {
                required: true,
                pattern: /^1(3[0-9]|4[14-9]|5[0-35-9]|66|8[0-9]|7[0-35-8]|9[89])\d{8}$/,
                message: '请输入正确手机号',
              },
            ],
            validateTrigger: 'onBlur'
          })(
            <Input size="large" className={styles.antloginput} style={{ width: '59%' }} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="请输入手机号" />
          )} 
          <Divider type="vertical" style={{margin:'0',backgroundColor: '#dfdfdf'}} />
          <Button
            style={{ width: '40%',border:'none',borderBottom:'1px solid #dfdfdf' }}
            size="large"
            disabled={count}
            onClick={e => { e.stopPropagation(); e.nativeEvent.stopImmediatePropagation();this.onGetCaptcha()}}
          >
            {count ? `${count}s` : '获取验证码'}
          </Button>
          </InputGroup>

          </FormItem>
          <FormItem >
            {getFieldDecorator('code', {
              rules: [{ required: true,pattern: /^\d{6}$/, message: '请输入正确验证码' }],validateTrigger: 'onBlur'
            })(
              <Input size="large" className={styles.antloginput} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="请输入验证码" />
            )}
          </FormItem>
            <FormItem>
              <Button
              type="primary"
              size="large"
              onClick={e=>{this.handleOk()}}
              loading={loading.effects['login/setcode']}
            >
              下一步
            </Button>
            <a className={styles.loginformforgot} onClick={e => { onchange({ flag: false, step: 1 }) }} >返回登录</a>
            </FormItem>
        </form>
    )
  }
}


export default rest
