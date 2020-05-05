import React, {
  FocusEvent,
  InputHTMLAttributes,
  PropsWithoutRef,
  useEffect,
  useState
}                        from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Label             from '../basic/Label'
import HelperText        from '../basic/HelperText'
import {IconProp}        from '@fortawesome/fontawesome-svg-core'

interface IIconProps {
  icon : IconProp,
  handler ?: any
  color ?: 'danger' | 'primary'
}

interface IInputIconsProps {
  icon ?: IIconProps
  iconAction ?: IIconActionProps
}

export interface IIconActionProps {
  icon : IconProp,
  handler ?: (e : React.MouseEvent) => void
  color ?: 'danger' | 'primary'
}

export interface IInputTextProps extends PropsWithoutRef<InputHTMLAttributes<HTMLInputElement>> {
  error ?: string | boolean
  label : string
  fontSize ?: 'large-input-font'
  helperText ?: string
  icon ?: IIconActionProps
  iconAction ?: IIconActionProps
  fullWidth ?: boolean,
  inputRef ?: React.Ref<HTMLInputElement>
  align ?: 'align-left' | 'align-center' | 'align-right',
  useHelpText ?: boolean
  useLabel ?: boolean
  classNames ?: string
  bold ?: boolean,
  lined ?: boolean,
  selectOnFocus ?: boolean
}

export interface IInputTextDatePickerProps extends IInputTextProps {
  format ?: string
    /** (MMM - long (March)) (MM - short (Mar)) (MM - 2-digit (03)) (dd - 2-digit (01)) ( d - numeric (1)) (yy - 2-digit (12)) (yyyy- numeric (2012) (E - short (Thu)) (EE - long (Thursday))  */
  locales ?: string,
  'start-day' ?: 'MON' | 'SUN',
  'sub-header' ?: 'hide' | 'show',
  'date' ?: Date
}

const InputIcons = React.memo(({icon, iconAction} : IInputIconsProps) => {
  const iconHandler = icon && icon.handler ? Object.assign({}, typeof icon.handler !== 'string' ? {onClick: icon.handler} : {'data-action': icon.handler}) : ''
  return (
    <>
      {icon ?
        <FontAwesomeIcon
                    icon={icon.icon}
                    className={'hw-input-icon'}
                    {...iconHandler}
        /> : null}
      {iconAction ?
        <FontAwesomeIcon
                    icon={iconAction.icon}
                    className={`hw-input-icon-action${iconAction.color ? ` ${iconAction.color}` : ''} `}
                    onClick={(e) => iconAction.handler && iconAction.handler(e)}
        />
        : null}
    </>
  )
}, ((prevProps, nextProps) => {

  if (prevProps.iconAction !== nextProps.iconAction) {
    return false
  }
  return true
}))

const InputText = (props : IInputTextProps) => {

  const {error, onFocus, inputRef, icon, selectOnFocus, iconAction, fullWidth, label, required, helperText, align, lined, fontSize, useHelpText, bold, classNames, useLabel, ...rest} = props

  const rootClass = React.useMemo(() => {
    return `hw-input-text-root ${lined ? 'lined-version' : ''} ${error ? 'error' : ''} ${fontSize ? `${fontSize}` : ''}  ${fullWidth ? 'full-width' : ''}  ${props.readOnly ? 'readOnly' : ''}${align ? ` ${align}` : ' align-left'}  ${props.disabled ? 'disabled' : ''}${bold ? ' bold' : ''}${classNames ? ` ${classNames}` : ''}`
  }, [lined, error, fontSize, fullWidth, props.readOnly, props.disabled, align, bold, classNames])

  const [selectionOnFocus, setSelectionOnFocus] = useState(false)

  useEffect(() => {
    if (!selectionOnFocus) {
      return
    }
    (inputRef as any).current.select()
    setSelectionOnFocus(false)
  }, [selectionOnFocus, setSelectionOnFocus, selectOnFocus, inputRef])

  const _onFocusHandler = (e : FocusEvent<HTMLInputElement>) => {
    if (selectOnFocus && inputRef && (inputRef as any).current) {
      setSelectionOnFocus(true)
    }
    onFocus && onFocus(e)
  }

  return (
    <div className={rootClass}>
      {
        useLabel ?
          <Label
                        label={label}
                        required={required}
                        error={error}
          /> : null
      }
      <div className={'hw-input-group'}>
        <InputIcons icon={icon} iconAction={iconAction}/>
        <input
                    className={'hw-input-text'}
                    ref={inputRef}
                    {...rest}
                    onFocus={_onFocusHandler}
        />
      </div>
      {
        useHelpText ?
          (
            <HelperText
                            error={error}
                            text={helperText}
            />
          ) : <></>
      }

    </div>
  )
}

InputText.defaultProps = {
  useHelpText: true,
  useLabel: true
}

export default InputText
