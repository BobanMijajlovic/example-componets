import React                   from 'react'
import Paper                   from '../../../components/Paper'
import InputTextWithValidation from '../../../forms/componentsWithValidation/InputTextWithValidation'
import {
  required,
  useValidation
}                              from 'react-hook-custom-validation'

import {Button}                           from '../../../components/Button'
import {faEnvelope}                       from '@fortawesome/free-solid-svg-icons'
import {isEmail}                          from 'validator'
import {SpinnerLoadingCenter}             from '../../../components/Spinner/SpinnerLoading'
import {APP_LAYOUT}                       from '../../constants'
import {useAuthPasswordRecoveryLazyQuery} from '../../../graphql/graphql'
import {useApplicationState}              from '../../hooks/useApplicationState'
import {processError}                     from '../../../graphql/utils'
import {useTranslation}                   from 'react-i18next'

export interface IForgotPasswordModel {
  email : string
}

const ForgotPasswordForm = () => {
  const {t} = useTranslation()

  const validation = useValidation<IForgotPasswordModel>({
    initialData: {
      email: 'boban.mijajlovic.rs@gmail.com'
    }
  })

  const {setRedirectLink} = useApplicationState()

  const [queryFun, {loading}] = useAuthPasswordRecoveryLazyQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    onCompleted: () => {
      setRedirectLink(APP_LAYOUT.AUTH, 'success-request-password-changed')
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
    queryFun({
      variables: {
        email: data.email
      }
    })
  }

  return (
    <>
      {loading ? <SpinnerLoadingCenter/> : <></>}
      <Paper header={'Forgot password'}>
        <InputTextWithValidation
                    label={t('globalTranslation.emailLabel')}
                    helperText={t('forgotPasswordForm.helperText')}
                    icon={faEnvelope}
                    validation={{
                      useValidation: validation,
                      model: 'email',
                      rule: {
                        required,
                        useValidator: [
                          {
                            validator: isEmail,
                          }
                        ]
                      }
                    }}
        />
        <div className={'hw-login-form-button'}>
          <Button color={'primary'} outline onClick={handlerOnSubmit} label={'SEND'}/>
        </div>
      </Paper>
    </>
  )
}

export default ForgotPasswordForm
