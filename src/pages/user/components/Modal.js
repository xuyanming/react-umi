import { PureComponent } from 'react'
import { Form, Input, Select, Modal, Cascader } from 'antd'
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
  state = {
    type: 0,
    flagtype:0,
  }
  handleOk = () => {
    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue, setFieldsValue } = form
    const { type } = this.state
    validateFields(errors => {
      if (errors) {
        return
      }

      const data = {
        ...getFieldsValue(),
        staff_id: item.staff_id
      }
      data.dept_id = data.dept_id[data.dept_id.length - 1]
      onOk(data, type)
    })
  }
  selchange = (data) => {
    this.setState({ flagtype: data })
    let _this = this
    if (data == 1) {
      Modal.confirm({
        title: '转让企业联系人',
        content: '转让后，您将不再是企业联系人并且无相关管理权限，请谨慎操作！是否继续操作',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          _this.setState({ type: 1 })
        },
      });

    } else {
      _this.setState({ type: 0 })
    }
  }

  render() {
    const { item = {}, onOk, form, departdata, modalType, i18n, ...modalProps } = this.props
    const { getFieldDecorator, getFieldsValue, setFieldsValue } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={`员工姓名`}  {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [
                {
                  required: true,
                  pattern:  /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/,
                  message: `请填写姓名(汉字且不小于两个字符)`,
                },
              ],
              validateTrigger: 'onBlur'
            })(<Input disabled={modalType !== 'create' && item.is_join} />)}
          </FormItem>
          {/* {modalType !== 'create' && item.is_join && <FormItem label={`手机号`}  {...formItemLayout}>
            {getFieldDecorator('mobile', {
              initialValue: item.mobile,
            })(<Input disabled={modalType !== 'create' && item.is_join} />)}
          </FormItem>} */}
          {modalType == 'create' && <FormItem label={`纳税人身份`}  {...formItemLayout}>
            {getFieldDecorator('identity', {
              initialValue: '0',
            })(<Select disabled={true} >
              <Option value="0">居民个人</Option>
            </Select>)}
          </FormItem>}
          <FormItem label={`手机号`}  {...formItemLayout}>
            {getFieldDecorator('mobile', {
              initialValue: item.mobile,
              rules: [
                {
                  required: true,
                  pattern: /^1(3[0-9]|4[14-9]|5[0-35-9]|66|8[0-9]|7[0-35-8]|9[89])\d{8}$/,
                  message: '请填写正确手机号码',
                },
              ],
              validateTrigger: 'onBlur'
            })(<Input disabled={modalType !== 'create' && item.is_join} />)}
          </FormItem>
          <FormItem label={`证件号`}  {...formItemLayout}>
            {getFieldDecorator('id_number', {
              initialValue: item.id_number,
              rules: [
                {
                  required: true,
                  pattern: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/,
                  message: '请填写正确证件号码',
                },
              ],
              validateTrigger: 'onBlur'
            })(<Input disabled={modalType !== 'create' && item.is_join} />)}
          </FormItem>

          <FormItem label={`所在部门`}  {...formItemLayout}>
            {getFieldDecorator('dept_id', {
              initialValue: item.deptid,
              rules: [
                {
                  required: true,
                  message: '部门不能为空',
                },
              ],
            })(<Cascader changeOnSelect options={departdata} placeholder="" fieldNames={{ label: 'dept_name', value: 'dept_id', children: 'children' }} />)}
          </FormItem>

          <FormItem label={`工号`}  {...formItemLayout}>
            {getFieldDecorator('employee_number', {
              initialValue: item.employee_number,
              rules: [
                { 
                  required:false,
                  pattern: /^[0-9]\d*$/,
                  message: '工号只能为数字'
                },
              ],
              validateTrigger: 'onBlur'
            })(<Input maxLength={32} />)}
          </FormItem>
          {modalType !== 'create' && item.role_type !== 1  && item.is_join && <FormItem label={`角色`}  {...formItemLayout}>
            {getFieldDecorator('role_type', {
              initialValue: item.role_type,
            })(<Select onChange={this.selchange} >
              <Option value={1}>企业联系人</Option>
              <Option value={2}>管理员</Option>
              <Option value={0}>员工</Option>
            </Select>)}
          </FormItem>}
          {modalType !== 'create' && item.is_join && (this.state.flagtype !=item.role_type && this.state.flagtype !=0 ) && item.role_type !== 1  && <FormItem label={`密码`}  {...formItemLayout}>
            {getFieldDecorator('password', {
              initialValue: item.password,
              rules: [{ 
                required: true,
                pattern: /^[0-9a-zA-Z]{6,20}$/,
                message: '请输入6-20位密码' 
              }],
              validateTrigger: 'onBlur'
            })(<Input />)}
          </FormItem>}
        </Form>
      </Modal>
    )
  }
}

export default UserModal
