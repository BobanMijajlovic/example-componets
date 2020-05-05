import React, {
  useEffect,
  useState
}                                   from 'react'
import {
  FORMAT_CURRENCY_STANDARD,
  FORMAT_QUANTITY_STANDARD,
  IFieldsRefs,
  required,
  useValidation
} from '../../../../../../validation'
import {IItemModel}                 from '../../../../../../graphql/models'
import {AutoCompleteFindItem}       from '../../../../autocomplete/AutoCompleteFindItem'
import AutoCompleteResultRenderItem from '../../../../items/autocomplete/AutoCompleteResultRenderItem'
import InputTextWithValidation      from '../../../../../../forms/componentsWithValidation/InputTextWithValidation'
import {
  ICalculationItemTemp,
  useAppCalculationTemp
}                                   from '../../../../../hooks/useAppCalculationTemp'
import {toNumberFixed}              from '../../../../../utils/Utils'
import {openDialogItemAdd}          from '../../../../items/ItemsForm'
import {
  faBarcode,
  faEdit,
  faTable
}                                 from '@fortawesome/free-solid-svg-icons'
import {
  KeyboardEventCodes,
  useExternalKeyboard
}                                 from '../../../../../../components/hooks/useExternalKeybaord'
import {openDialogAddSupplierSku} from './SupplierItemForm'
import ButtonShortcut             from '../../../../../../components/Button/ButtonShortcut'
import ConditionalRendering       from '../../../../../../components/Util/ConditionalRender'
import {useBackground} from '../../../../../hooks/useBackgroundPanel'
import {
  DISCOUNT_SURCHARGE,
  DISCOUNT_SURCHARGE_TYPE,
  IDiscountSurcharge
} from '../../../../../interface'
import {get as _get } from 'lodash'

export interface ICalculationInsertItemModel {
  purchasePrice : string
  sellingPrice : string
  quantity : string
  discount ?: string
}

const CalculationItemsInsertForm = () => {

  const validation = useValidation<ICalculationInsertItemModel>()

  const {resetValidations, getFieldRef, validate,setFieldValue} = validation

  const {calculationAddItem, calculation} = useAppCalculationTemp()

  const [currentItem, setCurrentItem] : [IItemModel, (r : IItemModel) => void] = useState({} as IItemModel)

  const [showFindItem, setShowFindItem] = useState({visible: false})

  const [resetValidation, setResetValidation] = useState({reset: false})

  const [focusElement , setFocusElement] : [IFieldsRefs, (r : IFieldsRefs) => void] = useState({} as IFieldsRefs)

  useEffect(() => {
    if (focusElement.ref && focusElement.ref.current) {
      focusElement.ref.current.focus()
    }
  }, [focusElement])

  useEffect(() => {
    if (resetValidation.reset) {
      resetValidations(true)
    }
  }, [resetValidation, resetValidations])

  useEffect(() => {
    if (!currentItem || !currentItem.id) {
      return
    }
    setFieldValue('sellingPrice',currentItem.price.toString(),true)
  },[currentItem,setFieldValue])

  const _closeFindItem = React.useCallback(() => {
    setShowFindItem({visible: false})
  }, [setShowFindItem])

  const {closeBackground: closeBackgroundFindItem, openBackground: openBackgroundFindItem} = useBackground(_closeFindItem)

  const openFindItem = () => {
    openBackgroundFindItem()
    setShowFindItem({visible: true})
    setFocusSearch({value: ''})
    setResetValidation({reset: true})
  }

  const handlerSetFocus = (field : string) => {
    const refData = getFieldRef(field)
    if (refData && refData.ref) {
      refData.ref.current.focus()
    }
  }

  const [focusSearch, setFocusSearch] = useState({value: ''})

  const handlerItemSelected = React.useCallback((item : IItemModel) => {
    setCurrentItem(item || {})
    if (item && item.id) {
      closeBackgroundFindItem()
      handlerSetFocus('purchasePrice')
      setResetValidation({reset: true})
    }
  }, [setCurrentItem, handlerSetFocus,setFieldValue])

  useExternalKeyboard((e : KeyboardEvent) => {
    switch (e.key) {
      case KeyboardEventCodes.F2:
        if (!calculation.supplier || !currentItem.barCode) {
          return
        }
        openDialogAddSupplierSku({
          client: calculation.supplier,
          item: currentItem,
          successFunction: handlerItemSelected
        })
        break
      case KeyboardEventCodes.F3:
        if (currentItem.id) {
          handlerEditItem()
        }
        return

      case KeyboardEventCodes.F5:
        openFindItem()
        return

      case KeyboardEventCodes.Enter:
        handlerInsertItem()
        break
    }
  }, true, [KeyboardEventCodes.Tab, KeyboardEventCodes.F2, KeyboardEventCodes.F3, KeyboardEventCodes.F5, KeyboardEventCodes.Enter])

  const handlerInsertItem = async () => {
    const {error, data,validations,refs} = await validate()
    if (error || !currentItem.id) {
      const fieldRef : IFieldsRefs | undefined = refs.find(({field}) => _get(validations, `validations.${field}.error`))
      fieldRef && setFocusElement({...fieldRef as IFieldsRefs})
      return
    }

    const _data = {
      purchasePrice: `${toNumberFixed(data.purchasePrice)}`,
      quantity: `${toNumberFixed(data.quantity)}`,
      sellingPrice: `${toNumberFixed(data.sellingPrice)}`,
    } as any
    if (data.discount && data.discount.length !== 0) {
      _data.discount = {
        node: DISCOUNT_SURCHARGE.DISCOUNT,
        type: DISCOUNT_SURCHARGE_TYPE.PERCENT,
        value: data.discount ? `${toNumberFixed(data.discount as string)}` : 0
      }
    }
    calculationAddItem({
      item: currentItem,
      ..._data
    } as ICalculationItemTemp)
    handlerItemSelected({} as IItemModel)
    openFindItem()
  }

  const handlerCloseFunction = async () => {
    const {validations, refs} = await validation.validate()
    validation.resetValidations()
    let fieldRef : IFieldsRefs | undefined = refs.find(({field}) => _get(validations, `validations.${field}.error`))
    if (!fieldRef) {
      fieldRef = refs.find(x => x.field === 'discount')
    }
    fieldRef && setFocusElement({...fieldRef as IFieldsRefs})
  }

  const handlerEditItem = () => {
    if (!currentItem.id) {
      return
    }
    openDialogItemAdd({itemId: currentItem.id, client: calculation.supplier, successFunction: handlerItemSelected,closeFunction:handlerCloseFunction})
  }

  return (
    <div className={'pt-4 px-2 pr-0 mt-1 relative background-grey '}>
      <div className={`hw-auto-item-search-box ${showFindItem.visible ? '' : ' hw-auto-item-search-box-hide'}`}>
        <AutoCompleteFindItem processSelected={handlerItemSelected} supplier={calculation.supplier}
                                      focus={focusSearch}/>
      </div>

      <ButtonShortcut icon={faBarcode} onClick={openFindItem}
                            style={{minWidth: '45px', position: 'absolute', top: '3px', left: '5px'}}
                            label={'item'} shortcut={KeyboardEventCodes.F5}
                            classNames={'hw-shortcut-button-white-version hw-button-border-color'}/>

      <ButtonShortcut icon={faTable} onClick={handlerInsertItem}
                            style={{minWidth: '45px', position: 'absolute', top: '3px', right: '5px'}}
                            label={'add'} shortcut={KeyboardEventCodes.F9}
                            classNames={'hw-shortcut-button-white-version hw-button-border-color'}/>

      <table className={'w-100'}>
        <tbody>
          <tr>
            <td className={'pr-2'}>

              <div
                            className={'hw-calculation-item-preview mt-1'}
                            onClick={handlerEditItem}
              >
                <AutoCompleteResultRenderItem data={currentItem} clientId={calculation.supplier ? calculation.supplier.id : ''}/>
              </div>

              <ConditionalRendering condition={!!currentItem.id}>
                <ButtonShortcut icon={faEdit} onClick={handlerEditItem}
                                            style={{minWidth: '45px', position: 'absolute', top: '3px', left: '30%'}}
                                            label={'edit'} shortcut={KeyboardEventCodes.F3}
                                            classNames={'hw-shortcut-button-white-version hw-button-border-color'}/>
              </ConditionalRendering>
            </td>
            <td className={'pr-2 hw-calculation-insert-item-entry-price'}>
              <InputTextWithValidation
                            validation={{
                              useValidation: validation,
                              model: 'purchasePrice',
                              rule: {
                                required
                              },
                              format: {
                                rule: FORMAT_CURRENCY_STANDARD,
                                validationMessage: 'Enter valid price'
                              }
                            }}
                            selectOnFocus={true}
                            align={'align-right'}
                            label={'Purchase price'}
              />
            </td>
            <td className={'pr-2 hw-calculation-insert-item-quantity'}>
              <InputTextWithValidation
                            validation={{
                              useValidation: validation,
                              model: 'quantity',
                              rule: {
                                required
                              },
                              format: {
                                rule: FORMAT_QUANTITY_STANDARD,
                                validationMessage: 'Enter valid quantity'
                              }
                            }}
                            selectOnFocus={false}
                            align={'align-right'}
                            label={'Qty'}
              />
            </td>
            <td className={'pr-2 hw-calculation-insert-item-selling-price'}>
              <InputTextWithValidation
                            validation={{
                              useValidation: validation,
                              model: 'sellingPrice',
                              rule: {
                                required
                              },
                              format: {
                                rule: FORMAT_CURRENCY_STANDARD,
                                validationMessage: 'Enter valid price'
                              }
                            }}
                            selectOnFocus
                            align={'align-right'}
                            label={'Selling price'}
              />
            </td>
            <td className={'pr-0 hw-calculation-insert-item-discount'}>
              <InputTextWithValidation
                            validation={{
                              useValidation: validation,
                              model: 'discount',
                            }}
                            align={'align-right'}
                            label={'Discount'}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )

}

export default CalculationItemsInsertForm
