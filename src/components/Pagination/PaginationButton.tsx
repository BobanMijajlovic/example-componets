import React from 'react'

interface IPaginationButtonProps {
  text : string | number,
  disabled ?: boolean,
  active ?: boolean,
  value : string | number,
  color ?: 'primary' | 'secondary' | 'success' | 'info' | 'danger',
  className ?: string
}

const PaginationButton = ({text, disabled, active, value, className, color, ...rest} : IPaginationButtonProps) => {
  return (
    <button
            {...rest}
            value={disabled ? 0 : (value || text)}
            datatype={'paginationButton'}
            className={`hw-pagination-button-root${disabled ? ' disabled' : ''}${active ? ' active' : ''}${color ? ` ${color}` : ' default'}${className ? ` ${className}` : ''}`}
    >
      {text}
    </button>
  )
}

export default React.memo(PaginationButton, (prevProps : any, nextProps : any) => {
  let isEqual = true
  const _eqFieldsPaginationButton = ['active', 'disabled', 'size', 'value']
  _eqFieldsPaginationButton.every(x => {
    isEqual = !(prevProps[x] !== nextProps[x])
    return isEqual
  })
  return isEqual
})
