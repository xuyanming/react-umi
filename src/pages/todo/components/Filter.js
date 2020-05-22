/* global document */
import  { PureComponent } from 'react'
import { Form, Button, Row, Col, Input, Select } from 'antd'

const Option = Select.Option;
const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

@Form.create()
class Filter extends PureComponent {
  

  handleSubmit = () => {
    const { onFilterChange, form } = this.props
    const { getFieldsValue } = form

    let fields = getFieldsValue()
    onFilterChange(fields)
  }

  handleReset = () => {
    const { form } = this.props
    const { getFieldsValue, setFieldsValue } = form

    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    this.handleSubmit()
  }

  render() {
    const { filter, form } = this.props
    const { getFieldDecorator } = form
    const { name, info_type } = filter
    

    return (
      <Row gutter={24}>
        <Col {...ColProps} xl={{ span: 5 }} md={{ span: 8 }}>
          {getFieldDecorator('name', { initialValue: name })(
            <Input placeholder="员工姓名" />
          )}
        </Col>
        <Col
          {...ColProps}
          xl={{ span: 5 }}
          md={{ span: 8 }}
          id="addressCascader"
        >
          {getFieldDecorator('info_type', { initialValue: info_type })(
            <Select placeholder='扣除类型' style={{width:'100%'}}>
              <Option value="0">子女教育</Option>
              <Option value="1">赡养老人</Option>
              <Option value="2">住房租金</Option>
              <Option value="3">住房贷款利息</Option>
              <Option value="4">继续教育</Option>
              <Option value="5">大病医疗</Option>
            </Select>
          )}
        </Col>
        <Col
          {...TwoColProps}
          xl={{ span: 6 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
        >
          <Row type="flex" align="middle" justify="space-between">
            <div>
              <Button
                type="primary"
                className="margin-right"
                onClick={this.handleSubmit}
              >
                搜索
              </Button>
              <Button onClick={this.handleReset}>
                重置
              </Button>
            </div>
          </Row>
        </Col>
      </Row>
    )
  }
}


export default Filter
