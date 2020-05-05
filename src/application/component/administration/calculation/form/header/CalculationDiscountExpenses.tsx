import React, {ChangeEvent}         from 'react'
import {
  IAdditionalCostsRecord,
  IDiscountRecord,
  useAppCalculationTemp
}                                   from '../../../../../hooks/useAppCalculationTemp'
import {DISCOUNT_SURCHARGE_TYPE}    from '../../../../../interface'
import {
  calculationDiscount,
  formatDecimal
}                                   from '../../../../../utils/Utils'
import {faTimes}                    from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon}            from '@fortawesome/react-fontawesome'
import {toNumber as _toNumber}      from 'lodash'
import {useVatsLast}                from '../../../../../hooks/useVats'
import InputTextWithValidation      from '../../../../../../forms/componentsWithValidation/InputTextWithValidation'
import {
  FORMAT_CURRENCY_STANDARD,
  required,
  useValidation
}                                   from '../../../../../../validation'
import {getCalculationTotalFinance} from '../../../../../models/Calculation'
import ConditionalRendering         from '../../../../../../components/Util/ConditionalRender'

const CalculationDiscountExpenses = () => {

  const {calculation, calculationSetField, calculationRemoveDiscount, calculationRemoveExpense} = useAppCalculationTemp()
  const validation = useValidation()

  const {vats,getVat} = useVatsLast()

  const changeFinance = React.useCallback((event : ChangeEvent<HTMLInputElement>) => {
    calculationSetField('totalFinance', event.target.value.replace(/,/g, ''))
  }, [calculationSetField])

  const renderTotal = React.useMemo(() => {
    return !!((calculation.additionalCosts && calculation.additionalCosts.length) || (calculation.discount && calculation.discount.length))
  }, [calculation])

  return (
    <div className={'d-flex flex-column px-2'}>
      <div className={'d-flex flex-row align-items-center pb-2'}>
        <div className={'col-4'}></div>
        <div className={'col-8 px-1 relative background-grey'}>
          <div
                        className={'ml-1 p-1  align-self-center font-weight-bold font-smaller-2 absolute-left-top opacity-5'}>FINANCE
          </div>
          <div className={'mx-2 ml-5'}>
            <InputTextWithValidation
                            align={'align-right'}
                            classNames={'lined-version'}
                            fullWidth
                            useLabel={false}
                            value={calculation.totalFinance}
                            onChange={changeFinance}
                            validation={{
                              useValidation: validation,
                              model: 'finance',
                              defaultValue: `${calculation.totalFinance}`,
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
        </div>
      </div>
      {
        calculation.discount && calculation.discount.length !== 0 ?
          <div className={'d-flex flex-row  align-items-start pt-1  mb-1 border-top '}>
            <div className={'d-flex flex-column col-12 px-1'}>
              {
                calculation.discount.map((discount : IDiscountRecord, key : number) => {
                  return (
                    <div key={key} className={'d-flex pt-1 flex-row align-items-center relative'}>
                      <small className={'absolute-top-left-3 color-success text-upper font-smaller-6 font-weight-600 letter-spacing-5'}>discount</small>
                      <div className={'col-6 p-1 text-left text-upper font-smaller-5'}> {discount.description}</div>
                      <div className={'col-2 p-1 text-right font-smaller-2'}> {discount.discount.type === DISCOUNT_SURCHARGE_TYPE.PERCENT ? `${formatDecimal(discount.discount.value)} %` : `${formatDecimal(discount.discount.value)}`} </div>
                      <div className={'col-4 p-1 text-right'}> -{formatDecimal(calculationDiscount(_toNumber(calculation.totalFinance), discount.discount))}</div>
                      <div
                          className={'ml-1 cursor-pointer color-danger font-bigger-1'}
                          onClick={() => calculationRemoveDiscount(discount)}
                      >
                        <FontAwesomeIcon icon={faTimes}/>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          : null
      }
      {
        calculation.additionalCosts && calculation.additionalCosts.length !== 0 ?
          <div className={'d-flex flex-row align-items-start pt-1 mb-1 border-top '}>
            <div className={'d-flex flex-column col-12  px-1'}>
              {
                calculation.additionalCosts.map((costs : IAdditionalCostsRecord, key : number) => {
                  const vatRender = () => {
                    const vat = getVat(Number(costs.tax))
                    return vat ? vat.vatStr : ''
                  }
                  return (
                    <div key={key} className={'d-flex pt-1 flex-row align-items-center'}>
                      <small className={'absolute-top-left-3 text-upper font-smaller-6 font-weight-600 color-primary letter-spacing-5'}>expenses</small>
                      <div className={'col-6 p-1 text-left font-smaller-5 text-upper'}> {costs.description}</div>
                      <div className={'col-2 p-1 text-right font-smaller-2'}>{vatRender()}</div>
                      <div className={'col-4 p-1 text-right'}>{formatDecimal(costs.finance)}</div>
                      <div
                          className={'ml-1 cursor-pointer color-danger font-bigger-1'}
                          onClick={() => calculationRemoveExpense(costs)}
                      >
                        <FontAwesomeIcon icon={faTimes}/>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          : null
      }
      <ConditionalRendering condition={renderTotal}>
        <div className={'d-flex flex-row  align-items-start mb-1 border-top font-weight-bold background-grey px-1'}>
          <div className={'d-flex col-4 p-1 mr-1 font-bigger-3 opacity-5'}>
                        TOTAL
          </div>
          <div className={'d-flex flex-column col-8 text-right p-1 font-bigger-2'}>{getCalculationTotalFinance(calculation)}</div>
        </div>
      </ConditionalRendering>
    </div>

  )
}

export default CalculationDiscountExpenses
