import React, {useEffect}       from 'react'
import ButtonsForm              from '../../../../../../components/Button/ButtonsForm'
import SelectTextWithValidation from '../../../../../../forms/componentsWithValidation/SelectTextWithValidation'
import InputTextWithValidation  from '../../../../../../forms/componentsWithValidation/InputTextWithValidation'
import {
  FORMAT_CURRENCY_STANDARD,
  required,
  useValidation
}                               from '../../../../../../validation'
import {
  IAdditionalCostsRecord,
  useAppCalculationTemp
}                             from '../../../../../hooks/useAppCalculationTemp'
import {useVatsLast} from '../../../../../hooks/useVats'
import {
  formatDecimal,
  toNumberFixed
}                             from '../../../../../utils/Utils'
import Paper                    from '../../../../../../components/Paper'

interface ICalculationExpensesAddEditRenderProps {
  closeDialog ?: () => void
}

const CalculationExpensesAddEditRender = ({closeDialog} : ICalculationExpensesAddEditRenderProps) => {

  const {calculationAddExpenses} = useAppCalculationTemp()
  const validation = useValidation<IAdditionalCostsRecord>()

  useEffect(() => {
    validation.setFieldValue('tax', '2', false)
  }, [])

  const handlerCancelDialog = () => {
    closeDialog && closeDialog()
  }

  const {vats} = useVatsLast()

  const vatsOptions = React.useMemo(() => {
    let vatData : any = []
    if (vats && vats.data) {
      vatData = vats.data.map((vat : any) => {
        return {
          label: `${vat.description.short} ${formatDecimal(vat.value)} %`,
          value: `${vat.position}`
        }
      })
    }
    return vatData
  }, [vats])

  const handlerOnSubmit = async () => {
    const {error, data} = await validation.validate()
    if (error) {
      return
    }
    const _data = {
      ...data,
      finance: `${toNumberFixed(data.finance as any)}`,
      tax: +data.tax
    }
    calculationAddExpenses(_data)
    closeDialog && closeDialog()
  }

  return (
    <Paper className={'d-flex flex-column hw-paper'} header={' Add expenses'}>
      <div className={'d-flex flex-column hw-client-form-add-contact-form'}>
        <div className={'container'}>
          <div className={'col-6'}>
            <SelectTextWithValidation
                            label={'Tax'}
                            helperText={'choose tax'}
                            options={vatsOptions}
                            validation={{
                              useValidation: validation,
                              model: 'tax',
                              rule: {
                                required,
                              }
                            }}
            />
          </div>
          <div className={'col-6'}>
            <InputTextWithValidation
                            label={'Finance'}
                            helperText={'enter value'}
                            align={'align-right'}
                            focusOnMount={true}
                            validation={{
                              useValidation: validation,
                              model: 'finance',
                              rule: {
                                required
                              },
                              format: {
                                rule: FORMAT_CURRENCY_STANDARD,
                                validationMessage: 'Enter valid finance'
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

export default CalculationExpensesAddEditRender
