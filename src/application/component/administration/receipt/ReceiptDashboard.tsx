import React, {useEffect}          from 'react'
import SearchView from '../../_common/SearchView'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                 from '../../../../components/hooks/useOptimizeEventClick'
import {
  EVENTS,
  useReceiptDashboardMachine
}                 from './useReceiptDashboard'
import {MACHINE_STATES}            from '../../client/useClientDashboard'
import ReceiptSearchView           from './ReceiptSearchView'
import ReceiptInfoComponent        from './info/ReceiptInfoComponent'
import {queryVariablesForReceipts} from '../../../../graphql/variablesq'
import {useReceiptsQuery}          from '../../../../graphql/graphql'

const ReceiptDashboard = () => {
  const {searchString, isMachineState, machineSendEvent, setStringSearch, selectedReceipt} = useReceiptDashboardMachine()

  const queryVariables = React.useMemo(() => queryVariablesForReceipts(searchString), [searchString])

  const {loading, data: receipts} = useReceiptsQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: queryVariables
  })

  useEffect(() => {
    if (receipts && receipts.data && receipts.data.items) {
      (isMachineState(MACHINE_STATES.LOADED) || isMachineState(MACHINE_STATES.RENDERED)) && machineSendEvent(EVENTS.EVENT_FETCH_RECEIPT, {payload: receipts.data.items})
    }
  }, [receipts])

  const _receipts : any = React.useMemo(() => (!receipts || !receipts.data || !receipts.data.items) ? [] : receipts.data.items, [receipts])

  const {onClickHandler} = useOptimizeEventClick({
    eventHandler (data : IUseOptimizeEventData) {
      machineSendEvent(data.action as any, {payload: data})
    }
  })

  return (
    <div className={'d-flex h-100 py-4 px-2'}>
      <div className={'d-flex col-md-3 flex-fill h-100'} onClick={onClickHandler} data-action-root>
        <SearchView
                    handlerSearch={setStringSearch}
                    data={_receipts}
                    helperText={'search by #receipt, date'}
                    searchButtonEvent={''}
                    RenderComponent={ReceiptSearchView}
        />
      </div>
      {
        _receipts && _receipts.length !== 0 ? (
          <div className={'d-flex col-md-9 flex-fill justify-content-start'} onClick={onClickHandler}>
            <ReceiptInfoComponent receiptNumber={selectedReceipt}/>
          </div>) : null
      }

    </div>
  )
}

export default ReceiptDashboard
