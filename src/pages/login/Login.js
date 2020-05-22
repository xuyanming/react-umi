import { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { Button, Checkbox, Form, Icon, Input } from 'antd'
import styles from './index.less'
const FormItem = Form.Item
const InputGroup = Input.Group;
@connect(({ loading }) => ({ loading }))
@Form.create()
class Login extends PureComponent {

  handleOk = () => {
    const { dispatch, form } = this.props
    const { validateFieldsAndScroll } = form
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'login/login', payload: values })
    })
  }

  render() {

    const { loading, form, onchange, ...loginporps } = this.props
    const { getFieldDecorator } = form

    return (
      <form>
        <FormItem >
          {getFieldDecorator('mobile', {
            rules: [
              {
                required: true,
                pattern: /^1(3[0-9]|4[14-9]|5[0-35-9]|66|8[0-9]|7[0-35-8]|9[89])\d{8}$/,
                message: '请输入手机号',
              },
            ],
            validateTrigger: 'onBlur'
          })(
            <Input size="large" className={styles.antloginput} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} onPressEnter={this.handleOk} placeholder="账号" />
          )}
        </FormItem>
        <FormItem >
          {getFieldDecorator('password', {
            rules: [{ 
              required: true,
              pattern: /^[0-9a-zA-Z]{6,20}$/,
              message: '请输入6-20位密码' 
            }],
            validateTrigger: 'onBlur'
          })(
            <Input size="large" className={styles.antloginput} onPressEnter={this.handleOk} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: false,
          })(
            <Checkbox>记住账号</Checkbox>
          )}
          <a className={styles.loginformforgot} onClick={e => { onchange({ flag: true, step: 1 }) }} >忘记密码？</a>

        </FormItem>
        <FormItem>
          <Button
            type="primary"
            size="large"
            onClick={this.handleOk}
            loading={loading.effects['login/login']}
          >
            登 录
            </Button>
        </FormItem>
      </form>

    )
  }
}


export default Login
