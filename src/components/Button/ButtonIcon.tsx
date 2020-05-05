import React, {ButtonHTMLAttributes} from 'react'
import {IconProp}                    from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon}             from '@fortawesome/react-fontawesome'

export interface IButtonIconProps extends React.PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  icon : IconProp
  color : 'primary' | 'secondary' | 'success' | 'danger' | 'info'
  size ?: 'sm' | 'lg'
  outline ?: boolean
  classNames ?: string
  glossy ?: boolean
}

const ButtonIcon = (props : IButtonIconProps) => {
  const {color, size, outline, classNames, icon, glossy, ...rest} = props

  const rootClass = React.useMemo(() => {
    return `hw-button-icon-root${color ? ` ${color}` : ''}${outline ? ' outline' : ''}${size ? ` ${size}` : ''}${glossy ? ' glossy' : ''}${props.disabled ? ' hw-disabled' : ''}${classNames ? ` ${classNames}` : ''}`
  }, [color, size, outline, glossy, props.disabled, classNames])

  return (

    <button {...rest} className={rootClass}>
      <FontAwesomeIcon icon={icon} className={'hw-button-icon'}/>
    </button>
  )
}

export default ButtonIcon
