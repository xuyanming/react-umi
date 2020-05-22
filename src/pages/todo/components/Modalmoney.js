import  { PureComponent } from 'react'
import { Form, Input, Modal } from 'antd'


const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
@Form.create()
class UserModal extends PureComponent {
  handleOk = () => {
    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue,setFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      
      const data = {
        ...getFieldsValue(),
      }
      onOk(data)
    })
  }

  render() {
    const { amountchange, amountchangetype, onOk, form, ...moneymodalProps } = this.props

    const { getFieldDecorator } = form
    return (
      <Modal {...moneymodalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={`修改金额`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('amount', {
              initialValue: amountchange[amountchangetype],
            })(<Input type="number"  />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default UserModal
