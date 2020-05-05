import React                    from 'react'
import {
  minLength,
  required,
  useValidation
}                               from '../../../../validation'
import InputTextWithValidation  from '../../../../forms/componentsWithValidation/InputTextWithValidation'
import ClientAddress            from './ClientAddress'
import ClientContactTable       from './ClientContactTable'
import SelectTextWithValidation from '../../../../forms/componentsWithValidation/SelectTextWithValidation'
import {
  CLIENT_TYPES,
  clientOptionsTypes
}                               from '../../../constants'
import {CenteredDialog}         from '../../../../components/Dialog/DialogBasic'
import {
  EasyDialog,
  EasyDialogApolloProvider,
  easyDialogError
}                               from '../../../../components/EasyModel/EasyModal'
import {SpinnerLoadingCenter}   from '../../../../components/Spinner/SpinnerLoading'
import ButtonsForm              from '../../../../components/Button/ButtonsForm'
import {ContactAddMoreContacts} from './ContactAddEditRender'

import {faUserPlus}               from '@fortawesome/free-solid-svg-icons/faUserPlus'
import {
  IClientModel,
  IContactModal
}                                 from '../../../../graphql/models'
import {useApplicationState}      from '../../../hooks/useApplicationState'
import {
  ClientsDocument,
  useInsertClientMutation
}                                 from '../../../../graphql/graphql'
import {queryVariablesForClients} from '../../../../graphql/variablesq'
import {processError}             from '../../../../graphql/utils'
import {FontAwesomeIcon}          from '@fortawesome/react-fontawesome'

export interface IClientFormProps {
  closeDialog ?: () => void,
  successFunction ?: (client : IClientModel) => void
}

const ClientForm = ({closeDialog, successFunction} : IClientFormProps) => {

  const validation = useValidation<IClientModel>({
    initialData: {
      description: 'HWT DOO',
      descriptionShort: 'HWT D.O.O.',
      flag: +CLIENT_TYPES.OWNER,
      taxNumber: '107112543',
      clientNumber: '20744073',
      contacts: [],
    }
  })

  const {setGlobalClientId} = useApplicationState()
  const [mutationInsertClient, {loading}] = useInsertClientMutation({
    refetchQueries: [
      {
        query: ClientsDocument,
        variables: queryVariablesForClients('')
      }
    ]
  })

  const handlerEventContactAddEditClick = (action : string, index ?: number) => {
    if (action === 'add') {
      openDialogAddContactForm(addContactsHandler, validation.state.contacts)
      return
    }
    if (index !== void(0) && action === 'edit') {
      const data = validation.state.contacts[index]
      openDialogEditContactForm(index, data, validation.state.contacts, editContactHandler)
    }
    if (index !== void(0) && action === 'delete') {
      const {removeArrayData} = validation
      removeArrayData('contacts' as string, index as number)
    }
  }

  const handlerOnSubmit = async () => {
    const {error, data} = await validation.validate()
    if (error) {
      return
    }
    const contacts : any = []
    data.contacts.forEach(({id, flag, value} : IContactModal) => {
      contacts.push({
        id,
        flag: +flag,
        value,
      })
    })
    const _data = {
      variables: {
        data: {
          ...data,
          ...{
            flag: +data.flag,
            contacts,
          }
        }
      }
    }
    await mutationInsertClient(_data as any).then((v) => {
            // setGlobalClientId((v.data as any).client.id)
      const client = (v.data as any).client as IClientModel
      successFunction && successFunction(client)
      closeDialog && closeDialog()
    })
      .catch((e) => {
        const s = processError(e, validation)
        if (s) {
          easyDialogError(s)
        }
      })
  }

  const addContactsHandler = async (contact : IContactModal) => {
    await validation.addArrayData('contacts', contact)
  }

  const editContactHandler = async (contact : IContactModal, index ?: number) => {
    await validation.setFieldValue(`contacts[${index}].flag`, String(contact.flag), true)
    await validation.setFieldValue(`contacts[${index}].value`, String(contact.value), true)
  }

  return (
    <>
      {loading ? <SpinnerLoadingCenter/> : <></>}
      <div className={'hw-client-form-root shadow-lg pt-2'}>
        <div className={'container'}>
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

          <div className={'d-flex justify-content-start flex-column mt-2'}>
            <div className={'d-flex justify-content-start text-upper font-smaller-4 pl-2 '}>
              <span className={'border-bottom-double'}>Address</span>
            </div>
            <ClientAddress
                            validation={validation}
                            fieldParentName={'addresses'}
            />
          </div>

        </div>
        <div className={'d-flex justify-content-start flex-column '}>
          <div className={'d-flex justify-content-between item-align-center text-upper font-smaller-4 pl-4'}>
            <span>
               Contacts
            </span>
            <div className={'button-effect pr-4'}>
              <div className={'hw-button small-padding primary outline mr-2'}
                   onClick={() => handlerEventContactAddEditClick('add')}

              >
                <FontAwesomeIcon   icon={faUserPlus}/>
              </div>
            </div>
          </div>
          <div className={'item-align-center col-md-12'}>
            {
              (validation.getFieldValue('contacts') as any).length > 0 ?
                (
                  <ClientContactTable
                                        validation={validation}
                                        fieldParentName={'contacts'}
                                        handlerOnClickEvent={handlerEventContactAddEditClick}
                  />
                ) : <></>
            }
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

      </div>

    </>
  )
}

export default ClientForm

export const openDialogEditContactForm = (index : number, data : IContactModal, contacts : IContactModal[], submitFunc ?: (r : IContactModal, index ?: number) => void) => {
  EasyDialog((closeDialog : () => any, openDialog : (data : any) => any) => {
    const Component = () => {
      return (
        <>
          <CenteredDialog
                        title={'Edit Contact'}
                        closeAction={closeDialog}
                        Component={ContactAddMoreContacts}
                        componentRenderProps={{
                          index,
                          existingContacts: contacts,
                          closeDialog: closeDialog,
                          submitFunc: submitFunc,
                          updateData: data
                        }}
          />
        </>
      )
    }
    openDialog(<Component/>)
  })
}

export const openDialogAddContactForm = (submitFunc : (r : IContactModal) => void, contacts : IContactModal[]) => {
  EasyDialog((closeDialog : () => void, openDialog : (data : any) => void) => {
    const Component = () => {
      return (
        <>
          <CenteredDialog
                        title={'Add Contact'}
                        closeAction={closeDialog}
                        Component={ContactAddMoreContacts}
                        componentRenderProps={{
                          existingContacts: contacts,
                          closeDialog: closeDialog,
                          submitFunc: submitFunc
                        }}
          />
        </>
      )
    }
    openDialog(<Component/>)
  })
}

export const openDialogAddClientFormFull = (successFunction ?: (client : IClientModel) => void) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    const Component = () => {
      const ComponentToRender = () => {
        return (
          <ClientForm closeDialog={closeDialog} successFunction={successFunction}/>
        )
      }
      return (
        <>
          <CenteredDialog
                        title={'Define Client'}
                        closeAction={closeDialog}
                        Component={ComponentToRender}
          />
        </>
      )
    }
    openDialog(<Component/>)
  })
}
