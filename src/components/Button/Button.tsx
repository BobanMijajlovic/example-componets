import React, {ButtonHTMLAttributes} from 'react'
import {IconProp}                    from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon}             from '@fortawesome/react-fontawesome'

export interface IButtonProps extends React.PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  label : string,
  color ?: 'primary' | 'secondary' | 'success' | 'danger' | 'info',
  size ?: 'sm' | 'lg',
  fullWidth ?: boolean,
  outline ?: boolean,
  classNames ?: string,
  icon ?: IconProp,
  iconRight ?: IconProp,
  iconCenter ?: IconProp
  glossy ?: boolean,
  shortcut ?: string
}

interface IButtonIconsProps {
  icon ?: IconProp,
  iconRight ?: IconProp
}

const ButtonIcons = React.memo(({icon, iconRight} : IButtonIconsProps) => {
  return (
    <>
      {icon ? <FontAwesomeIcon icon={icon} className={'hw-button-icon'}/> : null}
      {iconRight ? <FontAwesomeIcon icon={iconRight} className={'hw-button-icon-right'}/> : null}
    </>
  )
}, ((prevProps, nextProps) => {

  if (prevProps.icon !== nextProps.icon || prevProps.iconRight !== nextProps.iconRight) {
    return false
  }
  return true
}))

const Button = (props : IButtonProps) => {
  const {label, color, size, outline, fullWidth, classNames, icon, iconRight, glossy, shortcut, ...rest} = props

  const rootClass = React.useMemo(() => {
    return `hw-button-root${color ? ` ${color}` : ''}${size ? ` ${size}` : ''}${fullWidth ? ' full-width' : ''}${outline ? ' outline' : ''}${glossy ? ' glossy' : ''}${props.disabled ? ' hw-disabled' : ''}${classNames ? ` ${classNames}` : ''}`
  }, [fullWidth, color, size, outline, glossy, props.disabled, classNames])

  return (
    <button {...rest} className={rootClass}>
      {shortcut ? <span className={'shortcut-label'}>{shortcut}</span> : null}
      <ButtonIcons icon={icon} iconRight={iconRight}/>
      {label}
    </button>
  )
}

export default Button
