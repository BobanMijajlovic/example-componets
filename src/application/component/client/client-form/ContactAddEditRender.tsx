import {
  FORMAT_RULE_PHONE,
  required,
  useValidation
}                               from '../../../../validation'
import SelectTextWithValidation from '../../../../forms/componentsWithValidation/SelectTextWithValidation'
import {CONTACT_TYPES}          from '../../../constants'
import InputTextWithValidation  from '../../../../forms/componentsWithValidation/InputTextWithValidation'
import ButtonsForm              from '../../../../components/Button/ButtonsForm'
import React                    from 'react'
import {
  isEmail,
  isURL
}                               from 'validator'
import {get as _get}            from 'lodash'
import {IContactModal}          from '../../../../graphql/models'

interface IContactAddEditProps {
  closeDialog : () => void
  submitFunc : (r : IContactModal, index ?: number) => void
  index ?: number,
  updateData ?: IContactModal,
  existingContacts : IContactModal[]
}

interface IContactAddEditModal {
  flag : string | number,
  valuePhone : string
  valueEmail : string
  valueWeb : string
}

export const ContactAddMoreContacts = ({index, closeDialog, submitFunc, updateData, existingContacts} : IContactAddEditProps) => {

  const currValidation = useValidation<IContactAddEditModal>({
    initialData: {
      flag: updateData ? +updateData.flag : 0,
      valueEmail: updateData && (+updateData.flag === CONTACT_TYPES.EMAIL) ? updateData.value : '',
      valueWeb: updateData && (+updateData.flag === CONTACT_TYPES.WEBSITE) ? updateData.value : '',
      valuePhone: updateData && (+updateData.flag !== CONTACT_TYPES.EMAIL && +updateData.flag !== CONTACT_TYPES.WEBSITE) ? updateData.value : ''
    }
  })

  const handlerOnSubmit = async () => {
    const {data, validations} = await currValidation.validate()
    let stringField : string = 'valuePhone'
    switch (+data.flag) {
      case CONTACT_TYPES.EMAIL:
        if (validations.validations.valueEmail.error) {
          return
        }
        stringField = 'valueEmail'
        break
      case CONTACT_TYPES.WEBSITE:
        if (validations.validations.valueWeb.error) {
          return
        }
        stringField = 'valueWeb'
        break
      default:
        if (validations.validations.valuePhone.error) {
          return
        }
    }

    if (existingContacts) {
      if (!existingContacts.every((c : IContactModal, ind : number) => ((index !== void(0) && ind === index) || +data.flag !== +c.flag || _get(data, stringField) !== c.value))) {
        currValidation.setFieldError(stringField, 'Contacts already exists')
        return
      }
    }

    submitFunc({
      flag: +data.flag,
      value: _get(data, stringField)
    }, index)
    closeDialog()
  }

  const handlerCancelDialog = () => {
    closeDialog()
  }

  const {state} = currValidation

  const styleNoVisible = {
    position: 'absolute',
    top: '-10000px'
  } as any

  return (
    <>
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
                              useValidation: currValidation,
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
                                  useValidation: currValidation,
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
                                  useValidation: currValidation,
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

            <div
                            style={((+state.flag) !== CONTACT_TYPES.WEBSITE && (+state.flag) !== CONTACT_TYPES.EMAIL) ? {} : styleNoVisible}>
              <InputTextWithValidation
                                required
                                label={'Contact type Phone'}
                                helperText={'enter value'}
                                validation={{
                                  useValidation: currValidation,
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
