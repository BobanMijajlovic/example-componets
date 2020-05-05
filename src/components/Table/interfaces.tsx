import React from 'react'

export interface ITableCellEditor {
  render : any
  renderProps ?: any
  classes ?: string[]
}

export interface ITableCellFeatures {
  format?(value : (number | string), index : (number | string), model : any, field : string) : any

  editor ?: ITableCellEditor
  render ?: React.ComponentType<any>
  renderProps ?: any
  style ?: any
  classes ?: string[]
}

export interface ITableHeaderCellProps {
  label ?: string,
  field : string
  cell ?: ITableCellFeatures
  sorted ?: 'ASC' | 'DESC'
  sortable ?: boolean,
  setSorting ?: (field : string, direction : 'ASC' | 'DESC') => void
  notVisible ?: boolean
  width ?: number | string
  notHide ?: boolean
  style ?: any
  labelAlign ?: 'center' | 'left' | 'right'
  render ?: React.ComponentType<any>
  renderProps ?: any
}

export interface ICellTableCurrentEdit {
  column : string,
  row : string,
  field : string
}

export interface ITableDataCellProps {
  index : number,
  row : number,
  column : number,
  field : string,
  model : any,
  value : string
  currentCellEdit ?: ICellTableCurrentEdit
  cell ?: ITableCellFeatures

}

export interface ITableHeaderProps {
  onClick : (e : React.MouseEvent<HTMLTableSectionElement>) => void
  header : Partial<ITableHeaderCellProps>[]
  notShowHeader ?: boolean
  style ?: any
  setSorting ?: (field : string, direction : 'ASC' | 'DESC') => void
}

export interface ITableDataRowProps {
  model : any
  index : number
  notShowHeader ?: boolean
  currentCellEdit ?: ICellTableCurrentEdit
  header : ITableHeaderCellProps[]
}

export interface ITableModelCellChanged {
  type ?: string
  model : any,
  field : string,
  value : string
}

export interface ITableRowSettings {
  field : string
  notVisible ?: boolean
  width ?: number | string
}

export interface ITableProps {
  tableName : string
  settings ?: ITableRowSettings[],
  notShowHeader ?: boolean
  separator ?: 'vertical' | 'horizontal' | 'cell'
  header : ITableHeaderCellProps[]
  data : Array<object>
  setSorting ?: (field : string, direction : 'ASC' | 'DESC') => void,
  handlerEventModelFieldChanged ?: (data : ITableModelCellChanged) => void,
  handlerEventDataClick ?: (event : React.MouseEvent<HTMLTableSectionElement>, id ?: string, action ?: string, param ?: string) => void

}

