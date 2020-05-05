import React, {useEffect}              from 'react'
import CalculationItemsInsertForm      from './form/items/CalculationItemsInsertForm'
import {
  formatDateLong,
  formatDecimal
}                                      from '../../../utils/Utils'
import ButtonsForm                     from '../../../../components/Button/ButtonsForm'
import {
  IDueDateRecord,
  useAppCalculationTemp
}                                      from '../../../hooks/useAppCalculationTemp'
import CalculationItemsTable           from './form/items/CalculationItemsTable'
import CalculationHeader, {
  openDialogAddEditCalculationDiscount,
  openDialogAddEditCalculationExpenses
}                                      from './form/CalculationHeader'
import {
  EasyDialogApolloProvider,
  easyDialogInfo,
  easyDialogQuestion
} from '../../../../components/EasyModel/EasyModal'
import {CenteredDialog}                from '../../../../components/Dialog/DialogBasic'
import CalculationDueDateAddEditRender from './form/header/CalculationDueDateAddEditRender'
import {FontAwesomeIcon}               from '@fortawesome/react-fontawesome'
import {
  faCalendarAlt,
  faHandHoldingUsd,
  faPercent,
  faSearch,
  faTimes,
  faUser
}                                      from '@fortawesome/free-solid-svg-icons'
import {KeyboardEventCodes}            from '../../../../components/hooks/useExternalKeybaord'
import {useAppBar}                    from '../../../hooks/useAppBar'
import {openDialogAddEditClient}      from './preview/CalculationPreviewClientPart'
import {
  omit as _omit,
  toNumber as _toNumber
}                                     from 'lodash'
import {useInsertCalculationMutation} from '../../../../graphql/graphql'
import {IClientModel}                 from '../../../../graphql/models'
import ButtonShortcut                 from '../../../../components/Button/ButtonShortcut'
import {DISCOUNT_SURCHARGE_TYPE}      from '../../../interface'
import CalculationDueDateInfoDialog   from './form/common/CalculationDueDateInfoDialog'
import CalculationDueDateRow          from './form/common/CalculationDueDateRow'
import CalculationPreview             from './preview/CalculationPreview'

const CalculationForm = () => {

  const {calculation, calculationSetSupplier} = useAppCalculationTemp()

  const {setButtonsForPage,clearButtonsForPage} = useAppBar()

  useEffect(() => {
    const id = setButtonsForPage([
      {
        label: 'find client',
        icon: faUser,
        shortcut: KeyboardEventCodes.F10,
        onClick:() => openDialogAddEditClient(calculationSetSupplier)
      },
      {
        label: 'discount',
        icon: faPercent,
        shortcut: KeyboardEventCodes.F8,
        onClick: () => openDialogAddEditCalculationDiscount()
      },
      {
        label: 'expenses',
        icon: faHandHoldingUsd,
        shortcut: KeyboardEventCodes.F7,
        onClick: () => openDialogAddEditCalculationExpenses()
      },
      {
        label: 'Preview',
        icon: faSearch,
        shortcut: KeyboardEventCodes.F4,
        onClick: () => openDialogPreviewCalculation({})
      }])
    return () => clearButtonsForPage(id)
  }, [setButtonsForPage,clearButtonsForPage])

  const [mutationInsertCalculation, {loading: mutationLoading}] = useInsertCalculationMutation()

  const handlerSaveCalculation = async () => {
    const _data = {
      variables: {
        data: {
          number: calculation.number,
          dateOfIssue:calculation.dateOfIssue,
          supplier: +(calculation.supplier as IClientModel).id,
          items: calculation.items.map((item) => {
            return {
              item: +item.item.id,
              quantity: _toNumber(item.quantity),
              purchasePrice: _toNumber(item.purchasePrice),
              sellingPrice : _toNumber(item.sellingPrice)
            }
          }),
          dueDate: calculation.dueDate ? calculation.dueDate.map((dueDate) => {
            return {
              date: dueDate.date,
              description: dueDate.description,
              value: _toNumber(dueDate.finance)
            }
          }) : [],
          additionalCosts: calculation.additionalCosts  ? calculation.additionalCosts.map((costs) => {
            return {
              vat: +costs.tax,
              value: _toNumber(costs.finance),
              description: costs.description
            }
          }) : undefined,
          discount: calculation.discount ? calculation.discount.map((discount) => {
            if (discount.discount.type === DISCOUNT_SURCHARGE_TYPE.PERCENT) {
              return {
                percent: _toNumber(discount.discount.value) * -1,
                description: discount.description
              }
            }
            return {
              value: _toNumber(discount.discount.value)
            }
          }) : undefined
        }
      }
    }

   /* alert('open console log')
    console.log(_data)
*/
    await mutationInsertCalculation(_data as any).then((v) => {
       // reset calculation

    })
      .catch((e) => {
        console.log(e)
       /*  const s = processErrore, validation as any)
         if (s) {
           easyDialogError(s)
         }*/
      })
  }

  const handlerOnSubmit =  () => {
    if (!calculation.dueDate || calculation.dueDate.length === 0) {
      openDialogConfirmDueDate(handlerSaveCalculation)
      return
    }
    openDialogPreviewCalculation({
      actionConfirm : handlerSaveCalculation
    })

  }

  const handlerCancelCalculation = () => {
        // resetCalculation()
  }

  return (
    <div className={'d-flex flex-column justify-content-between p-2 calculation-form-root relative'}>
      {/*  {mutationLoading ? <SpinnerLoadingCenter/> : <></>}*/}
      <div className={'d-flex flex-column'}>
        <div className={'font-smaller-1  border-bottom border-light-0 rounded-sm'}>
          <CalculationHeader/>
        </div>
        <div className={'d-flex flex-fill flex-column pb-2'}>
          <CalculationItemsInsertForm />
        </div>
        <div className={'mb-1'}>
          <CalculationItemsTable/>
        </div>
      </div>
      {
        calculation.items.length !== 0 ?
          <div  className={'d-flex flex-row justify-content-between align-items-center border border-light-0 rounded-sm mt-1 py-1 px-2 font-smaller-1'}>
            <div className={'h-100 align-items-center calculation-footer calculation-footer-root col-5'}>
              <div className={'d-flex flex-row relative'}>
                <div className={'absolute-right-top font-smaller-5'}>CHOOSE DUE DATE</div>
                <ButtonShortcut
                      icon={faCalendarAlt}
                      onClick={openDialogAddEditDueDate}
                      style={{minWidth: '45px'}}
                      label={'Due Date'}
                      shortcut={KeyboardEventCodes.F5}
                      classNames={'hw-shortcut-button-white-version hw-button-border-color mr-3'}
                />
                <div className={'d-flex flex-column flex-fill pt-3 '}>
                  {
                    calculation.dueDate && calculation.dueDate.length !== 0 ?
                      calculation.dueDate.map((dueDate : IDueDateRecord, key : number) => {
                        return (
                          <CalculationDueDateRow dueDate={dueDate} key={key}/>
                        )
                      }) : null
                  }
                </div>
              </div>
            </div>
            <div className={'col-3 p-0'}>
              <ButtonsForm
                  buttonsCancel={{
                    label: 'CANCEL',
                    action: handlerCancelCalculation
                  }}
                  buttonSubmit={{
                    label: 'SUBMIT',
                    action: handlerOnSubmit
                  }}
              />
            </div>
          </div>
          : null
      }

    </div>
  )
}

export default CalculationForm

export const openDialogAddEditDueDate = () => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    const Component = () => {
      return (
        <>
          <CenteredDialog
                        closeAction={closeDialog}
                        Component={CalculationDueDateAddEditRender}
                        componentRenderProps={{
                          closeDialog: closeDialog
                        }}
          />
        </>
      )
    }
    openDialog(<Component/>)
  })
}

export const openDialogConfirmDueDate = (handlerActionConfirm ?: () => void) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    const Component = () => {
      return (
        <>
          <CenteredDialog
                title={'Info'}
                closeAction={closeDialog}
                Component={CalculationDueDateInfoDialog}
                componentRenderProps={{
                  actionConfirm:  () => openDialogPreviewCalculation({
                    actionConfirm: handlerActionConfirm
                  }),
                  closeDialog: closeDialog
                }}
          />
        </>
      )
    }
    openDialog(<Component/>)
  })
}
export const openDialogPreviewCalculation = (props ?: any ) => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    const Component = () => {
      const ComponentToRender = () => {
        return (
          <CalculationPreview closeDialog={closeDialog} {...props}/>
        )
      }
      return (
        <>
          <CenteredDialog
                title={'Calculation preview'}
                closeAction={closeDialog}
                Component={ComponentToRender}
                scrollable
                componentRenderProps={{
                  closeDialog: closeDialog
                }}
          />
        </>
      )
    }
    openDialog(<Component/>)
  })
}
