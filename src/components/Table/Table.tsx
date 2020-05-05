import React, {
  useEffect,
  useRef,
  useState
}                                      from 'react'
import TableHeader, {
  EVENT_TYPE_CHANGE_TABLE_HEADER_REF,
  EVENT_TYPE_CHANGE_TABLE_HEADER_WIDTH,
  EVENT_TYPE_TABLE_CUSTOM_EVENT
}                                      from './TableHeader'
import TableDataRow                    from './TableDataRow'
import _                               from 'lodash'
import {
  ICellTableCurrentEdit,
  ITableHeaderCellProps,
  ITableProps
}                                      from './interfaces'
import {useTableSettings}              from '../hooks/useTableSettings'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                                      from '../hooks/useOptimizeEventClick'
import {EVENT_TYPE_CHANGE_MODEL_FIELD} from './editors/InputTextEditor'

const _getDataRowObject = (data : object, index : number, header : ITableHeaderCellProps[], notShowHeader ?: boolean, currentCellEdit ?: ICellTableCurrentEdit) => {
  return {
    index,
    model: data,
    header,
    currentCellEdit,
    notShowHeader
  }
}

export const ACTION_CLICK_SET_HIDE_COLUMN = 'hide-column-4873847923432432'
export const ACTION_CLICK_SET_SHOW_COLUMN = 'show-column-4847389274432432'

const Table = ({
  tableName,
  setSorting,
  header,
  data,
  handlerEventModelFieldChanged,
  handlerEventDataClick,
  notShowHeader,
  separator
} : ITableProps) => {

  const refTableBody = useRef(null)
  const refTable = useRef(null)
  const __handlerEventModelFieldChanged = useRef(handlerEventModelFieldChanged)

  const [currentEdit, setCurrentEdit] : [ICellTableCurrentEdit, (r : ICellTableCurrentEdit) => void] = useState({
    row: '',
    column: '',
    field: '',
  } as ICellTableCurrentEdit)

  const settingsDefault = React.useMemo(() => header.map(x => ({field: x.field || ''})), [header])
  const {tableSettingsState, changeVisibility, changeWidth, setRef} = useTableSettings(tableName, settingsDefault)

  const _handlerEventModelFieldChanged = React.useCallback((details : any) => {
    __handlerEventModelFieldChanged.current && __handlerEventModelFieldChanged.current(details)
  }, [__handlerEventModelFieldChanged])

  useEffect(() => {
    if (!refTable.current) {
      return
    }
    const fn = (e : any) => {
      if (!e.detail) {
        return
      }

      if (e.detail.type === EVENT_TYPE_CHANGE_TABLE_HEADER_WIDTH) {
        changeWidth(e.detail.field, +(e.detail.resize))
        return
      }

      if (e.detail.type === EVENT_TYPE_CHANGE_TABLE_HEADER_REF) {
        setRef(e.detail.field, e.detail.ref)
        return
      }

      if (e.detail.type === EVENT_TYPE_CHANGE_MODEL_FIELD) {
        if (!e.detail.model || !e.detail.value || !e.detail.field) {
          return
        }
        setCurrentEdit({
          row: '',
          column: '',
          field: ''
        })
        _handlerEventModelFieldChanged(e.detail)
        return
      }

    }
    (refTable as any).current.removeEventListener(EVENT_TYPE_TABLE_CUSTOM_EVENT, fn);
    (refTable as any).current.addEventListener(EVENT_TYPE_TABLE_CUSTOM_EVENT, fn)
    return () => {
      (refTable as any).current.removeEventListener(EVENT_TYPE_TABLE_CUSTOM_EVENT, fn)
    }
  }, [_handlerEventModelFieldChanged, changeWidth,setRef])

  const {onClickHandler: onClickHandlerData} = useOptimizeEventClick({
    eventHandler (data : IUseOptimizeEventData) {
      handlerEventDataClick && handlerEventDataClick(data.event, data.id, data.subAction || data.action, data.param)
      if (data.action === 'table-cell-edit') {
        setCurrentEdit({
          row: data.row as string,
          column: data.column as string,
          field: data.param as string
        })
      }
    }
  })

  const {onClickHandler: onClickHandlerHeader} = useOptimizeEventClick({
    eventHandler (data : IUseOptimizeEventData) {
      switch (data.action) {
        case ACTION_CLICK_SET_SHOW_COLUMN:
        case ACTION_CLICK_SET_HIDE_COLUMN:
          changeVisibility(data.id || '', data.action === ACTION_CLICK_SET_SHOW_COLUMN)
          return
      }
    }
  })

  const _header = React.useMemo(() => {
    return header.map(x => {
      const obj = tableSettingsState.find(t => x.field === t.field)
      return obj ? {
        ...x,
        ...obj
      } : {...x}
    })
  }, [tableSettingsState, header])

  const modelFields = _header.map(x => x.field || '')
  const tableData = !data ? [] : data.map(x => _.pick(x, [...modelFields, ...['id']]))

  const tableRootClass = React.useMemo(() => {
    const array = ['hw-table-root']
    if (separator) {
      switch (separator) {
        case 'vertical':
        case 'horizontal':
        case 'cell':
          array.push(`hw-tbl-separator-${separator}`)
      }
    }
    return array.join(' ')
  }, [separator])

  return (
    <table className={tableRootClass} data-action-root ref={refTable}>
      <TableHeader
                onClick={onClickHandlerHeader as any}
                notShowHeader={notShowHeader}
                header={_header}
                setSorting={setSorting}
      />
      <tbody data-action-root onClick={onClickHandlerData} ref={refTableBody}>
        {
          tableData.map((x : object, index : number) => {
            const opt = _getDataRowObject(x, index, _header, notShowHeader, currentEdit)
            return (<TableDataRow key={index}  {...opt} />)
          })
        }
      </tbody>
    </table>
  )
}

export default Table

export interface IUseTableStateSorting {
  field ?: string
  direction : 'ASC' | 'DESC'
}

export interface IUseTableComponentState {
  sorting : IUseTableStateSorting
}

export const useTableComponent = (startState ?: IUseTableComponentState) => {

  const [state, setState] : [IUseTableComponentState, (r : IUseTableComponentState) => void] = useState(startState ? startState : {} as IUseTableComponentState)

  const setSorting = React.useCallback((field : string, direction : 'ASC' | 'DESC') => {
    setState({
      ...state,
      sorting: {
        field: field,
        direction: direction
      },
    })
  }, [state, setState])

  return {
    tableState: state,
    setSorting
  }

}
