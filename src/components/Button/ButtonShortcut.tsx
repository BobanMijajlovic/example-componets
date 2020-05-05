import React, {ButtonHTMLAttributes} from 'react'
import {IconProp}                    from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon}             from '@fortawesome/react-fontawesome'

export interface IButtonShortcutProps extends React.PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  label ?: string
  color ?: 'primary' | 'secondary' | 'success' | 'danger' | 'info'
  size ?: 'sm' | 'lg'
  classNames ?: string
  outline ?: boolean
  icon ?: IconProp
  shortcut ?: string
  style ?: any
}

const ButtonShortcut = (props : IButtonShortcutProps) => {
  const {label, color, size, classNames, icon, shortcut,style, outline, ...rest} = props

  const rootClass = React.useMemo(() => {
    return `hw-shortcut-button-root${color ? ` ${color}` : ''}${size ? ` ${size}` : ' sm'}${outline ? ' outline' : ''}${props.disabled ? ' hw-disabled' : ''}${classNames ? ` ${classNames}` : ''}`
  }, [color, size, outline, props.disabled, classNames])

  return (
    <button {...rest} className={rootClass} style={style}>
      {icon ? <FontAwesomeIcon icon={icon} className={'hw-button-icon'}/> : null}
      {label ?
        <span className={'hw-shortcut-label'}>
          <div className={'d-flex flex-fill justify-content-center'}>
            {label}
          </div>
        </span> : null}
      {shortcut ? <span className={'hw-shortcut-label-command'}>{shortcut}</span> : null}
    </button>
  )
}

export default ButtonShortcut
