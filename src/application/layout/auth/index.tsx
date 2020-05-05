import React, {useEffect}   from 'react'
import Footer               from '../../component/Footer'
import AuthNavBar           from '../../navbars/AuthNavBar'
import {Switch}             from 'react-router-dom'
import {
  Route,
  withRouter
}                           from 'react-router'
import RegisterForm         from '../../auth/forms/RegistrationForm'
import LoginForm            from '../../auth/Login'
import ConfirmRegistration  from '../../auth/ConfirmRegistration'
import ForgotPasswordForm   from '../../auth/forms/ForgotPasswordForm'
import RedirectedStatusForm from '../../component/util/RedirectedStatusForms'

import {
  APP_LAYOUT,
  APPLICATION_MAIN_SUB_DOMAIN
}                          from '../../constants'
import ChangePasswordForm  from '../../auth/forms/ChangePasswordForm'
import {setUseAccessToken} from '../../../apollo/accessToken'

const Layout = () => {

  const pathAuth = React.useCallback((link : string) => {
    return `/${APPLICATION_MAIN_SUB_DOMAIN}/${APP_LAYOUT.AUTH}/${link}`
  }, [])

  useEffect(() => {
    setUseAccessToken(false)
  }, [])

  return (
    <div className={'hw-app-layout-auth'}>
      <AuthNavBar/>
      <div className={'hw-app-layout-auth-data'}>
        <Switch>
          <Route path={pathAuth('login')}><LoginForm/></Route>
          <Route path={'/application/auth/register'}><RegisterForm/></Route>
          <Route path={'/application/auth/lock'}>
            <div>Lock</div>
          </Route>
          <Route path={'/application/auth/forgot-password'}><ForgotPasswordForm/></Route>
          <Route path={pathAuth('change-password')}>
            <ChangePasswordForm/>
          </Route>
          <Route path={'/application/auth/confirm-registration'}><ConfirmRegistration/></Route>
          <Route path={'/application/auth/success-registration'}>
            <RedirectedStatusForm
                            title={'Account Successfully Registered !'}
                            text={'you have successfully completed user registration!'}
                            sub={'Please check your email to complete activation.'}
                            link={'success-registration'}
                            redirectLayout={APP_LAYOUT.AUTH}
                            redirectLink={'login'}
            />
          </Route>
          <Route path={pathAuth('success-request-password-changed')}>
            <RedirectedStatusForm
                            title={'Request to change password!'}
                            text={'you have successfully requested to perform change!'}
                            sub={'Please check your email to complete action.'}
                            link={'success-request-password-changed'}
                            redirectLayout={APP_LAYOUT.AUTH}
                            redirectLink={'login'}
            />
          </Route>

          <Route path={pathAuth('success-password-changed')}>
            <RedirectedStatusForm
                            title={'Password changed!'}
                            text={'you have successfully performed change!'}
                            sub={'Please to to login page'}
                            link={'success-password-changed'}
                            redirectLayout={APP_LAYOUT.AUTH}
                            redirectLink={'login'}
            />
          </Route>

        </Switch>
      </div>
      <Footer/>

    </div>
  )
}

export default withRouter(Layout)
