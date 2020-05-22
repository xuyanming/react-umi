import { PureComponent } from 'react'
import { connect } from 'dva'
import { Page, } from 'components'
import styles from './index.less'
import {
  Form, Input, Button, Row, Col,
} from 'antd';

const FormItem = Form.Item;
@connect(({ com, loading }) => ({ com, loading }))
class com extends PureComponent {

  handleSubmit = (e) => {
    const { location, dispatch, com, loading } = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'com/setcom',
          payload: values
        })

      }
    });
  }
  handleclick = (e) => {
    const { location, dispatch, com, loading } = this.props
    dispatch({
      type: 'com/updateState',
      payload: { flag: false }
    })
  }
  handleclickcal = (e) => {
    const { location, dispatch, com, loading } = this.props

    const { form } = this.props
    const { getFieldsValue, setFieldsValue } = form

    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {

        fields[item] = com.listdata[item]
      }
    }
    setFieldsValue(fields)
    dispatch({
      type: 'com/updateState',
      payload: { flag: true, list: com.listdata }
    })
  }

  render() {
    const { location, dispatch, com, loading } = this.props
    const { list } = com

    const { getFieldDecorator } = this.props.form;
    return (
      <Page className={styles.com}
      >
        <Row type="flex" justify="space-around" align="middle"  >
          <Col span={23} style={{ textAlign: 'right' }}>
            {com.flag ? <Button onClick={this.handleclick} >编辑</Button> : null}
          </Col>
        </Row>
        <Row type="flex" justify="space-around" align="middle"  >
          <Col span={8}>
            <Col span={24} style={{ textAlign: 'center' }} >企业信息设置</Col>
            {list && <Form className="login-form">
              <FormItem>
                <Col span={24}>公司名称</Col>
                {getFieldDecorator('business_name',
                  {
                    initialValue: list.business_name,
                    rules: [{ required: true, message: '请输入您的公司名称' }],
                  })(
                    <Input disabled={com.flag} className={styles.comantinput} placeholder="请输入您的公司名称" />
                  )}
              </FormItem>
              <FormItem>
                <Col span={24}>纳税人识别号</Col>
                {getFieldDecorator('tax_number',
                  {
                    initialValue: list.tax_number,
                    rules: [{ required: true, message: '请输入纳税人识别号' }],
                  })(
                    <Input disabled={com.flag} className={styles.comantinput} placeholder="请输入纳税人识别号" />
                  )}
              </FormItem>
            </Form>}
          </Col>
        </Row>
        <Row type="flex" justify="space-around" align="middle"  >
          {com.flag ? null : <Col span={8} className={styles.combottom} >
            <Button onClick={this.handleclickcal}  >
              取消
              </Button>
            <Button type="primary" loading={loading.effects['com/setcom']} onClick={this.handleSubmit} >
              保存
              </Button>
          </Col>}

        </Row>
      </Page>
    )
  }
}
const WrappedNormalLoginForm = Form.create()(com);
export default WrappedNormalLoginForm
