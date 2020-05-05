import React, {useEffect}       from 'react'
import ButtonsForm              from '../../../../../../components/Button/ButtonsForm'
import SelectTextWithValidation from '../../../../../../forms/componentsWithValidation/SelectTextWithValidation'
import {
  DISCOUNT_SURCHARGE,
  DISCOUNT_SURCHARGE_TYPE
}                               from '../../../../../interface'
import InputTextWithValidation  from '../../../../../../forms/componentsWithValidation/InputTextWithValidation'
import {
  FORMAT_CURRENCY_STANDARD,
  required,
  useValidation
}                      from '../../../../../../validation'
import {
  IDiscountRecord,
  useAppCalculationTemp
}                      from '../../../../../hooks/useAppCalculationTemp'
import Paper           from '../../../../../../components/Paper'
import {toNumberFixed} from '../../../../../utils/Utils'
import {get as _get}   from 'lodash'

interface ICalculationDiscountAddEditRenderProps {
  closeDialog ?: () => void
}

const styleNoVisible = {
  display: 'none'
} as any

const CalculationDiscountAddEditRender = ({closeDialog} : ICalculationDiscountAddEditRenderProps) => {

  const {calculationAddGlobalDiscount} = useAppCalculationTemp()
  const validation = useValidation<IDiscountRecord>()

  useEffect(() => {
    validation.setFieldValue('discount.node', `${DISCOUNT_SURCHARGE.DISCOUNT}`, false)
    validation.setFieldValue('discount.type', `${DISCOUNT_SURCHARGE_TYPE.PERCENT}`, false)
  }, [])

  const handlerCancelDialog = () => {
    closeDialog && closeDialog()
  }

  const handlerOnSubmit = async () => {
    const {error, data} = await validation.validate()
    if (error) {
      return
    }
    let stringField : string = 'valuePercent'
    if (data.discount.type === DISCOUNT_SURCHARGE_TYPE.FINANCE) {
      stringField = 'valueFinance'
    }
    const _data = {
      ...data,
      discount: {
        ...data.discount,
        value: toNumberFixed(_get(data, stringField)),
        node: +data.discount.node,
        type: +data.discount.type
      }
    } as IDiscountRecord
    calculationAddGlobalDiscount(_data)
    closeDialog && closeDialog()
  }

  const {state} = validation

  return (
    <Paper className={'d-flex flex-column hw-paper'} header={'Add Discount'}>
      <div className={'d-flex flex-column hw-client-form-add-contact-form'}>
        <div className={'container'}>
          <div className={'col-4'}>
            <SelectTextWithValidation
                            label={'Discount / Surcharge'}
                            helperText={'choose node'}
                            options={[
                              {
                                label: 'DISCOUNT',
                                value: `${DISCOUNT_SURCHARGE.DISCOUNT}`
                              },
                              {
                                label: 'SURCHARGE',
                                value: `${DISCOUNT_SURCHARGE.SURCHARGE}`
                              }
                            ]}
                            validation={{
                              useValidation: validation,
                              model: 'discount.node',
                              rule: {
                                required,
                              }
                            }}
            />
          </div>
          <div className={'col-4'}>
            <SelectTextWithValidation
                            label={'FINANCE / PERCENT'}
                            helperText={'choose type'}
                            options={[
                              {
                                label: 'FINANCE',
                                value: DISCOUNT_SURCHARGE_TYPE.FINANCE.toString()
                              },
                              {
                                label: 'PERCENT',
                                value: DISCOUNT_SURCHARGE_TYPE.PERCENT.toString()
                              }
                            ]}
                            validation={{
                              useValidation: validation,
                              model: 'discount.type',
                              rule: {
                                required,
                              }
                            }}
            />
          </div>

          <div className={'col-4'}>
            <div style={state.discount && (+state.discount.type) !== DISCOUNT_SURCHARGE_TYPE.PERCENT ? styleNoVisible : {}}>
              <InputTextWithValidation
                      focusOnMount={true}
                      selectOnFocus={true}
                      label={'Value'}
                      helperText={'enter value'}
                      align={'align-right'}
                      validation={{
                        useValidation: validation,
                        model: 'valuePercent',
                        rule: {
                          required,
                        },
                        format: {
                          rule: {
                            format: 'CURRENCY',
                            decimalChar: '.',
                            decimalPlace: 2,
                            maxValue: 99.99
                          },
                          validationMessage: 'Enter valid value'
                        }
                      }}
              />
            </div>
            <div style={state.discount && (+state.discount.type) !== DISCOUNT_SURCHARGE_TYPE.FINANCE ? styleNoVisible : {}}>
              <InputTextWithValidation
                      focusOnMount={true}
                      label={'Value'}
                      helperText={'enter value'}
                      align={'align-right'}
                      validation={{
                        useValidation: validation,
                        model: 'valueFinance',
                        rule: {
                          required,
                        },
                        format: {
                          rule: FORMAT_CURRENCY_STANDARD,
                          validationMessage: 'Enter valid value'
                        }
                      }}
              />
            </div>
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

export default CalculationDiscountAddEditRender
