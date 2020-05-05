import {useValidation}              from '../../../validation'
import ApolloAsyncCall              from '../../../graphql/ApolloAsyncCallClass'
import {openDialogItemAdd}          from '../items/ItemsForm'
import AutoCompleteResultRenderItem from '../items/autocomplete/AutoCompleteResultRenderItem'
import React, {useEffect}           from 'react'
import AutoCompleteWithValidation   from '../../../forms/componentsWithValidation/AutoCompleteWithValidation'
import {
  IClientModel,
  IItemModel
}                                   from '../../../graphql/models'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                   from '../../../components/hooks/useExternalKeybaord'
import ButtonShortcut               from '../../../components/Button/ButtonShortcut'
import {faBarcode}                  from '@fortawesome/free-solid-svg-icons'

interface IAutoCompleteWithValidationModel {
  value : string
}

export interface IAutoCompleteFindItemProps {
  processSelected : (item : IItemModel) => void
  supplier ?: IClientModel,
  focus ?: any
}

export const AutoCompleteFindItem = ({processSelected, supplier, focus: focusData} : IAutoCompleteFindItemProps) => {
  const validation = useValidation<IAutoCompleteWithValidationModel>()
  const {setFieldError, setFieldValue} = validation
  const handlerSearch = React.useCallback(async (value : string) : Promise<any> => {
    value = value.trim()
    const data : any = await ApolloAsyncCall.itemsFind(value)
    if (value.length !== 0 && data.length === 0) {
      setFieldError('value', 'No items found with this rule')
    }
    return data
  }, [setFieldError])

  useEffect(() => {
    setFieldValue('value',focusData.value, true)
    focus()
  }, [focusData])

  const handlerOpenAddItemDialog = () => {
    const fn = (item : IItemModel) => {
      focus()
      processSelected(item)

    }
    openDialogItemAdd({
      successFunction: fn,
      itemId: '',
      client: supplier
    })
  }

  useExternalKeyboard((e : KeyboardEvent) => {
    handlerOpenAddItemDialog()
  }, true, [KeyboardEventCodes.F6])

  const focus = () => {
    const data = validation.getFieldRef('value')
    if (!data) {
      return
    }
    (data.ref as any).current.focus()
  }

  return (
    <div className={'d-flex align-items-center justify-content-around width-parent-full'}>
      <ButtonShortcut icon={faBarcode} onClick={handlerOpenAddItemDialog}
                      style={{minWidth: '45px'}}
                      label={'define'} shortcut={KeyboardEventCodes.F6}
                      classNames={'hw-shortcut-button-white-version  hw-button-border-color mr-3'}/>
      <AutoCompleteWithValidation
                validation={{
                  useValidation: validation,
                  model: 'value',
                  rule: {}
                }}
                classInputText={'lined-version'}
                useLabel={false}
                fullWidth
                helperText={'search by description/sku/bar-code'}
                ComponentResultRender={AutoCompleteResultRenderItem}
                handlerSearch={handlerSearch}
                handlerSelectValue={processSelected}
      />
    </div>

  )
}
