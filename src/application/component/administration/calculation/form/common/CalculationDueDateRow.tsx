import React from 'react'
import {
  IDueDateRecord,
  useAppCalculationTemp
}            from '../../../../../hooks/useAppCalculationTemp'
import {
  formatDateLong,
  formatDecimal
}            from '../../../../../utils/Utils'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'

const CalculationDueDateRow = ({dueDate} : {dueDate : IDueDateRecord}) => {
  const {calculationRemoveDueDate} = useAppCalculationTemp()
  return (
    <div  className={'d-flex flex-row justify-content-start align-items-center relative font-smaller-1 pt-1 border-bottom'}>
      <div className={'col-md-3 col-lg-2 px-0 font-weight-bold'}> {formatDateLong(dueDate.date)} </div>
      <div className={'col-md-9 col-lg-10 px-0 d-flex flex-row text-left'}>
        <div className={'col-7 pl-0 pr-1'}>{dueDate.description}</div>
        <div className={'col-5 d-flex flex-row justify-content-end pl-0 pr-1'}>
          <div>{formatDecimal(dueDate.finance)}</div>
          <div
             className={'ml-1 cursor-pointer color-danger'}
             onClick={() => calculationRemoveDueDate(dueDate)}
          >
            <FontAwesomeIcon icon={faTimes}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalculationDueDateRow
