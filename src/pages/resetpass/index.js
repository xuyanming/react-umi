import  { PureComponent } from 'react'
import { connect } from 'dva'
import { Page, ScrollBar } from 'components'
import { Button,Col, Row, Form, Icon, Input } from 'antd'

import styles from './index.less'

const FormItem = Form.Item
@connect(({ loading }) => ({ loading }))
class reset extends PureComponent {
  
  handleOk = () => {
    const { dispatch, form } = this.props
    const { validateFieldsAndScroll } = form
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'reset/reset', payload: values })
    })
  }


  handleValidator = (rule, val, callback) => {
    const {  form } = this.props
    const { validateFields, getFieldsValue } = form
    if (!val) {
      callback('请输入密码');
    }
    let validateResult =  val === getFieldsValue().new_password  // 自定义规则
    if (!validateResult) {
        callback('密码输入不一致');
    }
    callback();
      
  }
  render() {
    const { location, dispatch, reset, loading } = this.props
 
    const { getFieldDecorator } = this.props.form;
    return (
      <Page className={styles.com} 
      >
        <Row type="flex" justify="space-around" align="middle" style={{textAlign:'center',minHeight:'500px',margin:'0 auto',width:'300px'}} >
          <Col span={24} >
              修改密码
          </Col>
          <Col span={24} style={{textAlign:'left'}}>
            <form>
              <FormItem >
              {getFieldDecorator('old_password')(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} className={styles.antloginput} placeholder="请输入旧密码" />
              )}
              </FormItem>
              <FormItem >
                {getFieldDecorator('new_password', {
                  rules: [{ required: true, message: '请输入密码' }],
                })(
                  <Input className={styles.antloginput} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
                )}
              </FormItem>
              <FormItem >
                {getFieldDecorator('passwordag', {
                  rules: [{
                    validator: this.handleValidator
                }],
                })(
                  <Input  className={styles.antloginput} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="确认密码" />
                )}
              </FormItem>
            </form>
          </Col>
          <Col span={24} >
              <Button type='primary' style={{width:'100%'}} 
              onClick={e=>{this.handleOk() }}
              loading={loading.effects['reset/reset']}
              >完 成</Button>
          </Col>
        </Row>
      </Page>
    )
  }
}
const WrappedNormalLoginForm = Form.create()(reset);
export default WrappedNormalLoginForm
