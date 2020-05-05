import React, {useState}                from 'react'
import {EasyDialogApolloProvider}       from '../../../../../components/EasyModel/EasyModal'
import {CenteredDialog}                 from '../../../../../components/Dialog/DialogBasic'
import CalculationDiscountAddEditRender from './header/CalculationDiscountAddEditRender'
import CalculationExpensesAddEditRender from './header/CalculationExpensesAddEditRender'
import CalculationPreviewClientPart     from '../preview/CalculationPreviewClientPart'
import CalculationNumberDate            from './header/CalculationNumberDate'
import CalculationDiscountExpenses      from './header/CalculationDiscountExpenses'
import {FontAwesomeIcon}                from '@fortawesome/react-fontawesome'
import {
  faCaretDown,
  faCaretLeft
}                                       from '@fortawesome/free-solid-svg-icons'
import {useAppCalculationTemp}          from '../../../../hooks/useAppCalculationTemp'
import EmptyTag                         from '../../../../../components/Util/EmptyTag'
import {getCalculationTotalFinance}     from '../../../../models/Calculation'

const CalculationHeader = () => {
  const {calculation} = useAppCalculationTemp()
  const [state,setState] : [boolean,(r : boolean) => void] = useState( true as boolean)

  const handlerOpenCloseHeader = () => {
    setState(!state)
  }

  const totalFinance = React.useMemo(() => getCalculationTotalFinance(calculation),[calculation.totalFinance,calculation.discount,calculation.additionalCosts])

  return (
    <div className={'hw-height-effect'}>
      {
        calculation.supplier && calculation.totalFinance && calculation.number ?
          <div className={'absolute-right-top-2 cursor-pointer hw-show-hide-header-icon'} onClick={handlerOpenCloseHeader}>
            <FontAwesomeIcon icon={state ? faCaretDown : faCaretLeft}/>
          </div> : <></>
      }

      {
        state ?
          <div className={`d-flex flex-row align-items-center justify-content-between px-2 mb-1 ${state ? ' hw-height-effect' : ''}`}>
            <div className={''}>
              <CalculationPreviewClientPart/>
            </div>
            <div className={''}>
              <CalculationNumberDate/>
            </div>
            <div className={'calculation-discount-expenses '}>
              <CalculationDiscountExpenses/>
            </div>
          </div>
          :
          <div className={`d-flex flex-row align-items-center justify-content-between px-2 mb-1 ${state ? ' hw-height-effect' : ''}`}>
            <div className={''}>
              <div style={{color: '#184264'}} className={'font-bold text-upper d-flex flex-column text-center'}>
                <div className={'font-smaller-6 opacity-6 hw-show-hide-header-label'}>description</div>
                <EmptyTag  model={calculation.supplier} field={'descriptionShort'} placeholder={'CLIENT NAME'}/>
              </div>
            </div>
            <div className={''}>
              <div style={{color: '#184264'}}  className={'font-bold text-upper d-flex flex-column text-center'}>
                <div className={'font-smaller-6 opacity-6 font-weight-600 hw-show-hide-header-label text-center'}>calculation number</div>
                <EmptyTag model={calculation} field={'number'} placeholder={'CALCULATION NUMBER'}/>
              </div>
            </div>
            <div className={''}>
              <div style={{color: '#184264'}}  className={'font-bold text-upper d-flex flex-column text-center'}>
                <div className={' font-smaller-6 opacity-6 hw-show-hide-header-label text-center'}>total finance</div>
                {calculation.totalFinance ? totalFinance : 'TOTAL FINANCE'}
              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default CalculationHeader

export const openDialogAddEditCalculationDiscount = () => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    const Component = () => {
      return (
        <>
          <CenteredDialog
                        closeAction={closeDialog}
                        Component={CalculationDiscountAddEditRender}
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

export const openDialogAddEditCalculationExpenses = () => {
  EasyDialogApolloProvider((closeDialog : () => any, openDialog : (data : any) => any) => {
    const Component = () => {
      return (
        <>
          <CenteredDialog
                        closeAction={closeDialog}
                        Component={CalculationExpensesAddEditRender}
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
