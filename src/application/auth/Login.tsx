import React, {useState} from 'react'
import Paper             from '../../components/Paper'
import LoginAccount      from './login/LoginAccount'
import LoginNormal       from './login/LoginNormal'

const Login = () => {

  const [state, setState] = useState(false)

  const handlerChangeLogin = () => {
    setState(!state)
  }

  return (
    <>
      <div className={'hw-login-method'}>
        <div className={`hw-login-tab${!state ? ' active' : ''}`} onClick={handlerChangeLogin}> By email</div>
        <div className={`hw-login-tab${state ? ' active' : ''}`} onClick={handlerChangeLogin}> By username</div>
      </div>
      <Paper header={'Login Form'}>
        <div style={!state ? {paddingTop: 40} : {}}>{!state ? <LoginNormal/> : <LoginAccount/>}</div>
      </Paper>
    </>
  )
}

export default Login
