import { PureComponent } from 'react'
import { Form, Spin, Timeline, Button, Select, Modal, Tabs, Row, Col, Divider, Collapse } from 'antd'
import { connect } from 'dva'
import Zmage from 'react-zmage'
import styles from './Modal.less'
import moment from 'moment'
const TabPane = Tabs.TabPane;
const Option = Select.Option;
@connect(({ loading }) => ({ loading }))
@Form.create()
class UserModal extends PureComponent {
  state = {
    type: '1',
    Collapse: ''
  }
  Collapseis = (i) => {
    if (this.state.Collapse == i) {
      this.setState({ Collapse: '' })
    } else {
      this.setState({ Collapse: i })
    }

  }
  seeimg = (i) => {
    const { onOk } = this.props
    onOk(i)
  }
  yearchange = (val) => {
    const { onDeleteItem } = this.props
    onDeleteItem(val)
  }
  callback = (key) => {
    this.setState({ Collapse: '' })
    this.setState({ type: key })
  }
  generateImg = (data, i) => {
    const imgarr = data.map((r) => {
      return { src: r.oss_link }
    })
    return (<Row type="flex" justify="space-around" className={styles.modalcontenimg} key={i+'1234'+i} >
      <Col span={20} style={this.state.Collapse == i + 1 ? { height: 'auto' } : { height: '110px', overflow: 'hidden' }}>
        {data.map((r, index) => {
          return (
            <Col key={index+'_'+i+'_1'} style={{ marginTop: '10px', marginBottom: '10px' }} span={3}>
              <div className={styles.contentitem}  >
                <Zmage defaultPage={index} set={imgarr} src={r.oss_link} />
              </div>
            </Col>
          )
        })}
      </Col>
      <Col span={4}>
        <Button onClick={e => { this.Collapseis(i + 1) }} >{this.state.Collapse == i + 1 ? '收起' : '更多'}</Button>
      </Col>
    </Row>)
  }

  generatemodal = data => {
    const info_type = ['子女教育', '赡养老人', '住房租金', '住房贷款', '继续教育', '大病医疗']
    return (
      <div className={styles.modaltitle} >
        <Row type="flex" justify="space-around"  >
          <Col span={6}>
            <Col span={24}>扣除类型</Col>
            <Col className={styles.modaltitlefont} span={24}>
              {info_type[data.info_type]}
            </Col>
          </Col>
          <Col span={6}>
            <Col span={24}>申请时间</Col>
            <Col className={styles.modaltitlefont} span={24}>{data.create_time}</Col>
          </Col>
          {data.info_type != 4 && <Col span={6}>
            <Col span={24}>申请金额</Col>
            <Col className={styles.modaltitlefont} span={24}>
              ￥{data.apply_info.amount}
            </Col>
          </Col>}
          {data.info_type == 4 && <Col span={6}>
            <Col span={24}>申请金额</Col>
            <Col className={styles.modaltitlefont} span={24}>
              ￥{((data.apply_info.degree_info.amount ? Number(data.apply_info.degree_info.amount) :0 )+ (data.apply_info.profession_info.amount ? Number(data.apply_info.profession_info.amount) : 0))}
            </Col>
          </Col>}
          <Col span={6}>
            <Col span={24}>审核金额</Col>
            <Col className={styles.modaltitlefont} span={24}>
              ￥{data.audit_amount}
            </Col>
          </Col>
        </Row>
        <Divider />
        <Row className={styles.modalcontent}  >
          {data.info_type != 4 && <Col  span={8}>
            <Col span={24}>扣除方式：<i>月度</i> </Col>
          </Col>}
          {(data.info_type != 0 && data.info_type != 4) && <Col span={8} >
            <Col span={24}>扣除比例：<i>{data.apply_info.rate * 100}%</i></Col>
          </Col>}

          {data.info_type == 0 && <Col span={8}>
            <Col span={24}>子女个数：<i>{data.apply_info.info.length}</i></Col>
          </Col>}
          {data.info_type == 1 && <Col span={16}><Col span={12}>
            <Col span={24}>纳税人身份：<i>{data.apply_info.only_child_name}</i></Col>
          </Col>
          {data.apply_info.only_child_name != "独生子女" && <Col span={12}>
              <Col span={24}>分摊方式：<i>{data.apply_info.share_type_name}</i></Col>
            </Col>}
          </Col>}
          
          {data.info_type == 2 &&  <Col  span={8}>
          <Col span={24}>主要工作城市：<i>{data.apply_info.province+data.apply_info.city}</i> </Col>
          </Col>}
          {data.info_type == 2 &&  <Col  span={8}>
            <Col span={24}>有无配偶：<i>{data.apply_info.mateshipe_exist_name}</i> </Col>
          </Col>}
          {data.info_type == 2 && data.apply_info.mateshipe_exist && <Col  span={8}>
            <Col span={24}>配偶在纳税人只要工作城市有无住房：<i>{data.apply_info.mateship_house_name}</i> </Col>
          </Col>}
          {data.info_type == 2 && data.apply_info.mateshipe_exist &&  <Col  span={8}>
            <Col span={24}>配偶是否享受住房贷款利息或住房租金专项附加扣除：<i>{data.apply_info.mateship_enjoy_name}</i> </Col>
          </Col>}

          {data.info_type == 3 &&  <Col  span={8}>
            <Col span={24}>有无配偶：<i>{data.apply_info.mateshipe_exist_name}</i> </Col>
          </Col>}
          {/* {data.info_type == 3 && data.apply_info.mateshipe_exist && <Col  span={8}>
            <Col span={24}>配偶是否享受住房贷款利息或住房租金专项附加扣除：<i>{data.apply_info.mateship_borrower_name}</i> </Col>
          </Col>} */}
          {data.info_type == 3 &&  <Col  span={8}>
            <Col span={24}>纳税人是否是借款人：<i>{data.apply_info.is_loan_owner_name}</i> </Col>
          </Col>}
          {data.info_type == 3 &&  <Col  span={8}>
            <Col span={24}>是否婚前各自首套贷款，且婚后分别扣除50%：<i>{data.apply_info.is_first_house_name}</i> </Col>
          </Col>}

          {/* {data.info_type == 4 && <Col span={8}>
            <Col span={24}>继续教育形式：<i>{data.apply_info.education_shape_name}</i> </Col>
          </Col>} */}
          {data.info_type != 4 && <Col  span={24}>
            <Col span={24}>备注：<i>{data.apply_info.memo}</i> </Col>
          </Col>}
        </Row>
      </div>
    )
  }
  generatemap = data => {
    return data.apply_info.info.map((item, index) => {
      return (<div className={styles.modaltitle} key={index+'_6'} >
        <Row type="flex" justify="space-around"  className={styles.modalcontent} >
          <Col  span={24}>
            <i>子女信息</i>
          </Col>
          <Col  span={8}>
            与本人关系：<i>{item.relation_name}</i>
          </Col>
          <Col  span={8}>
            子女姓名：<i>{item.name}</i>
          </Col>
          <Col  span={8}>
            出生日期：<i>{item.birthday}</i>
          </Col>
          <Col  span={8}>
          身份证件类型：<i>{item.papers_type_name}</i>
          </Col>
          <Col  span={8}>
          身份证件号码：<i>{item.papers_number}</i>
          </Col>
          <Col  span={8}>
            国籍(地区)：<i>{item.nationality_name}</i>
          </Col>
          <Col  span={8}>
            当前受教育阶段：<i>{item.education_type_name}</i>
          </Col>
          <Col  span={8}>
            就读国家(地区)：<i>{item.education_area}</i>
          </Col>
          <Col  span={8}>
            就读学校名称：<i>{item.school_name}</i>
          </Col>
          <Col  span={8}>
            受教育时间起：<i>{item.education_start_time}</i>
          </Col>
          <Col  span={8}>
            受教育时间止：<i>{item.education_end_time}</i>
          </Col>
          <Col  span={8}>
            教育时间止：<i>{item.education_dead_time}</i>
          </Col>
          <Col  span={24}>
            扣除比例：<i>{item.rate * 100}%</i>
          </Col>
        </Row>
        {item.attachments.length > 0 && [<Divider key={index+'6'+index} />, this.generateImg(item.attachments, index)]}
      </div>)
    })
  }

  generatemapsylr = data => {
    return (<div className={styles.modaltitle}  >
      {data.apply_info.info.parent_info.map((item, index) => {
        return (
         <div key={index+'_5'} > <Row type="flex"  className={styles.modalcontent} >
            <Col  span={24}>
              <i>被赡养人信息</i>
            </Col>
            <Col  span={8}>
              姓名：<i>{item.name}</i>
            </Col>
            <Col  span={8}>
              出生日期：<i>{item.birthday}</i>
            </Col>
            <Col  span={8}>
            身份证件类型：<i>{item.papers_type_name}</i>
            </Col>
            <Col  span={8}>
            身份证件号码：<i>{item.papers_number}</i>
            </Col>
            <Col  span={8}>
              与本人关系：<i>{item.relation_name}</i>
            </Col>
            <Col  span={8}>
              国籍(地区)：<i>{item.nationality_name}</i>
            </Col>
          </Row>
          {item.attachments.length > 0 && this.generateImg(item.attachments, index)}
          </div>
        )
      })}

      <Divider />
      {data.apply_info.info.parent_suport_info.map((item, index) => {
        return (
          <div key={index+'_4'} > <Row type="flex"  className={styles.modalcontent} >
            <Col span={24}>
              <i>共同赡养人</i>
            </Col>
            <Col span={8}>
              姓名：<i>{item.name}</i>
            </Col>
            <Col span={8}>
            身份证件类型：<i>{item.papers_type_name}</i>
            </Col>
            <Col span={8}>
            身份证件号码：<i>{item.papers_number}</i>
            </Col>
            <Col span={8}>
              国籍(地区)：<i>{item.nationality_name}</i>
            </Col>
          </Row>
            {item.attachments.length > 0 && this.generateImg(item.attachments, index)}
          </div>
        )
      })}
    </div>)
    // })
  }
  generatemapzfdk = data => {
    return data.apply_info.info.map((item, index) => {
      return (<div className={styles.modaltitle} key={index+'_3'} >
        <Row type="flex"  className={styles.modalcontent} >
          <Col span={24}>
            <i>住房贷款利息信息</i>
          </Col>
          <Col  span={8}>
            房屋所在地区：<i>{item.area}</i>
          </Col>
          <Col  span={8}>
            房屋坐落详细地址：<i>{item.address}</i>
          </Col>
          {/* <Col span={8}>
            贷款人是否本人：<i>{item.is_loan_owner_name}</i>
          </Col> */}
          <Col  span={8}>
            房屋证书类型：<i>{item.certificate_type_name}</i>
          </Col>
          <Col span={8}>
            房屋证书号码：<i>{item.certificate_number}</i>
          </Col>
          {/* <Col span={8}>
            是否婚前各自首套贷款，且婚后分别扣除：<i>{item.is_first_house_name}</i>
          </Col> */}
          <Col span={8}>
            贷款类型：<i>{item.loan_type_name}</i>
          </Col>
          {(item.loan_type == 0 || item.loan_type == 2) && <Col span={8}>
            公积金贷贷款银行：<i>{item.loan_bank}</i>
          </Col>}
          {(item.loan_type == 0 || item.loan_type == 2) && <Col span={8}>
          公积金贷贷款合同编号：<i>{item.contract_number}</i>
          </Col>}
          {(item.loan_type == 0 || item.loan_type == 2) && <Col span={8}>
          公积金贷首次还款日期：<i>{item.start_repay_time}</i>
          </Col>}
          {(item.loan_type == 0 || item.loan_type == 2) && <Col span={8}>
          公积金贷贷款期限(月数)：<i>{item.loan_deadline}</i>
          </Col>}

          {(item.loan_type == 1 || item.loan_type == 2) && <Col span={8}>
          商业贷贷款银行：<i>{item.b_loan_bank}</i>
          </Col>}
          {(item.loan_type == 1 || item.loan_type == 2) && <Col span={8}>
          商业贷贷款合同编号：<i>{item.b_contract_number}</i>
          </Col>}
          {(item.loan_type == 1 || item.loan_type == 2) && <Col span={8}>
          商业贷首次还款日期：<i>{item.b_start_repay_time}</i>
          </Col>}
          {(item.loan_type == 1 || item.loan_type == 2) && <Col span={8}>
          商业贷贷款期限(月数)：<i>{item.b_loan_deadline}</i>
          </Col>}
        </Row>
        {/* <Divider /> */}
        {item.attachments.length > 0 && [<Divider key={index+'3'+index} />, this.generateImg(item.attachments, index)]}
      </div>)
    })
  }
  generatemapjxjy = data => {

    const item = data.apply_info;
    return (<div className={styles.modaltitle}  >
      {item.degree_info.amount && <Row type="flex"   className={styles.modalcontent} >
        <Col  span={24}>
          <i>学历(学位)继续教育信息</i>
        </Col>
        <Col  span={8}>
            <Col span={24}>扣除方式：<i>{item.degree_info.deduction_type_name}</i> </Col>
          </Col>
        <Col span={8} >
            <Col span={24}>扣除比例：<i>{item.degree_info.rate * 100}%</i></Col>
        </Col>
        <Col span={8} >
            <Col span={24}>扣除金额：<i>{item.degree_info.amount}</i></Col>
        </Col>
        <Col  span={24}>
            <Col span={24}>备注：<i>{item.degree_info.memo}</i> </Col>
        </Col>
        <Col  span={8}>
          教育阶段：<i>{item.degree_info.info.phase_name}</i>
        </Col>
        <Col  span={8}>
          入学时间：<i>{item.degree_info.info.enter_school_time}</i>
        </Col>
        <Col  span={8}>
          (预计)毕业时间：<i>{item.degree_info.info.graduate_time}</i>
        </Col>
        
     </Row>}
     {item.degree_info.amount && item.degree_info.info.attachments.length>0 && [<Divider key={'degree_info'} />,this.generateImg(item.degree_info.info.attachments, 10)]}
     {item.profession_info.amount &&  <Row type="flex"   className={styles.modalcontent} >
        <Col  span={24}>
          <i>职业资格教育信息</i>
        </Col>
        <Col  span={8}>
            <Col span={24}>扣除方式：<i>{item.profession_info.deduction_type_name}</i> </Col>
          </Col>
        <Col span={8} >
            <Col span={24}>扣除比例：<i>{item.profession_info.rate * 100}%</i></Col>
        </Col>
        <Col span={8} >
            <Col span={24}>扣除金额：<i>{item.profession_info.amount}</i></Col>
        </Col>
        <Col  span={24}>
            <Col span={24}>备注：<i>{item.profession_info.memo}</i> </Col>
        </Col>
        <Col  span={8}>
          继续教育类型：<i>{item.profession_info.info.education_type_name}</i>
        </Col>
        <Col  span={8}>
          发证(批准)日期：<i>{item.profession_info.info.certificate_time}</i>
        </Col>
        <Col  span={8}>
          证书名称：<i>{item.profession_info.info.name}</i>
        </Col>
        <Col  span={8}>
          证书编号：<i>{item.profession_info.info.number}</i>
        </Col>
        <Col  span={8}>
          发证机关：<i>{item.profession_info.info.office}</i>
        </Col>
      </Row>}
      {item.profession_info.amount && item.profession_info.info.attachments.length>0 && [<Divider key={'profession_info'} />,this.generateImg(item.profession_info.info.attachments, 11)]}
    </div>)
  }
  generatemodalzfzj = data => {
    return data.apply_info.info.map((item, index) => {
      return (<div className={styles.modaltitle} key={index+'_2'} >
        <Row type="flex"  className={styles.modalcontent} >
          <Col span={24}>
            <i>租房信息</i>
          </Col>
          <Col span={8}>
          出租方类型：<i>{item.type_name}</i>
          </Col>
          <Col span={8}>
          出租方姓名(组织名称)：<i>{item.name}</i>
          </Col>
          {item.type_name == "个人" && <Col  span={8}>
            出租方身份证件类型：<i>{item.papers_type_name}</i>
          </Col>}
          <Col span={8}>
          出租方身份证件号码：<i>{item.papers_number}</i>
          </Col>
          <Col  span={8}>
            房屋所在地区：<i>{item.area}</i>
          </Col>
          <Col  span={8}>
            房屋坐落详细地址：<i>{item.address}</i>
          </Col>
          <Col span={8}>
            住房租赁合同编号：<i>{item.contract_number}</i>
          </Col>
          <Col span={8}>
            租赁期起：<i>{item.contract_start_time}</i>
          </Col>
          <Col span={8}>
            租赁期止：<i>{item.contract_end_time}</i>
          </Col>
        </Row>
        {/* <Divider /> */}
        {item.attachments.length > 0 && [<Divider key={index+'2'+index} />, this.generateImg(item.attachments, index)]}
      </div>)
    })
  }
  timeline = data => {
    return data.log_list.map((r, index) => {
      return <Timeline.Item key={index+'_1'} color={index == 0 ? '#ffd103' : '#f4f4f4'} >{
        <div>
          <div>{r.split(' ')[0]+' '+r.split(' ')[1]}</div>
          <div>{r.split(' ')[2]}</div>
          <div>{r.split(' ')[3]+r.split(' ')[4]}</div>
        </div>
      }</Timeline.Item>
    })
  }
  componentWillReceiveProps(){
    const {item = {}} = this.props
    this.setState({type:item.defindex+1})
  }
  render() {
    const { item = {}, datalist = [], onOk, form, date, yearall, loading, i18n, ...modalProps } = this.props
    let dates = moment(date).format('YYYY')
    const { getFieldDecorator } = form
    let data = {};
    const datatype = ['znjy', 'sylr', 'zfzj', 'zfdk','jxjy' ]
    let allamount = 0;
    datalist.forEach((r,index) => {
      // allamount += Number(r.apply_info.amount)
      if (r.info_type == 0) data['znjy'] = r;
      if (r.info_type == 1) data['sylr'] = r
      if (r.info_type == 2) data['zfzj'] = r
      if (r.info_type == 3) data['zfdk'] = r
      if (r.info_type == 4) data['jxjy'] = r
    });
    // 
    return (
      <Modal
        {...modalProps}
        width="70%"
        zIndex={998}
        footer={null}
        bodyStyle={{ background: '#f8f8f8' }}
      >
        <Spin spinning={loading.effects['taxs/multi']}>
          <div className={styles.modaltitle} >
            <Row type="flex" justify="space-between">
              <Col span={8}>
                <Col style={{ lineHeight: '40px' }} span={24}>
                  <Col span={8}>年度数据统计</Col>
                  <Col className={styles.modaltitlefont} span={12}>
                    {getFieldDecorator('info_type', { initialValue: dates })(
                      <Select placeholder='' onChange={this.yearchange} style={{ width: '100%' }}>
                        <Option value="2018">2018</Option>
                        <Option value="2019">2019</Option>
                        <Option value="2020">2020</Option>
                        <Option value="2021">2021</Option>
                      </Select>
                    )}
                  </Col>
                </Col>
                <Col style={{ lineHeight: '40px' }} span={24}>
                  <Col span={8}>已扣除金额</Col>
                  <Col className={styles.modaltitlefont} span={12}>￥{yearall.sum_total}</Col>
                </Col>
              </Col>
              <Col span={16}>
                <Col style={{ lineHeight: '40px' }} span={8}>
                  <Col span={8}>子女教育</Col>
                  <Col className={styles.modaltitlefont} span={15}>￥{yearall.sum_child_amount}</Col>
                </Col>
                <Col style={{ lineHeight: '40px' }} span={8}>
                  <Col span={8}>赡养老人</Col>
                  <Col className={styles.modaltitlefont} span={15}>￥{yearall.sum_parent_amount}</Col>
                </Col>
                <Col style={{ lineHeight: '40px' }} span={8}>
                  <Col span={8}>住房租金</Col>
                  <Col className={styles.modaltitlefont} span={15}>￥{yearall.sum_house_rent_amount}</Col>
                </Col>
                <Col style={{ lineHeight: '40px' }} span={8}>
                  <Col span={8}>住房贷款</Col>
                  <Col className={styles.modaltitlefont} span={15}>￥{yearall.sum_house_loan_amount}</Col>
                </Col>
                <Col style={{ lineHeight: '40px' }} span={8}>
                  <Col span={8}>继续教育</Col>
                  <Col className={styles.modaltitlefont} span={15}>￥{yearall.sum_continue_education_amount}</Col>
                </Col>
              </Col>
            </Row>
          </div>
        
          <Tabs activeKey={ String(this.state.type)} animated={false} onChange={this.callback}>
            {data.znjy && <TabPane tab="子女教育" key="1">
              {
                data.znjy ? this.generatemodal(data.znjy) : null
              }
              {data.znjy ? this.generatemap(data.znjy) : null}

            </TabPane>}
            {data.sylr && <TabPane tab="赡养老人" key="2">
              {
                data.sylr ? this.generatemodal(data.sylr) : null
              }
              {data.sylr ? this.generatemapsylr(data.sylr) : null}
            </TabPane>}
            {data.zfzj && <TabPane tab="住房租金" key="3">
              {
                data.zfzj ? this.generatemodal(data.zfzj) : null
              }
              {
                data.zfzj ? this.generatemodalzfzj(data.zfzj) : null
              }
            </TabPane>}
            {data.zfdk && <TabPane tab="住房贷款利息" key="4">
              {
                data.zfdk ? this.generatemodal(data.zfdk) : null
              }
              {data.zfdk ? this.generatemapzfdk(data.zfdk) : null}
            </TabPane>}
            {data.jxjy && <TabPane tab="继续教育" key="5">
              {
                data.jxjy ? this.generatemodal(data.jxjy) : null
              }
              {data.jxjy ? this.generatemapjxjy(data.jxjy) : null}
            </TabPane>}
          </Tabs>
          {data[datatype[this.state.type - 1]] && <div className={styles.modaltitle} >
            <Timeline>
              {this.timeline(data[datatype[this.state.type - 1]])}
            </Timeline>
          </div>}
        </Spin>
      </Modal>
    )
  }
}


export default UserModal
