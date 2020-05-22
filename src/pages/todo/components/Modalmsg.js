import  { PureComponent } from 'react'
import { Form, Input, InputNumber, Select , Modal, Cascader } from 'antd'
const { TextArea } = Input;

@Form.create()
class UserModal extends PureComponent {
  handleOk = () => {
    const { onOk, form } = this.props
    const { getFieldsValue } = form

    let fields = getFieldsValue()
    onOk(fields)
  }
  render() {
    const { msgdata, form, ...msgmodalVisible } = this.props
    const { getFieldDecorator } = form
    return (
      <Modal {...msgmodalVisible} width="30%"  onOk={this.handleOk}>
        <div>
          {
            msgdata.operation == '2' ? getFieldDecorator('memo', { initialValue:'' })(
                <TextArea placeholder="拒绝原因" rows={4}  style={{width:'100%'}} />
              ) : '确定进行此操作？'
          }
        </div>
      </Modal>
    )
  }
}

export default UserModal
