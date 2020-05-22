import  { PureComponent } from 'react'
import { Row, Col, Upload, message, Button, Modal } from 'antd'
import { apiPrefix } from 'utils/config'
class UserModal extends PureComponent {

  render() {
    const { item = {}, onOk, loadingimport, ...importmodalProps } = this.props
    const props = {
      name: 'staff_xls',
      action: `${apiPrefix}/ajax/business/staff/import`,
      headers: {
        authorization: 'authorization-text',
      },
      showUploadList: false,
      onChange(info) {
        onOk('3')
        if (info.file.status === 'done') {
          onOk('4')
          if (info.file.response.code == 0) {
            onOk('2')
          } else {
            message.error(`${info.file.response.msg}`)
          }
        } else if (info.file.status === 'error') {
          onOk('4')
          message.error("导入失败")
        }
      }

    };
    return (
      <Modal {...importmodalProps} footer={null}>
        <Row type="flex" style={{ textAlign: 'center' }} >
          <Col span={24}>
            <div style={{ margin: '40px 0' }} >
              <p>请按规定格式录入员工信息</p>
              <Button style={{ width: '200px' }}
              >
                <a href={`${apiPrefix}/ajax/business/staffxls/download`}>点击下载模板</a>
              </Button>
            </div>
          </Col>
          <Col span={24}>
            <div style={{ margin: '40px 0' }} >
              <p>选择上传材料</p>
              <Upload  {...props}>
                <Button loading={loadingimport} type="primary" style={{ width: '200px' }} >
                  上传文件
                </Button>
              </Upload>
            </div>
          </Col>
          <Col span={24}>
            <div style={{ margin: '40px 0' }} >
              <Button style={{ width: '200px' }}
                onClick={e => { onOk('1') }}
              >
                取消
            </Button>
            </div>
          </Col>
        </Row>
      </Modal>
    )
  }
}

export default UserModal
