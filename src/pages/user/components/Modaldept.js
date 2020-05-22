import  { PureComponent } from 'react'
import { Form, Modal, Cascader } from 'antd'


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
    const { validateFields, getFieldsValue, setFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }

      const data = {
        ...getFieldsValue(),
      }
      data.dept_id = data.dept_id.splice(-1, 1)[0]
      onOk(data)
    })
  }

  render() {
    const { item = {}, onOk, form, departdata, ...deptmodalProps } = this.props

    const { getFieldDecorator } = form
    return (
      <Modal {...deptmodalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={`将选中员工移动到`} hasFeedback {...formItemLayout}>
            {getFieldDecorator('dept_id', {
              initialValue: item.dept_id,
            })(<Cascader changeOnSelect options={departdata} placeholder="" fieldNames={{ label: 'dept_name', value: 'dept_id', children: 'children' }} />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default UserModal
