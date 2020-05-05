import React                   from 'react'
import {useAppCalculationTemp} from '../../../../hooks/useAppCalculationTemp'
import {formatDecimal} from '../../../../utils/Utils'
import {
  getCalculationAdditionalCosts,
  getCalculationDiscounts,
  getCalculationTotalFinance
} from '../../../../models/Calculation'

const CalculationPreviewFinancePart = () => {

  const {calculation} = useAppCalculationTemp()

  return (
    <div className={'d-flex flex-column font-bold'}>
      <FinancePartRow label={'FINANCE'} value={formatDecimal(`${calculation.totalFinance}`)} />
      <FinancePartRow
            label={'DISCOUNT'}
            value={formatDecimal(getCalculationDiscounts(`${calculation.totalFinance}`,calculation.discount))}
      />
      <FinancePartRow
          label={'EXPENSES'}
          value={formatDecimal(getCalculationAdditionalCosts(calculation.additionalCosts))}
      />
      <FinancePartRow
          label={'TOTAL'}
          value={getCalculationTotalFinance(calculation)}
      />
    </div>
  )
}

export default CalculationPreviewFinancePart

export const FinancePartRow = ({label,value} : {label : string,value : string}) => {
  return (
    <div className={'d-flex justify-content-end border-bottom'}>
      <div className={'col-4 p-0 text-left border-right'}>{label} </div>
      <div className={'col-8 p-0 text-right'}>{value}</div>
    </div>
  )
}
