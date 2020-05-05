import React                                  from 'react'
import {useValidation}                        from 'react-hook-custom-validation'
import {
  RouteComponentProps,
  withRouter
}                                             from 'react-router'
import {SpinnerLoadingCenter}                 from '../../../components/Spinner/SpinnerLoading'
import LoginAccountForm, {ILoginAccountModel} from '../forms/LoginAccountForm'
import {
  useAuthLoggedLazyQuery,
  useAuthLoginLazyQuery
}                                             from '../../../graphql/graphql'
import {APP_LAYOUT}                           from '../../constants'
import {setAccessToken}                       from '../../../apollo/accessToken'
import {useApplicationState}                  from '../../hooks/useApplicationState'
import {processError}                         from '../../../graphql/utils'

const LoginAccount = (props : RouteComponentProps) => {

  const validation = useValidation<ILoginAccountModel>({
    initialData: {
      accountCode: '',
      username: 'boban.mijajlovic.rs@gmail.com',
      password: 'Bobi123$$'
    }
  })

  const {setRedirectLink} = useApplicationState()

  const [loginFunAccount, {loading: loadingAccount, refetch}] = useAuthLoggedLazyQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    onCompleted: () => {
      setRedirectLink(APP_LAYOUT.MAIN, 'accounts')
    },
    onError: (e) => {
      console.log(e)
    }
  })
  const [loginFun, {loading}] = useAuthLoginLazyQuery({
    onCompleted: async (data : any) => {
      setAccessToken(data.authLogin.token)
      refetch ? refetch() : loginFunAccount()
    },
    onError: (error) => {
      processError(error, validation)
    }
  })

  const handlerOnSubmit = async () => {
    const {error, data} = await validation.validate()
    if (error) {
      return
    }
    const dataValidate : any = data
    loginFun({
      variables: {
        data: {
          accountCode: dataValidate.accountCode,
          userName: dataValidate.username,
          password: dataValidate.password
        },

      }
    })
  }

  return (
    <>
      {loading || loadingAccount ? <SpinnerLoadingCenter/> : <></>}
      <div className={''}>
        <LoginAccountForm handlerOnSubmit={handlerOnSubmit} validation={validation}/>
      </div>
    </>
  )

}

export default withRouter(LoginAccount)
