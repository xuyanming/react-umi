import  { PureComponent } from 'react'
import { connect } from 'dva'
import { Page, ScrollBar } from 'components'
import styles from './index.less'
import {
  Form, Icon, Input, Button, Select, Row, Col,
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
@connect(({ other, loading }) => ({ other, loading }))
class other extends PureComponent {
  
  handleSubmit = (e) => {
    const { location, dispatch, other, loading } = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'other/setother',
          payload:{...values,setting_type:0}
        })
        // .then(() => {
        //   dispatch({
        //     type: 'other/updateState',
        //     payload:{flag:true}
        //   })
        // })
      }
    });
  }
  handleclick = (e) =>{
    const { location, dispatch, other, loading } = this.props
    dispatch({
      type: 'other/updateState',
      payload:{flag:false}
    })
  }
  handleclickcal = (e) =>{
    const { location, dispatch, other , loading } = this.props

    const { form } = this.props
    const { getFieldsValue, setFieldsValue } = form

    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
         
          fields[item] = other.list[item]
      }
    }
    setFieldsValue(fields)
    dispatch({
      type: 'other/updateState',
      payload:{flag:true}
    })
  }
  Selectoption = data=>{
    return Object.keys(Array.apply(null, {length:15})).map((r,index)=>{
      return <Option key={index+1} value={index+1}>{index+1}</Option>
    })
  }
  render() {
    const { location, dispatch, other, loading } = this.props
    const {list,listdata} = other
    const {value} = list
    const { getFieldDecorator } = this.props.form;
    return (
      <Page className={styles.com} 
      >
        <Row type="flex" justify="space-around" align="middle"  >
          <Col span={23} style={{textAlign:'right'}}>
              {other.flag ?  <Button onClick={this.handleclick} >编辑</Button>: null}
          </Col>
        </Row>
        <Row type="flex" justify="space-around" align="middle"  >
          <Col span={10} style={{textAlign:'center'}}>
           <div>
            员工申报信息于每月
              <Form style={{display: 'inline-block'}}>
                <FormItem>
                  {getFieldDecorator('value', 
                  {initialValue: value,
                    rules: [{ required: true, message: '请输入您的公司名称' }],
                  })(
                    <Select disabled={other.flag} style={{ width: 130 }} >
                      {this.Selectoption()}
                    </Select>
                  )}
                </FormItem>
              </Form>
              日前停止申报
              </div>
              <div style={{textAlign:"left",fontSize:"12px",color:"#999"}}>
                注：<br/>1、截止申报日期之前，员工提交的为上个月的专项附加扣除信息；截止申报日期之后，员工提交的为本月的专项附加扣除信息。
                    <br/>2、每月截止日期只能修改一次，截止日期为当日零点。
              </div>
          </Col>
        </Row>
        <Row type="flex" justify="space-around" align="middle"  >
         {other.flag ? null : <Col span={8} className={styles.combottom} >
              <Button onClick={this.handleclickcal} >
                取消
              </Button>
              <Button type="primary" loading={loading.effects['other/setother']}  onClick={this.handleSubmit} >
                保存
              </Button>
          </Col>}
          
        </Row>
      </Page>
    )
  }
}
const WrappedNormalLoginForm = Form.create()(other);
export default WrappedNormalLoginForm
