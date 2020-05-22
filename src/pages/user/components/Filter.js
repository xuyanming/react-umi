/* global document */
import  { PureComponent } from 'react'
import { Form, Button, Row, Col, Input, Select, Cascader } from 'antd'

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

    const fields = {
      ...getFieldsValue(),
    }
    if (fields.dept_id) fields.dept_id = fields.dept_id[fields.dept_id.length - 1]
    onFilterChange({ ...fields })
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
    const { filter,link_count, form, onAdd, departdata } = this.props
    const { getFieldDecorator } = form
    const { item = {} } = filter
    return (
      <Row gutter={24}>
        <Col
          {...ColProps}
          xl={{ span: 5 }}
          md={{ span: 8 }}
        >
          {getFieldDecorator('is_link')(
            <Select allowClear placeholder='人员' style={{ width: '100%' }}>
              <Option value={''}>{`全部(${link_count.link_count+link_count.unlink_count}人)`}</Option>
              <Option value={0}>{`离职(${link_count.unlink_count}人)`}</Option>
              <Option value={1}>{`在职(${link_count.link_count}人)`}</Option>
            </Select>
          )}
        </Col>
        <Col {...ColProps} xl={{ span: 5 }} md={{ span: 8 }}>
          {getFieldDecorator('name')(
            <Input placeholder="姓名" />
          )}
        </Col>
        <Col {...ColProps} xl={{ span: 5 }} md={{ span: 8 }}>
          {getFieldDecorator('mobile')(
            <Input placeholder="手机号" />
          )}
        </Col>
        <Col
          {...ColProps}
          xl={{ span: 5 }}
          md={{ span: 8 }}
        >
          {getFieldDecorator('role_type')(
            <Select placeholder='角色' style={{ width: '100%' }}>
              <Option value={1}>企业联系人</Option>
              <Option value={2}>管理员</Option>
              <Option value={0}>员工</Option>
            </Select>
          )}
        </Col>
        <Col
          {...ColProps}
          xl={{ span: 5 }}
          md={{ span: 8 }}
        >
          {getFieldDecorator('is_join')(
            <Select allowClear placeholder='是否关联企业' style={{ width: '100%' }}>
              <Option value={1}>是</Option>
              <Option value={0}>否</Option>
            </Select>
          )}
        </Col>
        <Col
          {...ColProps}
          xl={{ span: 5 }}
          md={{ span: 8 }}
        >
          {getFieldDecorator('dept_id')(
            <Cascader changeOnSelect allowClear style={{ width: '100%' }} options={departdata} placeholder="部门" fieldNames={{ label: 'dept_name', value: 'dept_id', children: 'children' }} />
          )}
        </Col>
        <Col
          {...TwoColProps}
          xl={{ span: 14 }}
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
            <div>
              <Button className="margin-right"
                onClick={() => { onAdd('2') }}
              >
                批量导入
              </Button>
              <Button type="primary" onClick={() => { onAdd('1') }} >
                添加员工
              </Button>
            </div>
          </Row>
        </Col>
      </Row>
    )
  }
}


export default Filter
