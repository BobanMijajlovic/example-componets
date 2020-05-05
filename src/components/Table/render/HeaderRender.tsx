import {FontAwesomeIcon}            from '@fortawesome/react-fontawesome'
import {
  faAlignJustify,
  faCheck,
  faSortAmountDownAlt,
  faSortAmountUp,
  faTimes
}                                   from '@fortawesome/free-solid-svg-icons'
import React, {
  useEffect,
  useState
}                                   from 'react'
import {ITableHeaderCellPropsInner} from '../TableHeader'
import {ITableHeaderCellProps}      from '../interfaces'
import {MouseEventIsControlledArea} from '../../hooks/useOptimizeEventClick'
import ConditionalRendering         from '../../Util/ConditionalRender'
import {
  ACTION_CLICK_SET_HIDE_COLUMN,
  ACTION_CLICK_SET_SHOW_COLUMN
}                                   from '../Table'

interface ITableHeaderCellRenderInner {
  setSorting ?: (field : string, direction : 'ASC' | 'DESC') => void
  field : string,
  cell : Partial<ITableHeaderCellProps>
}

const _TableHeaderCellRenderInner = ({
  setSorting,
  field,
  cell
} : ITableHeaderCellRenderInner) => {

  const {label, sortable, sorted, labelAlign} = cell

  return (
    <>
      <small style={{textAlign: labelAlign}} className={'font-bold font-size'}>{label}</small>
      {sortable ?
        <div
                    className={`hw-table-header-th-basic-sort${sorted ? ' hw-table-header-th-basic-sorted' : ''}`}
                    onClick={setSorting ? () => setSorting(field!, sorted === 'DESC' ? 'ASC' : 'DESC') : void(0)}
        >
          <div className={'icon-shadow'}>
            {!sorted || sorted === 'DESC' ?
              <FontAwesomeIcon icon={faSortAmountUp}/> : <></>}
          </div>
          <div className={'icon-shadow'}>
            {!sorted || sorted === 'ASC' ?
              <FontAwesomeIcon icon={faSortAmountDownAlt}/> : <></>}
          </div>
        </div> : <></>}
    </>
  )
}

const TableHeaderCellRenderInner = React.memo(_TableHeaderCellRenderInner, (prevProps, nextProps) => {
  return prevProps.field === nextProps.field &&
        prevProps.cell.label === nextProps.cell.label &&
        prevProps.cell.labelAlign === nextProps.cell.labelAlign &&
        prevProps.cell.sorted === nextProps.cell.sorted &&
        prevProps.cell.sortable === nextProps.cell.sortable

})

export const TableHeaderCellRenderBasic = ({
  field,
  setSorting,
  header
} : ITableHeaderCellPropsInner) => {

  const columnProps = React.useMemo(() => {
    return header.find(x => x.field === field)
  }, [field, header])

  if (!columnProps) {
    return <>No</>
  }

  const {render: Render, renderProps} = columnProps as ITableHeaderCellProps

  return (
    <div className={'hw-table-header-th-basic'}>
      {
        Render ? (
          <Render {...renderProps} field={field} header={header}/>
        ) :
          <TableHeaderCellRenderInner
                        field={field as string}
                        setSorting={setSorting}
                        cell={columnProps}
          />
      }
    </div>
  )
}

TableHeaderCellRenderBasic.defaultProps = {
  labelAlign: 'center'
}

export interface ITableHeaderRenderCell {
  header : ITableHeaderCellProps[]
}

interface IOptionOneColumn {
  notVisible : boolean,
  field : string,
  label : string
}

export interface ITableHeaderRenderManageColumns {
  options : IOptionOneColumn[]
}

const _TableHeaderRenderManageColumnsInner = ({options} : ITableHeaderRenderManageColumns) => {

  const [opened, setOpened] = useState(false)

  useEffect(() => {
    const fn = (e : MouseEvent) => {
      if (MouseEventIsControlledArea(e, 'table-choose-visibility-columns')) {
        return
      }
      setOpened(false)
    }
    window.addEventListener('click', fn)
    return () => {
      window.removeEventListener('click', fn)
    }
  }, [])

  return (
    <div className={'relative  w-100'}>
      <span>&nbsp;</span>
      <span className={'absolute-right-center cursor-pointer mr-1'} onClick={() => setOpened(!opened)}
                  mouse-click-controlled-area={'table-choose-visibility-columns'}>
        <FontAwesomeIcon icon={faAlignJustify} data-action={'edit'}/>
      </span>

      <ConditionalRendering condition={!!opened}>
        <div
                    className={'absolute-right-center box-shadow-opened gradient-white-normal text-shadow-white mr-1 no-wrap z-index-1000'}
                    mouse-click-controlled-area={'table-choose-visibility-columns'}>
          {
            options.map((x, index) => {
              return (
                <div key={index}
                                     data-action-id={x.field}
                                     data-action={x.notVisible ? ACTION_CLICK_SET_SHOW_COLUMN : ACTION_CLICK_SET_HIDE_COLUMN}
                                     className={`z-index-1000 border-bottom d-flex justify-content-between gradient-white-normal cursor-pointer px-2 pt-1 align-items-center${x.notVisible ? ' opacity-5' : ''}`}>
                  <div className={'pr-2 font-smaller-4 pt-1'}>
                    {x.notVisible ?
                      <FontAwesomeIcon icon={faTimes}/> :
                      <FontAwesomeIcon icon={faCheck}/>
                    }
                  </div>
                  <div>&nbsp;</div>
                  <div className={'font-smaller-5'}>{x.label}</div>
                </div>
              )
            })
          }
        </div>
      </ConditionalRendering>
    </div>
  )
}

const TableHeaderRenderManageColumnsInner = React.memo(_TableHeaderRenderManageColumnsInner, (prevProps, nextProps) => {
  if (prevProps.options.length !== nextProps.options.length) {
    return false
  }

  return prevProps.options.every((p, index) => {
    const n = nextProps.options[index]
    return n.notVisible === p.notVisible && n.field === p.field
  })
})

export const TableHeaderRenderManageColumns = ({header} : ITableHeaderRenderCell) => {
  const options = React.useMemo(() => {
    return header.filter(x => !x.notHide).map(x => ({
      notVisible: !!x.notVisible,
      field: x.field,
      label: (x.label || x.field || '').substring(0, 20)
    }))
  }, [header])

  return (
    <TableHeaderRenderManageColumnsInner options={options}/>
  )

}
