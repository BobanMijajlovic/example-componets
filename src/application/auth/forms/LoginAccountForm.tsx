import React                           from 'react'
import {Button}                        from '../../../components/Button'
import {
  faKey,
  faUser
}                                      from '@fortawesome/free-solid-svg-icons'
import InputTextWithValidation         from '../../../forms/componentsWithValidation/InputTextWithValidation'
import {required}                      from 'react-hook-custom-validation'
import InputTextPasswordWithValidation from '../../../forms/componentsWithValidation/InputTextPasswordWithValidation'
import {IUseValidation}                from 'react-hook-custom-validation/lib/interface'
import {NavLink}                       from 'react-router-dom'
import {useTranslation}                from 'react-i18next'

export interface ILoginAccountModel {
  accountCode : string
  username : string
  password : string
}

export interface ILoginAccountFormProps {
  handlerOnSubmit : () => void
  validation : IUseValidation<ILoginAccountModel>
}

const LoginAccountForm = ({handlerOnSubmit, validation} : ILoginAccountFormProps) => {
  const {t} = useTranslation()
  return (
    <div className={'hw-login-root'}>
      <InputTextWithValidation
                required
                icon={faUser}
                label={t('globalTranslation.accountCodeLabel')}
                helperText={t('globalTranslation.accountCodeHelperText')}
                validation={{
                  useValidation: validation,
                  model: 'accountCode',
                  rule: {
                    required,
                  }
                }}
      />
      <InputTextWithValidation
                required
                icon={faUser}
                label={t('globalTranslation.userNameLabel')}
                helperText={t('globalTranslation.userNameHelperText')}
                validation={{
                  useValidation: validation,
                  model: 'username',
                  rule: {
                    required
                  }
                }}
      />

      <InputTextPasswordWithValidation
                required
                icon={faKey}
                type={'password'}
                label={t('globalTranslation.passwordLabel')}
                helperText={t('globalTranslation.passwordHelperText')}
                validation={{
                  useValidation: validation,
                  model: 'password',
                  rule: {
                    required
                  }
                }}
      />

      <div className={'hw-login-forgot-password'}>
        <NavLink to={'/application/auth/forgot-password'}>{t('globalTranslation.forgotPassword')}</NavLink>
      </div>

      <div className={'hw-login-form-button'}>
        <Button color={'primary'} outline label={t('globalTranslation.loginButton')} onClick={handlerOnSubmit}/>
      </div>
    </div>
  )
}

export default LoginAccountForm
