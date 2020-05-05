import React                  from 'react'
import {
  ICalculationItemModel,
  ICalculationItemRenderProps
}                             from '../../../../interface/calculation-part'
import {formatDecimal}        from '../../../../utils/Utils'
import Calculation, {
  getTotalValuesOfItems
}                             from '../../../../models/Calculation'
import {useVatsLast}          from '../../../../hooks/useVats'
import {ICalculationItemTemp} from '../../../../hooks/useAppCalculationTemp'

const CalculationPreviewItemsPart = ({items} : { items : ICalculationItemTemp[] }) => {

  const {totalBasicPurchase,totalPurchaseTax,totalPurchaseFinance,totalSellingFinance,totalMargin} = getTotalValuesOfItems(items)

  return (
    <div className={'hw-calculation-items-table-preview-root'}>
      {
        items && items.length !== 0 ?
          (
            <table className={'text-center calculation-items-table font-smaller-2 text-uppercase mb-3'} data-action-root>
              <thead className={'font-weight-400'}>
                <tr>
                  <th style={{width: '30%'}} className={'relative text-left'}>Name <small
                                    className={'float-right'}>Barcode</small></th>
                  <th>Tax</th>
                  <th>Purchase price</th>
                  <th>Selling price</th>
                  <th style={{minWidth: '60px'}}>Qty</th>
                  <th>Purchase without Tax</th>
                  <th>Tax Finance</th>
                  <th>Purchase finance</th>
                  <th>Selling finance</th>
                  <th style={{minWidth: '60px'}}>Margin %</th>
                </tr>
              </thead>
              <tbody className={'table-body'}>
                {
                  items.map((item : ICalculationItemModel, key : number) => {
                    return (
                      <CalculationPreviewItemRow key={key} data={item}/>
                    )
                  })
                }
              </tbody>
              <tfoot>
                <tr className={'text-right font-bold background-grey'}>
                  <td colSpan={5}>
                  Total
                  </td>
                  <td>
                    {formatDecimal(totalBasicPurchase)}
                  </td>
                  <td>
                    {formatDecimal(totalPurchaseTax)}
                  </td>
                  <td>
                    {formatDecimal(totalPurchaseFinance)}
                  </td>
                  <td>
                    {formatDecimal(totalSellingFinance)}
                  </td>
                  <td>
                    {`${formatDecimal(totalMargin)} %`}
                  </td>
                </tr>
              </tfoot>
            </table>
          ) : null
      }
    </div>
  )
}

const CalculationPreviewItemRow = ({data} : ICalculationItemRenderProps) => {
  const {getVat} = useVatsLast()

  const vat = React.useMemo(() => getVat(data.item.vat), [data])

 /* const vatRender = React.useMemo(() => {
    return vat ? vat.value : '0'
  }, [vat])*/

  return (
    <>
      {
        data ? (
          <tr className={'text-right row-even-div'}>
            <td className={'text-left relative d-flex flex-column'}>
              <small className={'font-smaller-4 text-right w-100'}>{data.item.barCode}</small>
              <div className={'font-smaller-3 '}>{data.item.shortDescription}</div>
            </td>
            <td>
              {vat.valueStr}
            </td>
            <td>
              {formatDecimal(data.purchasePrice)}
            </td>
            <td>
              {formatDecimal(data.sellingPrice)}
            </td>
            <td>
              {formatDecimal(data.quantity, 3)}
            </td>
            <td>
              {formatDecimal(Calculation.renderPurchaseWithoutTaxItem(data))}
            </td>
            <td>
              {formatDecimal(Calculation.renderPurchaseTaxItem(data))}
            </td>
            <td>
              {formatDecimal(Calculation.renderPurchaseFinanceItem(data))}
            </td>
            <td>
              {formatDecimal(Calculation.renderSellingFinanceItem(data))}
            </td>
            <td>
              {`${formatDecimal(Calculation.renderMarginItem(data))} %`}
            </td>
          </tr>
        ) : null
      }
    </>
  )
}

export default CalculationPreviewItemsPart
