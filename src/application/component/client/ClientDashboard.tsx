import React, {useEffect}         from 'react'
import ClientInfoComponent        from './client-info/ClientInfoComponent'
import {
  IUseOptimizeEventData,
  useOptimizeEventClick
}                                 from '../../../components/hooks/useOptimizeEventClick'
import SearchView                 from '../_common/SearchView'
import {faUserPlus}               from '@fortawesome/free-solid-svg-icons'
import ClientSearchViewRender     from './ClientSearchViewRender'
import {useClientsQuery}          from '../../../graphql/graphql'
import {queryVariablesForClients} from '../../../graphql/variablesq'
import {
  CLIENT_MACHINE_EVENTS,
  MACHINE_STATES,
  useClientDashboardMachine
}                                 from './useClientDashboard'
import {useAppBar}                from '../../hooks/useAppBar'
import {KeyboardEventCodes}       from '../../../components/hooks/useExternalKeybaord'
import {faBarcode}                from '@fortawesome/free-solid-svg-icons/faBarcode'
import {faPencilAlt}              from '@fortawesome/free-solid-svg-icons/faPencilAlt'

const ClientDashboard = () => {

  const {searchString, setStringSearch, machineSendEvent, isMachineState} = useClientDashboardMachine()

  const queryVariables = React.useMemo(() => queryVariablesForClients(searchString), [searchString])

  const {loading, data: clients, error} = useClientsQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    variables: queryVariables
  })

  useEffect(() => {
    if (!error) {
      return
    }
    console.log('error', {...error})
  }, [error])

  useEffect(() => {
    if (clients && clients.data && clients.data.items) {
      isMachineState(MACHINE_STATES.LOADED) && machineSendEvent(CLIENT_MACHINE_EVENTS.ACTIONS_CLIENT_FETCH_CLIENTS, {payload: clients.data.items})
    }
  }, [clients])

  const {setButtonsForPage,clearButtonsForPage} = useAppBar()

  useEffect(() => {
    const id = setButtonsForPage([

      {
        label: 'add client',
        icon: faUserPlus,
        shortcut: KeyboardEventCodes.F4,

      },

      {
        label: 'edit client',
        icon: faPencilAlt,
        shortcut: KeyboardEventCodes.F4

      }

    ])

    return () => clearButtonsForPage(id)
  }, [setButtonsForPage,clearButtonsForPage])

  const _clients : any = React.useMemo(() => (!clients || !clients.data || !clients.data.items) ? [] : clients.data.items, [clients])

  const {onClickHandler} = useOptimizeEventClick({
    eventHandler (data : IUseOptimizeEventData) {
      machineSendEvent(data.action as any, {payload: data})
    }
  })

  return (
    <>
      <div className={'d-flex h-100  py-4 px-2'}>
        <div className={'d-flex col-md-3 flex-fill h-100 text-center '} onClick={onClickHandler}
                     data-action-root>
          <SearchView
                        handlerSearch={setStringSearch}
                        data={_clients}
                        searchButtonIcon={faUserPlus}
                        helperText={'search by #tax-number, #client-number, description'}
                        searchButtonEvent={CLIENT_MACHINE_EVENTS.ACTIONS_CLIENT_ADD}
                        RenderComponent={ClientSearchViewRender}
          />
        </div>
        <div className={'d-flex col-md-9 flex-fill justify-content-start '} onClick={onClickHandler}>
          <ClientInfoComponent/>
        </div>
      </div>
    </>
  )
}

export default ClientDashboard

