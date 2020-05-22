import { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { Button, Form, Icon, Input } from 'antd'
import styles from './index.less'
const FormItem = Form.Item
const InputGroup = Input.Group;
@connect(({ loading }) => ({ loading }))
@Form.create()
class Login extends PureComponent {

  handleOk = () => {
    const { dispatch, onchange, form } = this.props
    const { validateFieldsAndScroll } = form
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'login/reset', payload: values })
    })
  }


  handleValidator = (rule, val, callback) => {
    const { form } = this.props
    const { validateFields, getFieldsValue } = form
    if (!val) {
      callback('请输入密码');
    }
    let validateResult = val === getFieldsValue().password  // 自定义规则
    if (!validateResult) {
      callback('密码输入不一致');
    }
    callback();

  }

  render() {
    const { loading, form, onchange, ...loginporps } = this.props
    const { getFieldDecorator } = form

    return (
      <form>
        <div style={{ width: '100%', height: '60px', textAlign: 'center', lineHeight: '60px' }} >
          {`找回密码(2/2)`}
        </div>
        <FormItem >
          {getFieldDecorator('password', {
            rules: [{ 
              required: true,
              pattern: /^[0-9a-zA-Z]{6,20}$/,
              message: '密码为6-20数字或字母组成' 
            }],
            validateTrigger: 'onBlur'
          })(
            <Input size="large" className={styles.antloginput} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
          )}
        </FormItem>
        <FormItem >
          {getFieldDecorator('passwordag', {
            rules: [{
              validator: this.handleValidator
            }],
            validateTrigger: 'onBlur'
          })(
            <Input size="large" className={styles.antloginput} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="确认密码" />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            size="large"
            onClick={e => { this.handleOk() }}
            loading={loading.effects['login/reset']}
          >
            完 成
          </Button>
          <a className={styles.loginformforgot} onClick={e => { onchange({ flag: false, step: 1 }) }} >返回登录</a>
        </FormItem>
      </form>
    )
  }
}

export default Login
