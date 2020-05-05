import React, {
  HTMLAttributes,
  PropsWithChildren
} from 'react'

export interface IRadioProps extends PropsWithChildren<HTMLAttributes<HTMLInputElement>> {
  label ?: string
  value ?: string | number
  disabled ?: boolean,
  selected ?: string | number
  'component-direction' ?: 'row' | 'column' | 'column-reverse' | 'row-reverse'
  onRadioChanged : (value ?: string | number) => void
}

const Radio = ({children, label, 'component-direction': direction, className, disabled, selected, value, onRadioChanged} : IRadioProps) => {

  const rootClass = `hw-radio-root flex-direction-${direction}${disabled ? ' hw-disabled' : ''}${className ? ` ${className}` : ''}`
  const isSelected = (selected === void(0) || selected === null) ? false : value === selected

  const onClickHandler = () => {
    if (disabled) {
      return
    }
    onRadioChanged && onRadioChanged(value)
  }

  const info = () => {
    return children ? <>{children}</> :
      <div className={'hw-radio-label'}>
        {label}
      </div>
  }

  return (
    <div className={rootClass}>
      <div className={'hw-radio-info'}>
        {info()}
      </div>
      <div className={`hw-radio-data${disabled ? ' hw-disabled' : ''}`} onClick={onClickHandler}>
        <div className={'hw-radio-data-outer'}>
          <div className={`hw-radio-data-inner${!isSelected ? ' hw-not-selected' : ''}`}>
          </div>
        </div>
      </div>
    </div>
  )
}

Radio.defaultProps = {
  'component-direction': 'row'
}

export default Radio
