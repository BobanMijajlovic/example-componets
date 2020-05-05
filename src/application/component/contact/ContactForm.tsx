import React, {useEffect}   from 'react'
import {IOpenDialogContact} from '../modal/interface'
import {
  EasyDialogApolloProvider,
  easyDialogError
}                           from '../../../components/EasyModel/EasyModal'
import {CenteredDialog}     from '../../../components/Dialog/DialogBasic'
import {
  FORMAT_RULE_PHONE,
  required,
  useValidation
}                           from '../../../validation'

import SelectTextWithValidation from '../../../forms/componentsWithValidation/SelectTextWithValidation'
import {CONTACT_TYPES}          from '../../constants'
import InputTextWithValidation  from '../../../forms/componentsWithValidation/InputTextWithValidation'
import {
  isEmail,
  isURL
}                               from 'validator'
import ButtonsForm              from '../../../components/Button/ButtonsForm'
import {get as _get}            from 'lodash'
import {SpinnerLoadingCenter}   from '../../../components/Spinner/SpinnerLoading'
import {IContactModal}          from '../../../graphql/models'
import {
  useAddEditContactByModelMutation,
  useContactQuery
}                               from '../../../graphql/graphql'
import {processError}           from '../../../graphql/utils'

const ContactForm = ({closeDialog, modelHolder, onSubmitSuccess, contactId, refQueries} : IOpenDialogContact) => {

  const {data, loading} = useContactQuery({
    variables: {
      id: `${contactId}`
    },
    skip: !contactId,
    fetchPolicy: 'network-only'
  })

  const contact = React.useMemo(() => data && data.contact ? data.contact : undefined, [data])

  const validation = useValidation<IContactModal>()

  useEffect(() => {
    let s
    if (!contact) {
      validation.setFieldValue('flag', '0', false)
      return
    }
    switch (+contact.flag) {
      case CONTACT_TYPES.EMAIL:
        s = 'valueEmail'
        break
      case CONTACT_TYPES.WEBSITE:
        s = 'valueWeb'
        break
      default:
        s = 'valuePhone'
        break
    }
    validation.setFieldValue(s, contact.value, false)
    validation.setFieldValue('flag', contact.flag.toString(), false)
    validation.setFieldValue('id', contact.id, false)
    validation.setFieldValue('description', contact.description, false)
  }, [contact])

  const [mutationContactInsert, {loading: mutationLoading}] = useAddEditContactByModelMutation({
    refetchQueries: [...(refQueries || [])]
  })

  const handlerOnSubmit = async () => {
    const {data, validations} = await validation.validate()
    let stringField : string = 'valuePhone'
    const valid = validations.validations as any
    switch (+data.flag) {
      case CONTACT_TYPES.EMAIL:
        if (valid.valueEmail.error) {
          return
        }
        stringField = 'valueEmail'
        break
      case CONTACT_TYPES.WEBSITE:
        if (valid.valueWeb.error) {
          return
        }
        stringField = 'valueWeb'
        break
      default:
        if (valid.valuePhone.error) {
          return
        }
    }
    const _data = {
      variables: {
        data: {
          contact: {
            flag: +data.flag,
            value: _get(data, stringField),
            description: data.description,
            id: data.id
          },
          model: {
            id: `${modelHolder.id}`,
            model: modelHolder.model
          }
        }
      }
    }

    await mutationContactInsert(_data as any).then((v) => {
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

  const handlerCancelDialog = () => {
    closeDialog && closeDialog()
  }

  const {state} = validation

  const styleNoVisible = {
    position: 'absolute',
    top: '-10000px'
  } as any

  return (
    <>
      {mutationLoading || loading ? <SpinnerLoadingCenter/> : <></>}
      <div className={'d-flex hw-client-form-add-contact-form'}>
        <div className={'container'}>
          <div className={'col-5'}>
            <SelectTextWithValidation
                            required
                            label={'Contact type'}
                            helperText={'choose contact'}
                            options={[
                              {
                                label: 'PHONE',
                                value: CONTACT_TYPES.PHONE.toString()
                              },
                              {
                                label: 'MOBILE',
                                value: CONTACT_TYPES.MOBILE.toString()
                              },
                              {
                                label: 'FAX',
                                value: CONTACT_TYPES.FAX.toString()
                              },
                              {
                                label: 'EMAIL',
                                value: CONTACT_TYPES.EMAIL.toString()
                              },
                              {
                                label: 'WEBSITE',
                                value: CONTACT_TYPES.WEBSITE.toString()
                              }
                            ]}
                            validation={{
                              useValidation: validation,
                              model: 'flag',
                              rule: {
                                required,
                              }
                            }}
            />
          </div>
          <div className={'col-md-7'}>
            <div style={(+state.flag) !== CONTACT_TYPES.EMAIL ? styleNoVisible : {}}>
              <InputTextWithValidation
                                required
                                label={'Contact type Email'}
                                helperText={'enter value'}
                                validation={{
                                  useValidation: validation,
                                  model: 'valueEmail',
                                  rule: {
                                    required,
                                    useValidator: [{
                                      validator: isEmail
                                    }]
                                  }
                                }}
              />
            </div>
            <div style={(+state.flag) !== CONTACT_TYPES.WEBSITE ? styleNoVisible : {}}>
              <InputTextWithValidation
                                required
                                label={'Contact type Web'}
                                helperText={'enter value'}
                                validation={{
                                  useValidation: validation,
                                  model: 'valueWeb',
                                  rule: {
                                    required,
                                    useValidator: [{
                                      validator: isURL
                                    }]
                                  }
                                }}
              />
            </div>

            <div  style={((+state.flag) !== CONTACT_TYPES.WEBSITE && (+state.flag) !== CONTACT_TYPES.EMAIL) ? {} : styleNoVisible}>
              <InputTextWithValidation
                                required
                                label={'Contact type Phone'}
                                helperText={'enter value'}
                                validation={{
                                  useValidation: validation,
                                  model: 'valuePhone',
                                  rule: {
                                    required
                                  },
                                  format: {
                                    rule: FORMAT_RULE_PHONE,
                                    validationMessage: 'Not valid'
                                  }
                                }}
              />
            </div>
          </div>
          <div className={'col-md-12 py-3'}>
            <InputTextWithValidation
                            required
                            label={'Description'}
                            helperText={'enter description'}
                            validation={{
                              useValidation: validation,
                              model: 'description'
                            }}
            />
          </div>
          <div className={'col-md-12 py-3'}>
            <ButtonsForm
                            buttonsCancel={{
                              label: 'CANCEL',
                              action: handlerCancelDialog
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

export default ContactForm

ContactForm.defaultProps = {
  refQueries: []
}

export const openDialogContact = ({contactId, ...rest} : IOpenDialogContact) => {

  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {

    const Component = () => {
      const ComponentToRender = () => {
        return (
          <ContactForm
                        closeDialog={closeDialog}
                        contactId={contactId}
                        {...rest}
          />
        )
      }
      return (
        <>
          <CenteredDialog
                        title={contactId ? 'Edit contact' : 'Define new contact'}
                        closeAction={closeDialog}
                        Component={ComponentToRender}
          />
        </>
      )
    }
    openDialog(<Component/>)
  })
}

