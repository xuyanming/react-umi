import  { PureComponent } from 'react'
import { Form, Input, Button, Icon, Modal, Tabs, Row, Col, Divider, Spin  } from 'antd'
import { connect } from 'dva'
import Zmage from 'react-zmage'
import styles from './Modal.less'
const TabPane = Tabs.TabPane;

@connect(({ loading }) => ({ loading }))
@Form.create()
class UserModal extends PureComponent {
  state = {
    Collapse:'',
    type:'1',
    deftype:'1',
    flag:false
  }
  Collapseis=(i)=>{
    if(this.state.Collapse == i){
      this.setState({ Collapse: '' })
    }else{
      this.setState({ Collapse: i })
    }
    
  }
  handleClickmoney=(data,i) => {
    const { onDeleteItem, handlemoney, form } = this.props
    handlemoney(data,i)
  }
  handleClick = (data,i) => {
    const { onDeleteItem,amountchange, form } = this.props
    
    onDeleteItem({apply_ids:[data.apply_id],operation:i,amount:amountchange[this.state.flag ? Number(this.state.deftype)-1 : Number(this.state.type)-1],memo:''})
  }
  seeimg =(i)=>{
    const { onOk } = this.props
    onOk(i)
  }
  callback = (key) => {
    this.setState({ Collapse: '' })
    this.setState({ type: key ,flag:true,deftype:key})
  }
  generateImg = (data,i) => {
    console.log(data)
    const imgarr=data.map(r=>{
      return {src:r.oss_link}
    })
    return (<Row type="flex" justify="space-around" className={styles.modalcontenimg} key={i+'1234'+i}
    >

     <Col span={20} style={ this.state.Collapse == i+1 ? {height:'auto' } :{height:'110px',overflow: 'hidden'}}>
         {data.map((r, index) => {
           console.log(r)
           return (
             <Col key={index+'_'+i+'_1'} style={{marginTop:'10px',marginBottom:'10px'}} span={3}>
              <div className={styles.contentitem}  >
                <Zmage zIndex={1001} defaultPage={index} set={imgarr}  src={r.oss_link} />
              </div>
             </Col>
           )
         })}
     </Col>
     <Col span={4}>
       <Button  onClick={e=>{this.Collapseis(i+1)}} >{this.state.Collapse == i+1 ?  '收起' : '更多'}</Button>
     </Col>
   </Row>)
  }
  
  generatemodal = data => {
    const {  form,amountchange } = this.props
    const { getFieldDecorator } = form
    const info_type=['子女教育', '赡养老人', '住房租金', '住房贷款', '继续教育', '大病医疗']
    return (
      <div className={styles.modaltitle} >
        <Row type="flex" justify="space-around"  >
          <Col  span={8}>
            <Col span={24}>扣除类型</Col>
            <Col className={styles.modaltitlefont} span={24}>{info_type[data.info_type]}</Col>
          </Col>
          <Col  span={8}>
            <Col span={24}>申请时间</Col>
            <Col className={styles.modaltitlefont} span={24}>{data.create_time}</Col>
          </Col>
          {data.info_type != 4 && <Col  span={4}>
            <Col span={24}>申请金额</Col>
            <Col className={styles.modaltitlefont} span={24}>
              {/* {getFieldDecorator('amount', { initialValue: data.apply_info.amount })(
                <Input type="number"  style={{width:'90%'}} />
              )} */}
              <Button disabled={true}  onClick={e => { 
                let typedata = this.state.flag ? Number(this.state.deftype)-1 : Number(this.state.type)-1;
                this.handleClickmoney(amountchange[typedata] ? amountchange[typedata] : data.apply_info.amount, typedata)
                  }} >{ amountchange[this.state.flag ? Number(this.state.deftype)-1 : Number(this.state.type)-1] ? amountchange[this.state.flag ? Number(this.state.deftype)-1 : Number(this.state.type)-1] : data.apply_info.amount}</Button>
            </Col>
          </Col>}
          {data.info_type == 4 && <Col  span={4}>
            <Col span={24}>申请金额</Col>
            <Col className={styles.modaltitlefont} span={24}>
              {/* {getFieldDecorator('amount', { initialValue: data.apply_info.amount })(
                <Input type="number"  style={{width:'90%'}} />
              )} */}
              <Button disabled={true}  onClick={e => { 
                let typedata = this.state.flag ? Number(this.state.deftype)-1 : Number(this.state.type)-1;
                this.handleClickmoney(amountchange[typedata] ? amountchange[typedata] : ((data.apply_info.degree_info.amount ? Number(data.apply_info.degree_info.amount) : 0) + (data.apply_info.profession_info.amount ? Number(data.apply_info.profession_info.amount) : 0)), typedata)
                  }} >{ amountchange[this.state.flag ? Number(this.state.deftype)-1 : Number(this.state.type)-1] ? amountchange[this.state.flag ? Number(this.state.deftype)-1 : Number(this.state.type)-1] : ((data.apply_info.degree_info.amount ? Number(data.apply_info.degree_info.amount) : 0) + (data.apply_info.profession_info.amount ? Number(data.apply_info.profession_info.amount) : 0))}</Button>
            </Col>
          </Col>}
          <Col  span={2}>
            <span  onClick={(e) => { this.handleClick(data,'1')}} style={{cursor: 'pointer'}} ><Icon style={{fontSize:'22px', color:'#52c41a', verticalAlign: 'top',marginRight:'10px'}}  type="check-circle" theme="filled" />通过</span>
          </Col>
          <Col  span={2}>
              <span  onClick={(e) => { this.handleClick(data,'2')}} style={{cursor: 'pointer'}} ><Icon style={{fontSize:'22px', color:'#f5222d', verticalAlign: 'top',marginRight:'10px'}} type="close-circle" theme="filled" />拒绝</span>
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

          {data.info_type == 0 &&  <Col  span={8}>
            <Col span={24}>子女个数：<i>{data.apply_info.info.length}</i> </Col>
          </Col>}
          {data.info_type == 1 &&  <Col  span={16}>
          <Col  span={12}>
            <Col span={24}>纳税人身份：<i>{data.apply_info.only_child_name}</i> </Col>
          </Col>
          {data.apply_info.only_child_name != "独生子女" && <Col  span={12}>
            <Col span={24}>分摊方式：<i>{data.apply_info.share_type_name}</i> </Col>
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


          { data.info_type != 4 &&  <Col  span={24}>
            <Col span={24}>备注：<i>{data.apply_info.memo}</i> </Col>
          </Col>}
        </Row>
      </div>
    )
  }
  generatemap = data =>{
    return data.apply_info.info.map((item,index)=>{
     return (<div className={styles.modaltitle} key={index+'_3'} >

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
          证件类型：<i>{item.papers_type_name}</i>
        </Col>
        <Col  span={8}>
          证件号码：<i>{item.papers_number}</i>
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
      {/* <Divider /> */}
      {item.attachments.length>0 && [<Divider key={index+'3'+index} />,this.generateImg(item.attachments, index)]}
    </div>)
    })
  }

  generatemapsylr = data =>{
    // return data.apply_info.info.parent_info.map((item,index)=>{
     return (<div className={styles.modaltitle}  >
       {data.apply_info.info.parent_info.map((item,index)=>{
         return (
           <div  key={index} ><Row type="flex"   className={styles.modalcontent} >
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
          {item.attachments.length>0 && this.generateImg(item.attachments,index)}
          </div>
         )
       })}
      
      <Divider />
      {data.apply_info.info.parent_suport_info.map((item,index)=>{
         return (
          <div key={index} > <Row type="flex"    className={styles.modalcontent} >
            <Col  span={24}>
              <i>共同赡养人</i>
            </Col>
            <Col  span={8}>
              姓名：<i>{item.name}</i>
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
          </Row>
          {item.attachments.length>0 && this.generateImg(item.attachments,index)}
        </div>
         )
       })}
    </div>)
    // })
  }
  generatemapzfdk = data =>{
    return data.apply_info.info.map((item,index)=>{
     return (<div className={styles.modaltitle} key={index+'_2'} >
      <Row type="flex"   className={styles.modalcontent} >
        <Col  span={24}>
          <i>住房贷款利息信息</i>
        </Col>
        <Col  span={8}>
          房屋所在地区：<i>{item.area}</i>
        </Col>
        <Col  span={8}>
          房屋坐落详细地址：<i>{item.address}</i>
        </Col>
        {/* <Col  span={8}>
          贷款人是否本人：<i>{item.is_loan_owner_name}</i>
        </Col> */}
        <Col  span={8}>
         房屋证书类型：<i>{item.certificate_type_name}</i>
        </Col>
        <Col  span={8}>
          房屋证书号码：<i>{item.certificate_number}</i>
        </Col>
        {/* <Col  span={8}>
          是否婚前各自首套贷款，且婚后分别扣除：<i>{item.is_first_house_name}</i>
        </Col> */}
        <Col  span={8}>
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
      {item.attachments.length>0 && [<Divider key={index+'2'+index} />,this.generateImg(item.attachments, index)]}
    </div>)
    })
  }
  generatemapjxjy = data =>{

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
  generatemodalzfzj = data =>{
    return data.apply_info.info.map((item,index)=>{
     return (<div className={styles.modaltitle} key={index+'_1'} >
      <Row type="flex"   className={styles.modalcontent} >
        <Col  span={24}>
          <i>租房信息</i>
        </Col>
        <Col  span={8}>
          出租方类型：<i>{item.type_name}</i>
        </Col>
        <Col  span={8}>
        出租方姓名(组织名称)：<i>{item.name}</i>
        </Col>
        {item.type_name == "个人" && <Col  span={8}>
        出租方身份证件类型：<i>{item.papers_type_name}</i>
        </Col>}
        <Col  span={8}>
        出租方身份证件号码：<i>{item.papers_number}</i>
        </Col>
        <Col  span={8}>
          房屋所在地区：<i>{item.area}</i>
        </Col>
        <Col  span={8}>
          房屋坐落详细地址：<i>{item.address}</i>
        </Col>
        <Col  span={8}>
         住房租赁合同编号：<i>{item.contract_number}</i>
        </Col>
        <Col  span={8}>
          租赁期起：<i>{item.contract_start_time}</i>
        </Col>
        <Col  span={8}>
          租赁期止：<i>{item.contract_end_time}</i>
        </Col>
      </Row>
      {/* <Divider /> */}
      {item.attachments.length>0 && [<Divider key={index+'1'+index} />,this.generateImg(item.attachments, index)]}
    </div>)
    })
  }
  componentWillReceiveProps(){
    const {item = {}} = this.props
    this.setState({type:item.info_type+1})
  }
  render() {
    const { item = {},datalist=[], loading, onOk, form, i18n, ...modalProps } = this.props
    
    let data={};
    let allamount=0;
    datalist.forEach(r => {
      if(r.info_type == 4){
        allamount +=(r.apply_info.degree_info.amount ? Number(r.apply_info.degree_info.amount) : 0)+(r.apply_info.profession_info.amount ? Number(r.apply_info.profession_info.amount) : 0)
      }else{
        allamount += Number(r.apply_info.amount) 
      }
      
      if(r.info_type == 0) data['znjy'] = r;
      if(r.info_type == 1) data['sylr'] = r
      if(r.info_type == 2) data['zfzj'] = r
      if(r.info_type == 3) data['zfdk'] = r
      if(r.info_type == 4) data['jxjy'] = r
    });
    
    return (
      <Modal
        {...modalProps}
        width="70%"
        zIndex={998}
        footer={null}
        bodyStyle={{background:'#f8f8f8'}}
      > 
        <Spin spinning={loading.effects['dealt/detail']}>
          <div className={styles.modaltitle} >
            <Row type="flex" justify="space-between">
              <Col  span={4}>
                <Col span={24}>姓名</Col>
                <Col className={styles.modaltitlefont} span={24}>{item.staff_name}</Col>
              </Col>
              <Col style={{textAlign:'center'}} span={12}>
                <Col span={24}>所在部门</Col>
                <Col className={styles.modaltitlefont} span={24}>{item.dept_name}</Col>
              </Col>
              <Col style={{textAlign:'right'}} span={4}>
                <Col span={24}>申请总额</Col>
                <Col className={styles.modaltitlefont} span={24}>￥{allamount}</Col>
              </Col>
            </Row>
          </div>
          <Tabs activeKey={this.state.flag ? this.state.deftype : String(this.state.type)} animated={false}  onChange={this.callback}>
            {data.znjy && <TabPane tab="子女教育" key="1">
              {
              data.znjy ? this.generatemodal(data.znjy) : null
              }
              {data.znjy  ? this.generatemap(data.znjy) : null}
            
            </TabPane>}
            {data.sylr && <TabPane tab="赡养老人" key="2">
              {
              data.sylr  ? this.generatemodal(data.sylr) : null
              }
              {data.sylr  ? this.generatemapsylr(data.sylr) : null}
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
              data.zfdk  ? this.generatemodal(data.zfdk) : null
              }
              {data.zfdk  ? this.generatemapzfdk(data.zfdk) : null}
            </TabPane>}
            {data.jxjy && <TabPane tab="继续教育" key="5">
            {
              data.jxjy  ? this.generatemodal(data.jxjy) : null
              }
              {data.jxjy  ? this.generatemapjxjy(data.jxjy) : null}
            </TabPane>}
          </Tabs>
        </Spin>
      </Modal>
    )
  }
}


export default UserModal
