import React                    from 'react'
import {useValidation}          from 'react-hook-custom-validation'
import LoginForm, {ILoginModel} from '../forms/LoginForm'
import {
  RouteComponentProps,
  withRouter
}                               from 'react-router'
import {SpinnerLoadingCenter}   from '../../../components/Spinner/SpinnerLoading'
import {APP_LAYOUT}             from '../../constants'
import {easyDialogError}        from '../../../components/EasyModel/EasyModal'
import {
  useAuthLoggedLazyQuery,
  useAuthLoginLazyQuery
}                               from '../../../graphql/graphql'
import {setAccessToken}         from '../../../apollo/accessToken'
import {useApplicationState}    from '../../hooks/useApplicationState'
import {processError}           from '../../../graphql/utils'

const LoginNormal = (props : RouteComponentProps) => {

  const validation = useValidation<ILoginModel>({
    initialData: {
      email: 'boban.mijajlovic.rs@gmail.com',
      password: 'Bobi123$$'
    }
  })

  const {setRedirectLink, setLoggedAccount} = useApplicationState()

  const [loginFunAccount, {loading: loadingAccount, refetch}] = useAuthLoggedLazyQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setLoggedAccount(data.authLogged as any)
      setRedirectLink(APP_LAYOUT.MAIN, 'accounts')
    },
    onError: (e) => {
      console.log(e)
    }
  })

  const [loginFun, {loading}] = useAuthLoginLazyQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setAccessToken(data.authLogin.token)
      refetch ? refetch() : loginFunAccount()
    },
    onError: (error) => {
      const s = processError(error, validation)
      if (s) {
        easyDialogError(s)
      }
    }
  })

  const handlerOnSubmit = async () => {
    const {error, data: dataValidate} = await validation.validate()
    if (error) {
      return
    }
    loginFun({
      variables: {
        data: {
          userName: dataValidate.email,
          password: dataValidate.password
        }

      }
    })
  }
  return (
    <>
      {loading || loadingAccount ? <SpinnerLoadingCenter/> : <></>}
      <div className={''}>
        <LoginForm handlerOnSubmit={handlerOnSubmit} validation={validation}/>
      </div>
    </>
  )
}

export default withRouter(LoginNormal)
