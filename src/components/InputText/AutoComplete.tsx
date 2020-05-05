import React, {
  PropsWithChildren,
  useEffect,
  useRef,
  useState
}                         from 'react'
import {IInputTextProps}  from './InputText'
import {
  faBackspace,
  faPlusCircle
}                         from '@fortawesome/free-solid-svg-icons'
import {InputText}        from './index'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                         from '../hooks/useOptimizeEventClick'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                         from '../hooks/useExternalKeybaord'
import HiddenFocusElement from '../Util/HiddenFocusElement'

export interface IAutoCompleteProps extends IInputTextProps, PropsWithChildren<any> {
  timeOutTrigger ?: number
  handlerSearch : (value : string) => Promise<IAutoCompleteResultModel[]>
  handlerSelectValue ?: (obj : any) => void
  handlerInsert : () => void,
  ComponentResultRender ?: React.ComponentType<any>
  classInputText ?: string
}

export interface IAutoCompleteResultModel {
  id : string
  description : string
  subDescription ?: string
  value ?: string | number
}

const ResultRow = ({data, selectValue,classNames} : { data : IAutoCompleteResultModel, selectValue ?: (obj : { id : string, value : string }) => void,classNames ?: string }) => {
  return (
    <div
            className={'d-flex flex-row justify-content-between align-items-end p-2 border-bottom cursor-pointer color-primary hw-height-effect'}
    >
      <div className={'d-flex flex-column'}>
        <div>{data.description}</div>
        <div className={'font-smaller-5 opacity-7'}>{data.subDescription ? data.subDescription : ''}</div>
      </div>
      <div className={'font-smaller-3'}>{data.value ? data.value : ''}</div>
    </div>
  )
}

const AutoComplete = (props : IAutoCompleteProps) => {
  const {timeOutTrigger, handlerSearch, classInputText, handlerSelectValue, onFocus, value, ComponentResultRender, onChange, handlerInsert, ...rest} = props

  const timer = useRef(0)
  const [result, setResult] : [IAutoCompleteResultModel[], (r : IAutoCompleteResultModel[]) => void] = useState([] as any[])
  const [focusPosition, setFocusPosition] : [number, (r : number) => void] = useState(-1)

  const focus = () => (rest.inputRef as any).current.focus()
  const handlerFocusRef = useRef(null)
  const autoCompleteRef = useRef(null)

  const clearResult = React.useCallback(() => {
    setResult([])
    setFocusPosition(-1)
  }, [setResult, setFocusPosition])

  useExternalKeyboard((e : KeyboardEvent) => {
    if (result.length === 0) {
      return
    }
    switch (e.key) {
      case KeyboardEventCodes.Enter:
        if (focusPosition === -1) {
          return
        }
        handlerSelectValue && handlerSelectValue(result[focusPosition])
        clearResult()
        focus()
        return
      case KeyboardEventCodes.ArrowDown:
        if (focusPosition < result.length - 1) {
          (handlerFocusRef.current as any).focus()
          setFocusPosition(focusPosition + 1)
        }

        if (autoCompleteRef) {
          const div = (autoCompleteRef.current as any).children[focusPosition ? focusPosition : -1]
          const position = focusPosition ? focusPosition : 0

          if (div) {
            const maxHeight = (autoCompleteRef.current as any).getBoundingClientRect().height - div.getBoundingClientRect().height
            const height =  (position * div.getBoundingClientRect().height);
            (autoCompleteRef.current as any).scrollTop = 0;
            (autoCompleteRef.current as any).scrollTop =  height > maxHeight ? height : 0
          }
        }
        return

      case KeyboardEventCodes.ArrowUp:
        if (focusPosition > 0) {
          setFocusPosition(focusPosition - 1)
        } else {
          setFocusPosition(-1)
          focus()
        }
        if (autoCompleteRef) {
          const div = (autoCompleteRef.current as any).children[focusPosition ? focusPosition : -1]
          const position = focusPosition ? focusPosition : 0
          if (div) {
            const maxHeight = (autoCompleteRef.current as any).getBoundingClientRect().height - div.getBoundingClientRect().height
            const height = (position * div.getBoundingClientRect().height);
            (autoCompleteRef.current as any).scrollTop = 0;
            (autoCompleteRef.current as any).scrollTop = height >  maxHeight  ? height - div.getBoundingClientRect().height : 0
          }
        }

        return
    }

  }, true, [KeyboardEventCodes.ArrowDown, KeyboardEventCodes.ArrowUp, KeyboardEventCodes.Enter])

  useEffect(() => {
    const close = () => {
      clearResult()
    }
    window.addEventListener('click', close, false)
    return () => {
      window.removeEventListener('click', close, false)
    }

  }, [clearResult])

  const {onClickHandler} = useOptimizeEventClick({

    eventHandler (data : IUseOptimizeEventData) {
      if (!data.action || data.action !== 'selected-id-auto-complete' || !data.id) {
        return
      }
      const item = result.find(x => x.id === data.id)
      if (!item) {
        return
      }
      clearResult()
      handlerSelectValue && handlerSelectValue(item)
    },
    stopPropagation: true
  })

  const triggerSearch = (value : string, time ?: number) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      handlerSearch(value).then(v => {
        if (!v) {
          return
        }
        setResult(v.slice(0, 15))
        setFocusPosition(-1)
      })
    }, time || timeOutTrigger)
  }

  const handlerOnChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    triggerSearch(e.target.value)
    onChange && onChange(e)
  }

  const handlerClear = () => {
    clearResult()
    const e = {
      persist: () => { /** */ },
      target: {
        value: ''
      }
    }
    onChange && onChange(e as any)
    handlerSelectValue && handlerSelectValue(null)
    focus()
  }

  const onFocusHandler = (e : React.FocusEvent<HTMLInputElement>) => {
    onFocus && onFocus(e)
  }

  const RenderResult = React.useMemo(() => ComponentResultRender ? ComponentResultRender : ResultRow, [ComponentResultRender])

  const iconBack = React.useMemo(() => {
    if (!handlerInsert) {
      return {}
    }
    return {
      icon: {
        icon: faPlusCircle,
        handler: handlerInsert
      }
    }
  }, [handlerInsert])

  return (
    <>
      <div className={'relative w-100'}>
        <HiddenFocusElement ref={handlerFocusRef}/>
        <InputText
                    classNames={classInputText}
                    onChange={handlerOnChange}
                    iconAction={{
                      icon: faBackspace,
                      handler: handlerClear,
                      color: 'danger'
                    }}
                    {...rest}
                    value={value}
                    onFocus={onFocusHandler}
                    {...iconBack}
        />

        {result && result.length !== 0 ? (
          <div
                  ref={autoCompleteRef}
                        className={'autocomplete-dropdown '}
                        data-action-root
                        onClick={onClickHandler}
          >
            {
              result.map((value : any, index) => {
                return (
                  <div
                                        className={`auto-select-result-row${index === focusPosition ? ' selected' : ''}`}
                                        key={index}
                                        data-action='selected-id-auto-complete'
                                        data-action-id={value.id}

                  >
                    <RenderResult data={value} classNames={'font-smaller-2'}/>
                  </div>
                )
              })
            }
          </div>
        ) : null}

      </div>
    </>
  )

}

AutoComplete.defaultProps = {
  timeOutTrigger: 450
}

export default AutoComplete
