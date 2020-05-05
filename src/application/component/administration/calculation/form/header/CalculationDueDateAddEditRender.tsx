import React                    from 'react'
import InputTextWithValidation  from '../../../../../../forms/componentsWithValidation/InputTextWithValidation'
import {
  FORMAT_CURRENCY_STANDARD,
  required,
  useValidation
}                               from '../../../../../../validation'
import DatePickerWithValidation from '../../../../../../forms/componentsWithValidation/DatePickerWithValidation'
import {
  IDueDateRecord,
  useAppCalculationTemp
}                               from '../../../../../hooks/useAppCalculationTemp'
import ButtonsForm              from '../../../../../../components/Button/ButtonsForm'
import {toNumberFixed}          from '../../../../../utils/Utils'
import Paper                    from '../../../../../../components/Paper'

interface ICalculationDudeDateAddEditRenderProps {
  closeDialog ?: () => void
  dueDate ?: IDueDateRecord
}

const CalculationDueDateAddEditRender = ({closeDialog, dueDate} : ICalculationDudeDateAddEditRenderProps) => {

  const {calculationAddDueDate} = useAppCalculationTemp()
  const validation = useValidation<IDueDateRecord>()

  const handlerCancelDialog = () => {
    closeDialog && closeDialog()
  }

  const handlerOnSubmit = async () => {
    const {error, data} = await validation.validate()
    if (error) {
      return
    }

    const _data = {
      ...data,
      finance: `${toNumberFixed(data.finance as string)}`
    }
    await calculationAddDueDate(_data)
    closeDialog && closeDialog()

  }

  return (

    <Paper className={'d-flex flex-column hw-paper'} header={'Add Due Date'}>
      <div className={'d-flex flex-column hw-client-form-add-contact-form'}>
        <div className={'container'}>
          <div className={'col-6'}>
            <DatePickerWithValidation
                        required
                        label={'Date'}
                        format={'dd-MM-yyyy'}
                        helperText={'choose date'}
                        fullWidth
                        validation={{
                          useValidation: validation,
                          model: 'date',
                          rule: {
                            required
                          }
                        }}
            />
          </div>
          <div className={'col-6'}>
            <InputTextWithValidation
                        required
                        align={'align-right'}
                        focusOnMount={true}
                        label={'Finance'}
                        helperText={'enter finance'}
                        fullWidth
                        validation={{
                          useValidation: validation,
                          model: 'finance',
                          rule: {
                            required
                          },
                          format: {
                            rule: {
                              ...FORMAT_CURRENCY_STANDARD,
                              ...{
                                decimalPlace: 2
                              }
                            }
                          }
                        }}
            />
          </div>
          <div className={'col-md-12 '}>
            <InputTextWithValidation
                        label={'Description'}
                        fullWidth
                        validation={{
                          useValidation: validation,
                          model: 'description'
                        }}
                        maxLength={32}
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
    </Paper>
  )
}

export default CalculationDueDateAddEditRender
