import React                  from 'react'
import {IButtonProps}         from './Button'
import {Button}               from './index'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                             from '../hooks/useExternalKeybaord'
import {
  required,
  useValidation
}                             from '../../validation'
import CheckBoxWithValidation from '../../forms/componentsWithValidation/CheckBoxWithValidation'
import {ICheckBoxProps}       from '../CheckBox'

interface IButtonActionProps extends IButtonProps {
  action ?: (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export interface IButtonsFormProps {
  buttonsCancel : IButtonActionProps
  buttonSubmit : IButtonActionProps
  term ?: ICheckBoxProps
}

export interface IButtonsFormModel {
  term : boolean
}

const ButtonsForm = ({buttonsCancel, buttonSubmit,term} : IButtonsFormProps) => {

  const validation = useValidation<IButtonsFormModel>({
    initialData: {
      term: false
    }
  })

  const handlerOnSubmit = async (e : any) => {
    if (term) {
      const {error} = await validation.validate()
      if (error) {
        return
      }
    }
    buttonSubmit.action && buttonSubmit.action(e as any)
  }

  useExternalKeyboard((e : KeyboardEvent) => {
    switch (e.key) {
      case KeyboardEventCodes.Enter:
        handlerOnSubmit(e)
        break
      case KeyboardEventCodes.Esc:
        buttonsCancel.action && buttonsCancel.action(e as any)
        break
    }
  }, true, [KeyboardEventCodes.Enter, KeyboardEventCodes.Esc])

  return (
    <div className={'d-flex flex-column col-md-12 p-0 justify-content-center'}>
      {
        term ?
          <div className={'d-flex flex-fill pb-2'}>
            <CheckBoxWithValidation
                {...term}
              validation={{
                useValidation: validation,
                model: 'term',
                rule: {
                  required,
                  customValidation: (value : boolean) => {
                    if (!value) {
                      return true
                    }
                    return false
                  }
                }
              }}
              classNames={'font-smaller-3'}
            />
          </div> : <></>
      }

      <div className={'d-flex flex-fill justify-content-around'}>
        <div className={'col-md-6'}>
          <Button
                        classNames={'hw-form-button-root'}
                        label={buttonSubmit.label ? buttonSubmit.label : 'SUBMIT'}
                        onClick={handlerOnSubmit}
                        outline
                        shortcut={'enter'}
                        fullWidth
                        color={buttonSubmit.color ? buttonSubmit.color : 'primary'}
          />
        </div>
        <div className={'col-md-6'}>
          <Button
                        shortcut={'esc'}
                        classNames={'hw-form-button-root'}
                        label={buttonsCancel.label ? buttonsCancel.label : 'CANCEL'}
                        onClick={buttonsCancel.action}
                        outline
                        fullWidth
                        color={buttonsCancel.color ? buttonsCancel.color : 'danger'}
          />
        </div>
      </div>

    </div>

  )
}

export default ButtonsForm
