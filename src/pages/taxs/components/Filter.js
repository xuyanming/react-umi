/* global document */
import  { PureComponent } from 'react'
import moment from 'moment'
import { FilterItem } from 'components'
import { Form, Button, Row, Col, DatePicker, Input, Select } from 'antd'
const { MonthPicker } = DatePicker
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
  handleFields = fields => {
    const { createTime } = fields
    if (createTime) fields.createTime = moment(createTime._d).format('YYYY-MM');

    return fields
  }

  handleSubmit = () => {
    const { onFilterChange, form } = this.props
    const { getFieldsValue } = form

    let fields = getFieldsValue()
    fields = this.handleFields(fields)
    onFilterChange(fields)
  }

  componentDidMount = () => {
    this.handleSubmit()
  }
  handleReset = () => {
    const { form } = this.props
    const { getFieldsValue, setFieldsValue } = form

    const fields = getFieldsValue()
    for (let item in fields) {
      if (item !== 'createTime') {
        if ({}.hasOwnProperty.call(fields, item)) {
          if (fields[item] instanceof Array) {
            fields[item] = []
          } else {
            fields[item] = undefined
          }
        }
      }else{
        fields[item] = moment(new Date(), 'YYYY-MM-DD')
      }
    }
    setFieldsValue(fields)
    this.handleSubmit()
  }

  render() {
    const { filter = {}, form } = this.props
    const { getFieldDecorator } = form
    let defyear_month = moment(filter.year_month)

    return (
      <Row gutter={24}>
        <Col {...ColProps} xl={{ span: 5 }} md={{ span: 8 }}>
          {getFieldDecorator('name', { initialValue: filter.name })(
            <Input placeholder="员工姓名" />
          )}
        </Col>
        <Col
          {...ColProps}
          xl={{ span: 5 }}
          md={{ span: 8 }}
        >
          {getFieldDecorator('info_type', { initialValue: filter.info_type })(
            <Select placeholder='扣除类型' style={{ width: '100%' }}>
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
          {...ColProps}
          xl={{ span: 8 }}
          md={{ span: 8 }}
          sm={{ span: 12 }}
        > 
          <FilterItem label='扣除月份'>
            {getFieldDecorator('createTime', {
              initialValue: defyear_month,
            })(
              <MonthPicker disabledDate={current => {
                return  current && current.isAfter(moment(Date.now()));
              }}  allowClear={false} style={{ width: '100%' }} />
            )}
          </FilterItem>
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
