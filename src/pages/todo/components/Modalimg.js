import  { PureComponent } from 'react'
import { Form, Input, InputNumber, Select , Modal, Cascader } from 'antd'


@Form.create()
class UserModal extends PureComponent {


  render() {
    const { imgurl, ...moneymodalProps } = this.props
    return (
      <Modal {...moneymodalProps} width="50%"  footer={null} >
        <img src={imgurl} style={{maxWidth:'600px'}} />
      </Modal>
    )
  }
}

export default UserModal
