import React from 'react'
import {
  ICalculationItemTemp,
  useAppCalculationTemp
}            from '../../../../../hooks/useAppCalculationTemp'
import Table from '../../../../../../components/Table/Table'
import {
  calculationPercentIncreased,
  formatDecimal
}            from '../../../../../utils/Utils'

import {
  EVENT_TYPE_CHANGE_MODEL_FIELD,
  InputTextEditorCurrency,
  InputTextEditorQuantity
}                                       from '../../../../../../components/Table/editors/InputTextEditor'
import {ITableModelCellChanged}         from '../../../../../../components/Table'
import {VatCustomRender}                from '../../../../_common/VatRender'
import {
  NumberCellColumnSmall,
  TableActionCell,
}                                       from '../../../../../../components/Table/render/CellRender'
import {TableHeaderRenderManageColumns} from '../../../../../../components/Table/render/HeaderRender'
import {
  DISCOUNT_SURCHARGE,
  DISCOUNT_SURCHARGE_TYPE
}                                       from '../../../../../interface'
import {DiscountRender}                 from '../../../../_common/DiscountRender'
import {renderPriceAfterDiscount}       from '../../../../../models/Calculation'

const _RenderCalculationNameBody = ({value} : any) => {
  return (
    <div
            className={'d-flex justify-content-between flex-fill'}
    >
      <div className={'font-smaller-1'}>{value.shortDescription}</div>
      <div className={'font-smaller-4'}>{value.barCode}</div>
    </div>
  )
}

const RenderCalculationNameBody = React.memo(_RenderCalculationNameBody,
    (prevProps, nextProps) => {
      return (nextProps.value.barCode === prevProps.value.barCode) && (nextProps.shortDescription === prevProps.shortDescription)
    })

export const calculationItemsTableHeader = [
  {
    label: '#',
    notHide: true,
    field: 'position',
    cell: {
      classes: ['text-center'],
      render: NumberCellColumnSmall
    }
  },
  {
    label: 'Name',
    field: 'item',
    cell: {
      classes: ['text-left'],
      render: RenderCalculationNameBody
    }
  },
  {
    label: 'Tax',
    field: 'tax',
    cell: {
      classes: ['text-right'],
      render: VatCustomRender,
      renderProps: {
        classNames: 'font-smaller-2'
      }
    }
  },
  {
    label: 'P. price',
    field: 'purchasePrice',
    cell: {
      editor: {
        render: InputTextEditorCurrency
      },
      classes: ['text-right'],
      format: (value : string) => {
        return formatDecimal(value)
      }
    }
  },
  {
    label: 'Qty',
    field: 'quantity',
    width: 200,
    cell: {
      editor: {
        render: InputTextEditorQuantity
      },
      classes: ['text-right'],
      format: (value : string) => {
        return formatDecimal(value, 3)
      }
    }
  },
  {
    label: 'Disc/Surch',
    field: 'discount',
    cell: {
      classes: ['text-right'],
      render: DiscountRender
    }
  },
  {
    label: 'Price disc',
    field: 'priceAfterDisc',
    cell: {
      classes: ['text-right'],
      format: (value : string) => {
        return formatDecimal(value)
      },
    }
  },
  {
    label: 'Expense',
    field: 'extraExpense',
    cell: {
      classes: ['text-right'],
      format: (value : string) => {
        return formatDecimal(value)
      },
    }
  },
  {
    label: 'Price extra',
    field: 'priceAfterExtra',
    cell: {
      classes: ['text-right'],
      format: (value : string) => {
        return formatDecimal(value)
      },
    }
  },
  {
    label: 'S. price',
    field: 'sellingPrice',
    cell: {
      editor: {
        render: InputTextEditorCurrency
      },
      classes: ['text-right'],
      format: (value : string) => {
        return formatDecimal(value)
      },
    },
  },
  {
    label: 'Margin',
    field: 'margin',
    cell: {
      classes: ['text-right'],
      format: (value : string) => {
        return `${formatDecimal(value)} %`
      },
    },
  },
  {
    field: 'act',
    notHide: true,
    cell: {
      classes: ['hw-table-cell-center'],
      render: TableActionCell,
      renderProps: {
        preventEdit: true,
        preventPreview: true
      }
    },
    width: '50px',
    render: TableHeaderRenderManageColumns
  }
]

const CalculationItemsTable = () => {
  const {calculation, calculationSetItemFieldValue, calculationRemoveItem} = useAppCalculationTemp()

  const tableData = React.useMemo(() => {
    return calculation.items.map((item : ICalculationItemTemp) => {
      const priceAfterDisc = renderPriceAfterDiscount(item)
      return {
        ...item,
        tax: item.item.vat,
        priceAfterDisc: priceAfterDisc,
        extraExpense: '0',
        priceAfterExtra: priceAfterDisc,
        margin: calculationPercentIncreased(item.sellingPrice, priceAfterDisc)
      }
    })
  }, [calculation.items])

  const handlerDataEventClick = (event : any, id : any, action : any, param : any) => {

    if (action === 'delete') {
      if (id) {
        calculationRemoveItem(id)
      }
    }
  }

  const handlerModelFieldChanged = (data : ITableModelCellChanged) => {
    if (data.type === EVENT_TYPE_CHANGE_MODEL_FIELD) {
      calculationSetItemFieldValue(data.value, data.field, data.model.id)
      return
    }
  }

  return (
    <div className={'w-100 calculation-items-table-root'}  /* onClick={onClickHandler}*/>
      <Table
                handlerEventDataClick={handlerDataEventClick}
                header={calculationItemsTableHeader}
                separator={'cell'}
                data={tableData}
                handlerEventModelFieldChanged={handlerModelFieldChanged}
                tableName={'temp-calculation-table-deal-479328745839274932'}
      />
    </div>
  )
}

export default CalculationItemsTable
