import React         from 'react'
import _             from 'lodash'
import TableDataCell from './TableDataCell'
import {
  ICellTableCurrentEdit,
  ITableCellFeatures,
  ITableDataCellProps,
  ITableDataRowProps,
  ITableHeaderCellProps
}                    from './interfaces'

const _getDataCellObject = (model : any, index : number, column : number, headerRow : ITableHeaderCellProps, currentCellEdit ?: ICellTableCurrentEdit) : ITableDataCellProps => {
  const value = _.get(model, headerRow.field || '')
  return {
    index,
    column: column,
    row: index,
    field: headerRow.field || '',
    model,
    value,
    currentCellEdit,
    cell: headerRow.cell || ({} as ITableCellFeatures)
  }
}

const TableDataRow = ({model, currentCellEdit, header, index} : ITableDataRowProps) => {

  return (
    <tr className={'hw-table-data-row '}
            data-action-id={model.id ? model.id : model.position}
            table-param-row={index}>
      {
        header.map((h, row : number) => {
          if (h.notVisible) {
            return null
          }
          const props = _getDataCellObject(model, index, row, h, currentCellEdit)
          return <TableDataCell key={row} {...props} />
        })
      }
    </tr>
  )
}

export default TableDataRow
