import React             from 'react'
import {
  formatDateLong,
  formatDecimal,
  formatTime
}                        from '../../../../utils/Utils'
import {IReceiptModel}   from '../../../../interface'
import {round as _round} from 'lodash'

const ReceiptPreview = (receipt : IReceiptModel) => {

  const totalReceipt = React.useMemo(() => {
    if (!receipt || !receipt.payments) {
      return 0
    }
    let total = 0
    receipt.payments.map((payment : any) => total = total + _round(payment.value, 2))
    return total
  }, [receipt])

  return (
    <div style={{width: '300px'}} className={'d-flex flex-column p-2'}>
      <div className={'d-flex justify-content-center align-items-center'}>Header</div>
      <div className={'font-smaller-2'}>FS NO. {receipt.receiptNumber}</div>
      <div className={'d-flex flex-row justify-content-between align-items-center font-smaller-2'}>
        <div>{formatDateLong(receipt.createdAt)}</div>
        <div>{formatTime(receipt.createdAt)}</div>
      </div>
      <div className={'d-flex flex-column py-2 border-bottom'}>
        {
          receipt.items ?
            receipt.items.map((item : any, index : number) => {
              const total = _round((item.quantity * item.price), 2)
              return (
                <div key={index} className={'d-flex flex-column justify-content-start pb-2'}>
                  <div>{item.item.shortDescription}</div>
                  <div className={'d-flex flex-row justify-content-between'}>
                    <div
                                            className={'pr-2'}>{formatDecimal(item.quantity, 3)} x {formatDecimal(item.price)}</div>
                    <div>{formatDecimal(total)}</div>
                  </div>
                </div>
              )
            }) : null
        }
      </div>
      <div className={'d-flex flex-column py-2'}>
        <div className={'d-flex flex-row justify-content-between'}>
          <div>TOTAL</div>
          <div>{formatDecimal(totalReceipt)}</div>
        </div>
        {
          receipt.payments ?
            receipt.payments.map((payment : any, index : number) => {
              return (
                <div key={index} className={'d-flex flex-row justify-content-between'}>
                  <div>{payment.type}</div>
                  <div>{formatDecimal(payment.value)}</div>
                </div>
              )
            }) : null
        }
      </div>
      <div className={'d-flex justify-content-center align-items-center'}>Footer</div>
    </div>
  )
}

export default ReceiptPreview
