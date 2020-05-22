import  { PureComponent, Fragment } from 'react'
import { connect } from 'dva'
import { Form } from 'antd'
import Loginindex from './Login'
import Rest from './Rest'
import Andrest from './Andrest'
import config from 'utils/config'
import styles from './index.less'
@connect(({ login,loading }) => ({ login,loading }))
@Form.create()
class Login extends PureComponent {

  handleOk = () => {
    const { dispatch, form } = this.props
    const { validateFieldsAndScroll } = form
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'login/login', payload: values })
    })
  }


  render() {
    const { loading, form, login, dispatch } = this.props
    const {step, count, flag} =login
    const loginporps = {
      flag,
      step,
      count,
      onchange(item){
        dispatch({type:'login/defSuccess',payload:item})
      }
    }
    return (
      <Fragment>
        <div className={styles.loginbox}>
          <div className={styles.logincon} >
            <div style={{marginLeft: '50px',marginTop: '80px'}} >
              <p style={{fontSize:'52px',margin:'0'}} >WELCOME</p><p style={{fontSize:'20px',margin:'0'}} >欢迎来到个税云管家</p>
            </div>
            <div className={styles.form}>
              <div className={styles.logo}>
                <img alt="logo" src={config.logoPath} />
                <span>{config.siteName}</span>
              </div>
              {!flag && <Loginindex {...loginporps} ></Loginindex>}
              {flag && step ==1 && <Rest {...loginporps} ></Rest>} 
              {flag && step ==2 && <Andrest {...loginporps} ></Andrest>}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}



export default Login
