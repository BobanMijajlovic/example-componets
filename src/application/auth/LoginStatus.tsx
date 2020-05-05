import React             from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignOutAlt,}   from '@fortawesome/free-solid-svg-icons'

export interface ILoginStatus {
  changeStatus : () => void
  label ?: string
}

const LoginStatus = ({changeStatus, label} : ILoginStatus) => {

  return (
    <div className={'hw-logged-icon'}>

      <div className={'hw-logged-user font-smaller-3'}>DEAL SELL USER</div>
      <div className={'hw-login-icon'}>
        <FontAwesomeIcon icon={faSignOutAlt} onClick={changeStatus}/>
      </div>

      <div className={'hw-logout-label'}>{label} </div>

    </div>
  )
}

export default LoginStatus
