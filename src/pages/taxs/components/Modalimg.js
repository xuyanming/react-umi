import  { PureComponent } from 'react'
import { Modal } from 'antd'

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
