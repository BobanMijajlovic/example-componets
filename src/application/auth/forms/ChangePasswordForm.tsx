import React                           from 'react'
import Paper                           from '../../../components/Paper'
import {
  areTheSame,
  minLength,
  required,
  useValidation
}                                      from 'react-hook-custom-validation'
import {Button}                        from '../../../components/Button'
import InputTextPasswordWithValidation from './../../../forms/componentsWithValidation/InputTextPasswordWithValidation'
import {faKey}                         from '@fortawesome/free-solid-svg-icons'
import {APP_LAYOUT}                    from '../../constants'
import {easyDialogError}               from '../../../components/EasyModel/EasyModal'
import {
  RouteComponentProps,
  withRouter
}                                      from 'react-router'
import {SpinnerLoadingCenter}          from '../../../components/Spinner/SpinnerLoading'
import {useAuthPasswordChangeMutation} from '../../../graphql/graphql'
import {useApplicationState}           from '../../hooks/useApplicationState'
import {processError}                  from '../../../graphql/utils'
import {useTranslation}                from "react-i18next";

export interface IChangePasswordModel {
  password : string,
  confirmPassword : string
}

const passwordRule = {
  required,
  minLength: minLength({
    message: 'Password must be at least 4 char long',
    min: 4
  }),
  customValidation: (value : string) => {
    if (!value) {
      return false
    }
    if (/[^a-z0-9#$@!+*%]/gi.exec(value)) {
      return 'Password must be in scope of A-Za-z0-9#$@!+*%'
    }

    if (!/[A-Z]/.exec(value)) {
      return 'Password must have at least one Upper case letter'
    }
    if (!/\d/.exec(value)) {
      return 'Password must have at least one number'
    }
    if (!/[a-z]/.exec(value)) {
      return 'Password must have at least one Small case letter'
    }
    return false
  },
  areTheSame: areTheSame({
    message: 'Password must match',
    field: 'confirmPassword'
  })
}

const ChangePasswordForm = (props : RouteComponentProps) => {
  const {t} = useTranslation()
  const validation = useValidation<IChangePasswordModel>()

  const [mutationChangePass, {loading}] = useAuthPasswordChangeMutation()
  const {setRedirectLink} = useApplicationState()

  const handlerOnSubmit = async () => {
    const {error, data} = await validation.validate()
    if (error) {
      return
    }

    const _data = {
      variables: {
        data: {
          password: data.password,
          key: props.location.search.replace(/^.*=\s*(.*)/, '$1')
        }
      }
    }
    mutationChangePass(_data as any).then((result) => {
      setRedirectLink(APP_LAYOUT.AUTH, 'success-password-changed')
    })
      .catch((e) => {
        const s = processError(e, validation)
        if (s) {
          easyDialogError(s)
        }
      })

  }
  return (
    <>
      {loading ? <SpinnerLoadingCenter/> : <></>}
      <Paper header={t('changePasswordForm.header')}>
        <InputTextPasswordWithValidation
                    required
                    label={t('changePasswordForm.changePasswordLabel')}
                    helperText={t('changePasswordForm.changePasswordHelperText')}
                    icon={faKey}
                    validation={{
                      useValidation: validation,
                      model: 'password',
                      rule: passwordRule
                    }}
        />
        <InputTextPasswordWithValidation
                    required
                    label={t('changePasswordForm.repeatPasswordLabel')}
                    helperText={t('changePasswordForm.repeatPasswordHelperText')}
                    icon={faKey}
                    validation={{
                      useValidation: validation,
                      model: 'confirmPassword',
                      rule: {
                        required,
                        areTheSame: areTheSame({
                          message: 'Password must match',
                          field: 'password'
                        })
                      }
                    }}
        />
        <div className={'hw-login-form-button'}>
          <Button color={'primary'} outline onClick={handlerOnSubmit} label={t('changePasswordForm.button')}/>
        </div>
      </Paper>
    </>
  )
}

export default withRouter(ChangePasswordForm)
