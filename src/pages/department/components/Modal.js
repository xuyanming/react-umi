import  { PureComponent } from 'react'
import { Form, Input, InputNumber, Select , Modal, Cascader } from 'antd'


const FormItem = Form.Item
const Option = Select.Option;
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
    const { item = {}, modalType, onOk, form } = this.props
    const { validateFields, getFieldsValue,setFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      
      let data = {
        ...getFieldsValue(),
      }
      let info={}
      if(modalType == 'create'){
        if(data.dept_id) info['dept_id'] = data.dept_id[data.dept_id.length-1]
      }else{
        info['dept_id'] = item.dept_id
      }
      info['name']=data.name
      onOk(info)
    })
  }

  render() {
    const { item = {}, onOk, modalType, form, departdata, ...modalProps } = this.props
    
    const { getFieldDecorator } = form
    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={`部门名称`}  {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: item.dept_name,
              rules: [
                {
                  required: true,
                  message: '部门名称不能为空',
                },
              ],
            })(<Input />)}
          </FormItem>
          {modalType == 'create' && <FormItem label={`所属部门`}  {...formItemLayout}>
            {getFieldDecorator('dept_id', {
              initialValue: item.pid,
              rules: [
                {
                  required: true,
                  message: '所属部门不能为空',
                },
              ],
            })(<Cascader changeOnSelect  options={departdata} placeholder=" "  fieldNames={ {label:'dept_name', value: 'dept_id', children: 'children'} } />)}
          </FormItem>}
        </Form>
      </Modal>
    )
  }
}

export default UserModal
