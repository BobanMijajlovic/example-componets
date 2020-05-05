import React, {useEffect}       from 'react'
import InputTextWithValidation  from '../../../../forms/componentsWithValidation/InputTextWithValidation'
import {
  minLength,
  required,
  useValidation
}                               from '../../../../validation'
import SelectTextWithValidation from '../../../../forms/componentsWithValidation/SelectTextWithValidation'
import {clientOptionsTypes}     from '../../../constants'
import {
  EasyDialogApolloProvider,
  easyDialogError
}                               from '../../../../components/EasyModel/EasyModal'
import {CenteredDialog}         from '../../../../components/Dialog/DialogBasic'
import {IModalOpenProps}        from '../../modal/interface'
import ButtonsForm              from '../../../../components/Button/ButtonsForm'
import {SpinnerLoadingCenter}   from '../../../../components/Spinner/SpinnerLoading'
import {
  useClientQuery,
  useUpdateClientMutation
}                               from '../../../../graphql/graphql'
import {IClientModel}           from '../../../../graphql/models'
import {processError}           from '../../../../graphql/utils'

const ClientInfo = ({closeDialog, modelHolder, onSubmitSuccess, refQueries} : IModalOpenProps) => {

  const clientId = `${modelHolder.id}`
  const {data, loading} = useClientQuery({
    variables: {
      id: `${clientId}`
    },
    skip: !clientId,
    fetchPolicy: 'network-only'
  })

  const client : any = React.useMemo(() => {
    return data && data.data ? data.data : undefined
  }, [data])

  const validation = useValidation<IClientModel>()

  useEffect(() => {
    if (client) {
      ['taxNumber', 'clientNumber', 'description', 'descriptionShort', 'flag'].forEach((s : string) => validation.setFieldValue(s, client[s].toString(), false))
    }
  }, [client])

  const [mutationClientUpdate, {loading: mutationLoading}] = useUpdateClientMutation({
    refetchQueries: [...(refQueries || [])]
  })

  const handlerOnSubmit = async () => {
    const {error, data} = await validation.validate()
    if (error) {
      return
    }
    const _data = {
      variables: {
        data: {
          ...data,
          flag: +data.flag
        },
        id: +clientId
      }
    }
    await mutationClientUpdate(_data as any).then((v) => {
      onSubmitSuccess && onSubmitSuccess()
      closeDialog && closeDialog()
    })
      .catch((e) => {
        const s = processError(e, validation as any)
        if (s) {
          easyDialogError(s)
        }
      })
  }

  return (
    <>
      {mutationLoading || loading ? <SpinnerLoadingCenter/> : <></>}
      <div className={'hw-client-form-root d-flex flex-wrap'}>
        <div className={'col-md-6 p-2 '}>
          <InputTextWithValidation
                        required
                        align={'align-center'}
                        label={'Tin'}
                        helperText={'enter tin'}
                        validation={{
                          useValidation: validation,
                          model: 'taxNumber',
                          rule: {
                            required
                          }
                        }}
          />
        </div>
        <div className={'col-md-6  p-2'}>
          <InputTextWithValidation
                        required
                        align={'align-center'}
                        label={'Client Number'}
                        helperText={'enter client number'}
                        validation={{
                          useValidation: validation,
                          model: 'clientNumber',
                          rule: {
                            required,
                            minLength: minLength({
                              min: 2
                            }),
                          }
                        }}
          />
        </div>
        <div className={'col-md-12 p-2'}>
          <InputTextWithValidation
                        required
                        label={'Full client name'}
                        helperText={'enter client name'}
                        validation={{
                          useValidation: validation,
                          model: 'description',
                          rule: {
                            required
                          }
                        }}
          />
        </div>
        <div className={'col-md-7 p-2'}>
          <InputTextWithValidation
                        required
                        label={'Short client name'}
                        helperText={'enter client name'}
                        validation={{
                          useValidation: validation,
                          model: 'descriptionShort',
                          rule: {
                            required
                          }
                        }}
          />
        </div>
        <div className={'col-md-5 p-2'}>
          <SelectTextWithValidation
                        required
                        label={'Client type'}
                        helperText={'choose client type'}
                        options={clientOptionsTypes}
                        validation={{
                          useValidation: validation,
                          model: 'flag',
                          rule: {
                            required,
                          }
                        }}
          />
        </div>
        <div className={'container pt-4'}>

          <ButtonsForm
                        buttonsCancel={{
                          label: 'CANCEL',
                          action: closeDialog as any
                        }}
                        buttonSubmit={{
                          label: 'SUBMIT',
                          action: handlerOnSubmit
                        }}
          />
        </div>
      </div>
    </>
  )
}

export default ClientInfo

export const openDialogClientInfo = ({...rest} : IModalOpenProps) => {

  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {

    const Component = () => {
      const ComponentToRender = () => {
        return (
          <ClientInfo
                        closeDialog={closeDialog}
                        {...rest}
          />
        )
      }
      return (
        <>
          <CenteredDialog
                        title={'Edit client info'}
                        closeAction={closeDialog}
                        Component={ComponentToRender}

          />
        </>
      )
    }
    openDialog(<Component/>)
  })
}
