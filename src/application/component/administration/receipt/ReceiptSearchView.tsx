import React                   from 'react'
import {IComponentRenderProps} from '../../_common/SearchView'
import {EVENTS}                from './useReceiptDashboard'
import {IReceiptModel}         from '../../../interface'
import {formatDateShort}       from '../../../utils/Utils'

const ReceiptSearchView = ({model} : IComponentRenderProps) => {
  const _model = model as IReceiptModel
  return (
    <div
            className={'d-flex flex-fill flex-column p-0 pb-1  border-bottom cursor-pointer row-odd-div'}
            key={_model.id}
            data-action={EVENTS.EVENT_SET_SELECTED_RECEIPT}
            data-action-id={_model.id}
    >
      <div className={'d-flex flex-row flex-fill justify-content-between p-1'}>

      </div>
      <div className={'d-flex flex-column align-items-center'}>
        <div className={'font-bigger-1 font-weight-300  line-height-11'}>{_model.receiptNumber}</div>
        <div className={'font-smaller-5 '}>{formatDateShort(_model.createdAt)}</div>
      </div>
    </div>
  )
}

export default ReceiptSearchView
